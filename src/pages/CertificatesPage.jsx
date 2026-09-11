import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, downloadFile } from '../lib/api';

export function CertificatesPage() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    api
      .get('/certificates/me')
      .then(setCertificates)
      .catch((err) => setError(err?.data?.message || err?.message || 'Could not load certificates.'))
      .finally(() => setLoading(false));
  }, []);

  async function handleDownload(cert) {
    setDownloadingId(cert.id);
    try {
      const { blob, filename } = await downloadFile(`/certificates/${cert.id}/download`);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err?.message || 'Download failed.');
    } finally {
      setDownloadingId(null);
    }
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <img
        src="/images/green-forest.png"
        alt=""
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      />
      <div style={{ position: 'relative', zIndex: 1, padding: '32px 24px 48px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Link
            to="/"
            style={{ fontFamily: 'Klee One', fontSize: 13, color: '#291c0e', textDecoration: 'none', textShadow: '0 1px 4px rgba(255,255,255,0.7)' }}
          >
            ← Back to Home
          </Link>

          <h2 style={{ fontFamily: 'Kalnia', fontSize: 24, color: '#291c0e', marginTop: 12, marginBottom: 20, textShadow: '0 1px 6px rgba(255,255,255,0.7)' }}>
            Your Certificates
          </h2>

          {loading ? (
            <p style={{ fontFamily: 'Klee One', color: '#714012' }}>Loading…</p>
          ) : error ? (
            <p style={{ fontFamily: 'Klee One', color: '#a03a3a' }}>{error}</p>
          ) : certificates.length === 0 ? (
            <p style={{ fontFamily: 'Klee One', color: '#a08a6f', textShadow: '0 1px 4px rgba(255,255,255,0.7)' }}>
              No certificates yet — they appear here once your submission is accepted.
            </p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  style={{
                    background: 'rgba(245, 230, 211, 0.9)',
                    border: '1px solid #b28561',
                    borderRadius: 12,
                    padding: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                  }}
                >
                  <div style={{ fontFamily: 'Kalnia', fontSize: 16, color: '#291c0e' }}>
                    Certificate of Participation
                  </div>
                  <div style={{ fontFamily: 'Klee One', fontSize: 13, color: '#714012' }}>
                    {cert.eventName}
                  </div>
                  <button
                    type="button"
                    disabled={downloadingId === cert.id}
                    onClick={() => handleDownload(cert)}
                    className="btn-signin"
                    style={{ marginTop: 8 }}
                  >
                    {downloadingId === cert.id ? 'Downloading…' : 'Download PDF'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}