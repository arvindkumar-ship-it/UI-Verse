import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import { SubmissionPageCard } from '../components/SubmissionPageCard';

export function SubmissionCatalogPage() {
  const [submission, setSubmission] = useState(null);
  const submissionId = submission?.id ?? null;
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const bootstrapped = useRef(false);
  const navigate = useNavigate();
  const { eventId } = useAuth();

  useEffect(() => {
    if (!eventId || bootstrapped.current) return;
    bootstrapped.current = true;

    async function loadSubmission() {
      setLoading(true);
      setLoadError('');
      try {
        const existing = await api.get(`/events/${eventId}/submissions/me`);
        if (!existing) {
          navigate('/submission');
          return;
        }
        setSubmission(existing);
      } catch (err) {
        setLoadError(err?.data?.message || err?.message || 'Could not load your submission.');
      } finally {
        setLoading(false);
      }
    }

    loadSubmission();
  }, [eventId, navigate]);

  async function refreshSubmission() {
    if (!submissionId) return;
    try {
      const fresh = await api.get(`/submissions/${submissionId}`);
      setSubmission(fresh);
    } catch {
      // Keep showing the last known state if the refresh itself fails.
    }
  }

  const activeAssets = (submission?.assets ?? []).filter((a) => a.status !== 'DELETED');
  const isLocked = submission?.status === 'LOCKED';

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <img
        src="/images/green-forest.png"
        alt=""
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, padding: '32px 24px 48px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Link
            to="/submission?panel=1"
            style={{
              fontFamily: 'Klee One',
              fontSize: 13,
              color: '#291c0e',
              textDecoration: 'none',
              textShadow: '0 1px 4px rgba(255,255,255,0.7)',
            }}
          >
            ← Back to Submission
          </Link>

          <h2
            style={{
              fontFamily: 'Kalnia',
              fontSize: 24,
              color: '#291c0e',
              marginTop: 12,
              marginBottom: 4,
              textShadow: '0 1px 6px rgba(255,255,255,0.7)',
            }}
          >
            Your Submission
          </h2>

          {loading ? (
            <p style={{ fontFamily: 'Klee One', color: '#714012', textShadow: '0 1px 4px rgba(255,255,255,0.7)' }}>
              Loading…
            </p>
          ) : loadError ? (
            <p style={{ fontFamily: 'Klee One', color: '#a03a3a', textShadow: '0 1px 4px rgba(255,255,255,0.7)' }}>
              {loadError}
            </p>
          ) : (
            <>
              <p
                style={{
                  fontFamily: 'Klee One',
                  fontSize: 13,
                  color: '#714012',
                  marginBottom: 20,
                  textShadow: '0 1px 4px rgba(255,255,255,0.7)',
                }}
              >
                Status: {submission.status}
              </p>

              {deleteError && (
                <p
                  style={{
                    fontFamily: 'Klee One',
                    fontSize: 13,
                    color: '#a03a3a',
                    marginBottom: 12,
                    textShadow: '0 1px 4px rgba(255,255,255,0.7)',
                  }}
                >
                  {deleteError}
                </p>
              )}

              {activeAssets.length === 0 ? (
                <p style={{ fontFamily: 'Klee One', color: '#a08a6f', textShadow: '0 1px 4px rgba(255,255,255,0.7)' }}>
                  No pages uploaded yet — go back and use "Submit Your Design" to add your first page.
                </p>
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                    gap: 20,
                  }}
                >
                  {activeAssets.map((asset, index) => (
                    <SubmissionPageCard
                      key={asset.id}
                      index={index}
                      submissionId={submissionId}
                      asset={asset}
                      canManage={!isLocked}
                      onDeleted={() => {
                        setDeleteError('');
                        refreshSubmission();
                      }}
                      onDeleteError={setDeleteError}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}