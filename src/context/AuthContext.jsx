import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { api, setAccessToken } from '../lib/api';

const AuthContext = createContext(null);

const EVENT_SLUG = import.meta.env.VITE_EVENT_SLUG;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [eventId, setEventId] = useState(null);
  const [loading, setLoading] = useState(true);
  const bootstrapped = useRef(false);

  useEffect(() => {
    // Guard against StrictMode's dev-only double effect invocation.
    // NOTE: we intentionally do NOT use a `cancelled` flag + cleanup here.
    // A cleanup-based cancel flag was tried before and caused a worse bug:
    // StrictMode synchronously runs this effect's cleanup as part of its
    // simulated unmount/remount, which flipped `cancelled` to true before
    // the async calls below resolved — so setEventId/setUser/setLoading
    // were silently skipped every time, leaving eventId stuck at null and
    // loading stuck at true forever. The ref guard alone is sufficient to
    // stop bootstrap() from running twice; no cancellation is needed.
    if (bootstrapped.current) return;
    bootstrapped.current = true;

    async function bootstrap() {
      try {
        const event = await api.get(`/events/public/${EVENT_SLUG}`);
        setEventId(event.id);
      } catch {
        // Event not configured or not open yet.
      }

      try {
        const refreshed = await api.post('/auth/refresh');
        setAccessToken(refreshed.accessToken);
        setUser(refreshed.user);
      } catch {
        // No valid session — normal for a first-time visitor.
      }

      setLoading(false);
    }

    bootstrap();
  }, []);

  async function register({ name, email, phone, password }) {
    const result = await api.post('/auth/register', { name, email, phone, password });
    setAccessToken(result.accessToken);
    setUser(result.user);
    return result;
  }

  async function login({ email, password }) {
    const result = await api.post('/auth/login', { email, password });
    setAccessToken(result.accessToken);
    setUser(result.user);
    return result;
  }

  async function logout() {
    await api.post('/auth/logout');
    setAccessToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, eventId, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}