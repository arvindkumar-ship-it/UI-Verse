import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function RegistrationPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: backend register call here
    navigate('/login');
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', background: '#714012', containerType: 'inline-size' }}>
      <img
        style={{ width: '58.72cqw', height: '111.43vh', left: '0.15cqw', top: '-11.43vh', position: 'absolute', opacity: 0.30 }}
        src="/images/register.png"
        alt=""
      />
      <div className="shine-overlay" />

      <div style={{ left: '10.71cqw', top: '9.28vh', position: 'absolute', color: '#291C0E', fontSize: '4.39vh', fontFamily: 'Kalnia', fontWeight: '600', wordWrap: 'break-word' }}>
        Welcome to UI Verse!
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ width: '41.14cqw', height: '91.70vh', left: '58.86cqw', top: '4.10vh', position: 'absolute', background: 'rgba(217, 217, 217, 0.20)', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 4px 0px 4px rgba(0, 0, 0, 0.25)', borderRadius: 20 }} />

        {/* Name */}
        <div style={{ width: '32.05cqw', height: 0, left: '63.37cqw', top: '21.29vh', position: 'absolute', outline: '5px #714012 solid', outlineOffset: '-2.50px' }} />
        <label style={{ left: '63.37cqw', top: '16.11vh', position: 'absolute', opacity: 0.80, color: 'black', fontSize: '2.93vh', fontFamily: 'Klee One', fontWeight: '600', wordWrap: 'break-word' }}>
          Name
        </label>
        <input
          name="name" value={form.name} onChange={handleChange}
          style={{ width: '32.05cqw', left: '63.37cqw', top: '16.11vh', position: 'absolute', background: 'transparent', border: 'none', outline: 'none', color: 'black', fontSize: '2.93vh', fontFamily: 'Klee One', fontWeight: '600', opacity: 0 }}
        />

        {/* Email */}
        <div style={{ width: '32.05cqw', height: 0, left: '63.37cqw', top: '32.03vh', position: 'absolute', outline: '5px #714012 solid', outlineOffset: '-2.50px' }} />
        <label style={{ left: '63.37cqw', top: '26.86vh', position: 'absolute', opacity: 0.80, color: 'black', fontSize: '2.93vh', fontFamily: 'Klee One', fontWeight: '600', wordWrap: 'break-word' }}>
          Email
        </label>
        <input
          name="email" type="email" value={form.email} onChange={handleChange}
          style={{ width: '32.05cqw', left: '63.37cqw', top: '26.86vh', position: 'absolute', background: 'transparent', border: 'none', outline: 'none', color: 'black', fontSize: '2.93vh', fontFamily: 'Klee One', fontWeight: '600', opacity: 0 }}
        />

        {/* Phone */}
        <div style={{ width: '32.05cqw', height: 0, left: '63.37cqw', top: '42.77vh', position: 'absolute', outline: '5px #714012 solid', outlineOffset: '-2.50px' }} />
        <label style={{ left: '63.37cqw', top: '37.60vh', position: 'absolute', opacity: 0.80, color: 'black', fontSize: '2.93vh', fontFamily: 'Klee One', fontWeight: '600', wordWrap: 'break-word' }}>
          Phone
        </label>
        <input
          name="phone" type="tel" value={form.phone} onChange={handleChange}
          style={{ width: '32.05cqw', left: '63.37cqw', top: '37.60vh', position: 'absolute', background: 'transparent', border: 'none', outline: 'none', color: 'black', fontSize: '2.93vh', fontFamily: 'Klee One', fontWeight: '600', opacity: 0 }}
        />

        {/* Password */}
        <div style={{ width: '32.05cqw', height: 0, left: '63.37cqw', top: '53.52vh', position: 'absolute', outline: '5px #714012 solid', outlineOffset: '-2.50px' }} />
        <label style={{ left: '63.37cqw', top: '48.34vh', position: 'absolute', opacity: 0.80, color: 'black', fontSize: '2.93vh', fontFamily: 'Klee One', fontWeight: '600', wordWrap: 'break-word' }}>
          Password
        </label>
        <input
          name="password" type="password" value={form.password} onChange={handleChange}
          style={{ width: '32.05cqw', left: '63.37cqw', top: '48.34vh', position: 'absolute', background: 'transparent', border: 'none', outline: 'none', color: 'black', fontSize: '2.93vh', fontFamily: 'Klee One', fontWeight: '600', opacity: 0 }}
        />

        <button
          type="submit"
          style={{ width: '32.05cqw', height: '7.81vh', left: '63.37cqw', top: '59.08vh', position: 'absolute', background: 'rgba(112.54, 63.68, 17.96, 0.60)', borderRadius: 20, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <span style={{ color: 'white', fontSize: '3.91vh', fontFamily: 'Inria Serif', fontWeight: '700', wordWrap: 'break-word' }}>
            Register
          </span>
        </button>
      </form>

      <p style={{ left: '63.37cqw', top: '69.34vh', position: 'absolute', color: 'black', fontSize: '1.95vh', fontFamily: 'Klee One', fontWeight: '400' }}>
        Already registered? <Link to="/login" style={{ color: '#714012', fontWeight: 600 }}>Login</Link>
      </p>
    </div>
  );
}