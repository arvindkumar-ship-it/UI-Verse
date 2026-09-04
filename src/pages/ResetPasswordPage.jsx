import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const [newPassword, setNewPassword] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | done
  const [error, setError] = useState('');
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!token) {
      setError('Reset link is missing or invalid.');
      return;
    }

    setStatus('submitting');
    try {
      await resetPassword({ token, newPassword });
      setStatus('done');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err?.data?.message || err?.message || 'Reset link is invalid or expired.');
      setStatus('idle');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#714012' }}>
      <div style={{ width: 360, background: 'rgba(217, 217, 217, 0.20)', borderRadius: 20, padding: '32px 28px', color: 'black' }}>
        <h1 style={{ fontFamily: 'Kalnia', fontSize: 24, marginBottom: 16 }}>Reset password</h1>

        {status === 'done' ? (
          <p style={{ fontFamily: 'Klee One' }}>Password reset. Redirecting to login...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label style={{ display: 'block', fontFamily: 'Klee One', fontWeight: 600, marginBottom: 6 }}>
              New password
            </label>
            <input
              type="password"
              required
              minLength={12}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: 'none', marginBottom: 16, fontFamily: 'Klee One' }}
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              style={{ width: '100%', padding: '10px 0', borderRadius: 20, border: 'none', background: 'rgba(112.54, 63.68, 17.96, 0.60)', color: 'white', fontFamily: 'Inria Serif', fontWeight: 700, cursor: 'pointer' }}
            >
              {status === 'submitting' ? 'Resetting...' : 'Reset password'}
            </button>
            {error && (
              <p style={{ color: '#B00020', fontFamily: 'Klee One', marginTop: 10 }}>{error}</p>
            )}
          </form>
        )}

        <p style={{ marginTop: 16, fontFamily: 'Klee One' }}>
          <Link to="/login" style={{ color: '#714012', fontWeight: 600 }}>Back to login</Link>
        </p>
      </div>
    </div>
  );
}