import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api, uploadToPresignedUrl } from '../lib/api';

function initialAssetState() {
  return { assetId: null, fileName: '', status: 'idle', error: '' };
}

function withTimeout(promise, ms, label) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`TIMEOUT after ${ms}ms: ${label}`)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

export function SubmissionPage() {
  const [showActions, setShowActions] = useState(false);
  const [submissionId, setSubmissionId] = useState(null);
  const [ensuring, setEnsuring] = useState(false);
  const [ensureError, setEnsureError] = useState('');
  const [landing, setLanding] = useState(initialAssetState());
  const [login, setLogin] = useState(initialAssetState());
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [debugLog, setDebugLog] = useState([]);
  const navigate = useNavigate();
  const { eventId, user, loading } = useAuth();

  function pushDebug(msg) {
    const line = `${new Date().toLocaleTimeString()} ${msg}`;
    console.log('[SUBMISSION-DEBUG]', line);
    setDebugLog((d) => [...d.slice(-5), line]);
  }

  useEffect(() => {
    // NOTE: no `cancelled` flag + cleanup here on purpose. Same bug class as
    // AuthContext.jsx had: StrictMode's dev-only synthetic unmount runs this
    // effect's cleanup almost immediately, flipping `cancelled` to true
    // before the awaited calls below resolve — so `setSubmissionId` was
    // silently skipped every time even though the GET call succeeded (the
    // debug logs proved this: "GET resolved: found id=..." printed, but
    // submissionId stayed null because the state update was gated behind
    // `if (!cancelled)`). Removing the gate fixes it; the [eventId,
    // submissionId, ensuring] dependency guard below is enough to prevent
    // re-running once submissionId or ensuring is set.
    if (!eventId || submissionId || ensuring) return;

    async function ensureSubmission() {
      setEnsuring(true);
      setEnsureError('');
      pushDebug(`start, eventId=${eventId}`);
      try {
        pushDebug('calling GET submissions/me...');
        const existing = await withTimeout(
          api.get(`/events/${eventId}/submissions/me`),
          8000,
          'GET submissions/me',
        );
        pushDebug(`GET resolved: ${existing ? 'found id=' + existing.id : 'null (none yet)'}`);
        if (existing) {
          setSubmissionId(existing.id);
          return;
        }
        pushDebug('calling POST submissions (create)...');
        const created = await withTimeout(
          api.post(`/events/${eventId}/submissions`, {
            title: 'UI Verse Submission',
            description: 'Submitted via UI Verse platform',
          }),
          8000,
          'POST submissions',
        );
        pushDebug(`POST resolved: id=${created?.id}`);
        setSubmissionId(created.id);
      } catch (err) {
        pushDebug(`CAUGHT ERROR: ${err?.message || err}`);
        setEnsureError(
          err?.data?.message || err?.message || 'Could not prepare your submission.',
        );
      } finally {
        pushDebug('finally reached, ensuring set false');
        setEnsuring(false);
      }
    }

    ensureSubmission();
  }, [eventId, submissionId, ensuring]);

  async function handleFileUpload(kind, file) {
    const setter = kind === 'landing' ? setLanding : setLogin;

    if (!submissionId) {
      setter((s) => ({ ...s, error: 'Submission not ready yet — wait a moment and try again.' }));
      return;
    }

    setter({ assetId: null, fileName: file.name, status: 'uploading', error: '' });

    try {
      const intent = await api.post(`/submissions/${submissionId}/upload-intent`, {
        assetType: 'SCREENSHOT',
        originalName: file.name,
        mimeType: file.type,
        fileSize: file.size,
      });

      await uploadToPresignedUrl(intent.uploadUrl, file);

      await api.post(`/submissions/${submissionId}/assets/${intent.assetId}/complete`);

      setter({ assetId: intent.assetId, fileName: file.name, status: 'done', error: '' });
    } catch (err) {
      setter({
        assetId: null,
        fileName: file.name,
        status: 'error',
        error: err?.data?.message || err?.message || 'Upload failed.',
      });
    }
  }

  const bothUploaded = landing.status === 'done' && login.status === 'done';
  const inlineError = ensureError || landing.error || login.error || submitError;

  const handleSubmit = async () => {
    if (!submissionId || !bothUploaded || submitting) return;

    setSubmitting(true);
    setSubmitError('');
    try {
      await api.post(`/submissions/${submissionId}/submit`);
      navigate('/thank-you');
    } catch (err) {
      setSubmitError(err?.data?.message || err?.message || 'Submit failed. Try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="submission-figma-page">
      {/* --- TEMPORARY DEBUG BANNER — remove once bug is confirmed fixed --- */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          background: '#000',
          color: '#0f0',
          fontFamily: 'monospace',
          fontSize: '12px',
          padding: '6px 10px',
          lineHeight: 1.5,
          maxHeight: '40vh',
          overflowY: 'auto',
        }}
      >
        <div>
          DEBUG: authLoading={String(loading)} | user={user ? user.email : 'null'} | eventId=
          {String(eventId)} | submissionId={String(submissionId)} | ensuring={String(ensuring)} |
          ensureError={ensureError || '(none)'}
        </div>
        {debugLog.map((line, i) => (
          <div key={i} style={{ color: '#0ff' }}>{line}</div>
        ))}
      </div>
      {/* --- END DEBUG BANNER --- */}

      <img className="submission-bg" src="/images/green-forest.png" alt="" />

      <div className="submission-nav-pill">
        <Link to="/" className="submission-nav-link">HOME</Link>
        <span className="submission-nav-divider">|</span>
        <span className="submission-nav-link">EVENTS</span>
      </div>

      <div className="submission-logo">
        <span className="submission-logo-ui">UI</span>
        <span className="submission-logo-verse">Verse</span>
      </div>

      <button className="submission-cta" onClick={() => setShowActions(true)}>
        Submit Your Design
      </button>

      {showActions && (
        <div className="submission-panel">
          <div className="submission-actions">
            <div className="submission-action-row">
              <label className="submission-file-btn">
                {landing.status === 'done'
                  ? 'Landing Page ✓'
                  : landing.status === 'uploading'
                  ? 'Uploading…'
                  : 'Landing Page'}
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload('landing', file);
                  }}
                />
              </label>
              <label className="submission-file-btn">
                {login.status === 'done'
                  ? 'Login Page ✓'
                  : login.status === 'uploading'
                  ? 'Uploading…'
                  : 'Login Page'}
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload('login', file);
                  }}
                />
              </label>
            </div>

            <button
              className="submission-final-btn"
              onClick={handleSubmit}
              disabled={!bothUploaded || submitting}
            >
              {submitting ? 'Submitting…' : 'SUBMIT'}
            </button>

            {inlineError && <p className="submission-error-text">{inlineError}</p>}
          </div>
        </div>
      )}

      <div className="submission-powered">powered by Figma</div>
    </div>
  );
}