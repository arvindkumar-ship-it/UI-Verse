import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export function SubmissionPageCard({ index, submissionId, asset, canManage, onDeleted, onDeleteError }) {
  const [url, setUrl] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (asset.status !== 'SAFE') {
      setStatus('error');
      return;
    }

    let cancelled = false;
    setStatus('loading');

    api
      .get(`/submissions/${submissionId}/assets/${asset.id}/download-url`)
      .then((res) => {
        if (cancelled) return;
        setUrl(res.downloadUrl);
        setStatus('ready');
      })
      .catch(() => {
        if (cancelled) return;
        setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, [asset.id, asset.status, submissionId]);

  const handleDelete = async () => {
    if (deleting) return;
    setDeleting(true);
    try {
      await api.delete(`/submissions/${submissionId}/assets/${asset.id}`);
      onDeleted(asset.id);
    } catch (err) {
      setDeleting(false);
      onDeleteError(err?.data?.message || err?.message || 'Could not delete this page.');
    }
  };

  const placeholderText =
    asset.status === 'PENDING' || asset.status === 'SCANNING'
      ? 'Processing…'
      : asset.status === 'REJECTED'
      ? 'Rejected by scan'
      : status === 'loading'
      ? 'Loading…'
      : 'Preview unavailable';

  return (
    <div
      style={{
        background: 'rgba(217, 217, 217, 0.20)',
        borderRadius: 16,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          width: '100%',
          aspectRatio: '4 / 3',
          background: '#e8ddcf',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {status === 'ready' && url ? (
          <img
            src={url}
            alt={`Page ${index + 1}`}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            onError={() => setStatus('error')}
          />
        ) : (
          <span style={{ fontFamily: 'Klee One', color: '#a08a6f', fontSize: 13 }}>
            {placeholderText}
          </span>
        )}

        {canManage && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            title="Delete this page"
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              width: 26,
              height: 26,
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(0,0,0,0.6)',
              color: 'white',
              fontSize: 15,
              lineHeight: 1,
              cursor: deleting ? 'not-allowed' : 'pointer',
            }}
          >
            {deleting ? '…' : '\u00d7'}
          </button>
        )}
      </div>

      <div style={{ padding: '10px 14px' }}>
        <div style={{ fontFamily: 'Inria Serif', fontWeight: 700, fontSize: 15, color: '#291c0e' }}>
          Page {index + 1}
        </div>
        <div style={{ fontFamily: 'Klee One', fontSize: 12, color: '#a08a6f', marginTop: 2 }}>
          {asset.status}
        </div>
      </div>
    </div>
  );
}