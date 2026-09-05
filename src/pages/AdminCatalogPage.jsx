import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';

const PAGE_SIZE = 25;

function UserCard({ user }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageStatus, setImageStatus] = useState('idle'); // idle | loading | ready | error

  const safeAsset = user.submission?.assets?.find((a) => a.status === 'SAFE');

  useEffect(() => {
    if (!safeAsset || !user.submission) return;

    let cancelled = false;
    setImageStatus('loading');

    api
      .get(`/submissions/${user.submission.id}/assets/${safeAsset.id}/download-url`)
      .then((res) => {
        if (cancelled) return;
        setImageUrl(res.downloadUrl);
        setImageStatus('ready');
      })
      .catch(() => {
        if (cancelled) return;
        setImageStatus('error');
      });

    return () => {
      cancelled = true;
    };
    // safeAsset.id is stable per user for the lifetime of this card
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeAsset?.id, user.submission?.id]);

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
          aspectRatio: '16 / 10',
          background: '#e8ddcf',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {safeAsset && imageStatus === 'ready' ? (
          <img
            src={imageUrl}
            alt={`${user.name}'s submission`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : safeAsset && imageStatus === 'loading' ? (
          <span style={{ fontFamily: 'Klee One', color: '#714012', fontSize: 13 }}>
            Loading...
          </span>
        ) : (
          <span style={{ fontFamily: 'Klee One', color: '#a08a6f', fontSize: 13 }}>
            {user.submission ? 'No preview available' : 'Not submitted yet'}
          </span>
        )}
      </div>

      <div style={{ padding: '12px 14px' }}>
        <div style={{ fontFamily: 'Inria Serif', fontWeight: 700, fontSize: 16, color: '#291c0e' }}>
          {user.name}
        </div>
        <div style={{ fontFamily: 'Klee One', fontSize: 13, color: '#714012', wordBreak: 'break-all' }}>
          {user.email}
        </div>
        <div style={{ fontFamily: 'Klee One', fontSize: 12, color: '#a08a6f', marginTop: 6 }}>
          {user.submission ? `Submission: ${user.submission.status}` : 'No submission'}
        </div>
      </div>
    </div>
  );
}

export function AdminCatalogPage() {
  const { user, loading: authLoading } = useAuth();

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [error, setError] = useState('');

  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';

  useEffect(() => {
    if (authLoading || !isAdmin) return;

    let cancelled = false;
    setStatus('loading');

    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(PAGE_SIZE),
    });
    if (search) params.set('search', search);

    api
      .get(`/admin/users?${params.toString()}`)
      .then((res) => {
        if (cancelled) return;
        setUsers(res.items);
        setTotalPages(res.pagination.totalPages || 1);
        setStatus('ready');
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err?.data?.message || err?.message || 'Failed to load users.');
        setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, [authLoading, isAdmin, page, search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  };

  if (authLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: 'Klee One' }}>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
        <p style={{ fontFamily: 'Klee One' }}>You need to sign in as an admin to view this page.</p>
        <Link to="/login" style={{ color: '#714012', fontWeight: 600, fontFamily: 'Klee One' }}>Go to login</Link>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: 'Klee One' }}>You don't have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div
  style={{
    minHeight: '100vh',
    padding: '32px 24px',
    backgroundColor: '#f5e6d3',
    backgroundImage: 'url(/images/venue-bg3.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  }}
>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Kalnia', fontSize: 28, color: '#291c0e', marginBottom: 20 }}>
          Submissions Catalogue
        </h1>

        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            style={{ flex: 1, maxWidth: 320, padding: '10px 12px', borderRadius: 8, border: '1px solid #b28561', fontFamily: 'Klee One' }}
          />
          <button
            type="submit"
            style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: '#714012', color: 'white', fontFamily: 'Inria Serif', fontWeight: 700, cursor: 'pointer' }}
          >
            Search
          </button>
        </form>

        {status === 'loading' && <p style={{ fontFamily: 'Klee One' }}>Loading users...</p>}
        {status === 'error' && <p style={{ fontFamily: 'Klee One', color: '#B00020' }}>{error}</p>}

        {status === 'ready' && (
          <>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: 20,
              }}
            >
              {users.map((u) => (
                <UserCard key={u.id} user={u} />
              ))}
            </div>

            {users.length === 0 && (
              <p style={{ fontFamily: 'Klee One', marginTop: 20 }}>No users found.</p>
            )}

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginTop: 32 }}>
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: page <= 1 ? '#ccc' : '#714012', color: 'white', fontFamily: 'Klee One', cursor: page <= 1 ? 'not-allowed' : 'pointer' }}
              >
                Previous
              </button>
              <span style={{ fontFamily: 'Klee One', color: '#291c0e' }}>
                Page {page} of {totalPages}
              </span>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: page >= totalPages ? '#ccc' : '#714012', color: 'white', fontFamily: 'Klee One', cursor: page >= totalPages ? 'not-allowed' : 'pointer' }}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}