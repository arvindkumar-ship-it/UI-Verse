import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api, uploadToPresignedUrl } from '../lib/api';

function withTimeout(promise, ms, label) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`TIMEOUT after ${ms}ms: ${label}`)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

export function SubmissionPage() {
  const [searchParams] = useSearchParams();
  const [showActions, setShowActions] = useState(searchParams.get('panel') === '1');
  const [submission, setSubmission] = useState(null);
  const submissionId = submission?.id ?? null;
  const [ensuring, setEnsuring] = useState(false);
  const [ensureError, setEnsureError] = useState('');
  const [addingPage, setAddingPage] = useState(false);
  const [addPageError, setAddPageError] = useState('');
  const [addedToast, setAddedToast] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const bootstrapped = useRef(false);
  const navigate = useNavigate();
  const { eventId } = useAuth();

  useEffect(() => {
    // Guard against StrictMode's dev-only double effect invocation — see
    // AuthContext.jsx for why we intentionally don't use a `cancelled` flag
    // + cleanup here (it silently swallowed the state updates before).
    if (!eventId || bootstrapped.current) return;
    bootstrapped.current = true;

    async function ensureSubmission() {
      setEnsuring(true);
      setEnsureError('');
      try {
        const existing = await withTimeout(
          api.get(`/events/${eventId}/submissions/me`),
          8000,
          'GET submissions/me',
        );
        if (existing) {
          setSubmission(existing);
          return;
        }
        const created = await withTimeout(
          api.post(`/events/${eventId}/submissions`, {
            title: 'UI Verse Submission',
            description: 'Submitted via UI Verse platform',
          }),
          8000,
          'POST submissions',
        );
        setSubmission(created);
      } catch (err) {
        setEnsureError(
          err?.data?.message || err?.message || 'Could not prepare your submission.',
        );
      } finally {
        setEnsuring(false);
      }
    }

    ensureSubmission();
  }, [eventId]);

  // Auto-dismiss the "Design added" toast after a few seconds.
  useEffect(() => {
    if (!addedToast) return;
    const t = setTimeout(() => setAddedToast(false), 2500);
    return () => clearTimeout(t);
  }, [addedToast]);

  async function refreshSubmission() {
    if (!submissionId) return;
    try {
      const fresh = await api.get(`/submissions/${submissionId}`);
      setSubmission(fresh);
    } catch {
      // Keep showing the last known state if the refresh itself fails.
    }
  }

  async function handleAddPage(file) {
    if (!submissionId || addingPage) return;

    setAddingPage(true);
    setAddPageError('');

    try {
      const intent = await api.post(`/submissions/${submissionId}/upload-intent`, {
        assetType: 'SCREENSHOT',
        originalName: file.name,
        mimeType: file.type,
        fileSize: file.size,
      });

      await uploadToPresignedUrl(intent.uploadUrl, file);

      await api.post(`/submissions/${submissionId}/assets/${intent.assetId}/complete`);

      await refreshSubmission();
      setAddedToast(true);
    } catch (err) {
      setAddPageError(err?.data?.message || err?.message || 'Upload failed.');
    } finally {
      setAddingPage(false);
    }
  }

  const activeAssets = (submission?.assets ?? []).filter((a) => a.status !== 'DELETED');
  const isLocked = submission?.status === 'LOCKED';
  const canSubmit = activeAssets.length > 0 && !isLocked && !submitting;
  const inlineError = ensureError || addPageError || submitError;

  const handleSubmit = async () => {
    if (!submissionId || !canSubmit) return;

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
            {ensuring ? (
              <p style={{ fontFamily: 'Klee One', color: 'white', margin: 0 }}>Loading your submission…</p>
            ) : (
              <>
                {submission?.status && (
                  <p style={{ fontFamily: 'Klee One', color: 'white', margin: 0, fontSize: 13 }}>
                    Status: {submission.status}
                    {isLocked && ' — judging has started, this submission can no longer be changed.'}
                  </p>
                )}

                <div className="submission-action-row">
                  {!isLocked && (
                    <label className="submission-file-btn">
                      {addingPage ? 'Uploading…' : '+ Add Design Page'}
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        hidden
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleAddPage(file);
                        }}
                      />
                    </label>
                  )}

                  <button
                    type="button"
                    className="submission-file-btn"
                    onClick={() => navigate('/submission/catalog')}
                  >
                    Submitted Designs
                  </button>

                  <button
                    className="submission-final-btn"
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                  >
                    {submitting
                      ? 'Submitting…'
                      : submission?.status === 'SUBMITTED'
                      ? 'Update Submission'
                      : 'SUBMIT'}
                  </button>
                </div>
              </>
            )}

            {inlineError && <p className="submission-error-text">{inlineError}</p>}
          </div>
        </div>
      )}

      <div className="submission-powered">powered by Figma</div>

      {addedToast && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(41, 28, 14, 0.92)',
            color: 'white',
            fontFamily: 'Klee One',
            fontSize: 14,
            padding: '10px 20px',
            borderRadius: 999,
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            zIndex: 1000,
          }}
        >
          ✓ Design added!
        </div>
      )}
    </div>
  );
}