// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// export function LoginPage() {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // TODO: backend auth call here
//     navigate('/');
//   };

//   return (
//     <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', background: '#714012', containerType: 'inline-size' }}>
//       <img
//         style={{ width: '58.72cqw', height: '111.43vh', left: '0.15cqw', top: '-11.43vh', position: 'absolute', opacity: 0.30 }}
//         src="/images/register.png"
//         alt=""
//       />
//       <div className="shine-overlay" />

//       <div style={{ left: '10.71cqw', top: '9.28vh', position: 'absolute', color: '#291C0E', fontSize: '4.39vh', fontFamily: 'Kalnia', fontWeight: '600', wordWrap: 'break-word' }}>
//         Welcome to UI Verse!
//       </div>

//       <form onSubmit={handleSubmit}>
//         <div style={{ width: '41.14cqw', height: '91.70vh', left: '58.86cqw', top: '4.10vh', position: 'absolute', background: 'rgba(217, 217, 217, 0.20)', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 4px 0px 4px rgba(0, 0, 0, 0.25)', borderRadius: 20 }} />

//         {/* Email */}
//         <div style={{ width: '32.05cqw', height: 0, left: '63.37cqw', top: '21.29vh', position: 'absolute', outline: '5px #714012 solid', outlineOffset: '-2.50px' }} />
//         <label style={{ left: '63.37cqw', top: '16.11vh', position: 'absolute', opacity: 0.80, color: 'black', fontSize: '2.93vh', fontFamily: 'Klee One', fontWeight: '600', wordWrap: 'break-word' }}>
//           Email
//         </label>
//         <input
//           name="email" type="email" value={form.email} onChange={handleChange}
//           style={{ width: '32.05cqw', left: '63.37cqw', top: '16.11vh', position: 'absolute', background: 'transparent', border: 'none', outline: 'none', color: 'black', fontSize: '2.93vh', fontFamily: 'Klee One', fontWeight: '600', opacity: 0 }}
//         />

//         {/* Password */}
//         <div style={{ width: '32.05cqw', height: 0, left: '63.37cqw', top: '32.03vh', position: 'absolute', outline: '5px #714012 solid', outlineOffset: '-2.50px' }} />
//         <label style={{ left: '63.37cqw', top: '26.86vh', position: 'absolute', opacity: 0.80, color: 'black', fontSize: '2.93vh', fontFamily: 'Klee One', fontWeight: '600', wordWrap: 'break-word' }}>
//           Password
//         </label>
//         <input
//           name="password" type="password" value={form.password} onChange={handleChange}
//           style={{ width: '32.05cqw', left: '63.37cqw', top: '26.86vh', position: 'absolute', background: 'transparent', border: 'none', outline: 'none', color: 'black', fontSize: '2.93vh', fontFamily: 'Klee One', fontWeight: '600', opacity: 0 }}
//         />

//         <button
//           type="submit"
//           style={{ width: '32.05cqw', height: '7.81vh', left: '63.37cqw', top: '37.60vh', position: 'absolute', background: 'rgba(112.54, 63.68, 17.96, 0.60)', borderRadius: 20, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
//         >
//           <span style={{ color: 'white', fontSize: '3.91vh', fontFamily: 'Inria Serif', fontWeight: '700', wordWrap: 'break-word' }}>
//             Login
//           </span>
//         </button>
//       </form>

//       <p style={{ left: '63.37cqw', top: '47.85vh', position: 'absolute', color: 'black', fontSize: '1.95vh', fontFamily: 'Klee One', fontWeight: '400' }}>
//         New user? <Link to="/register" style={{ color: '#714012', fontWeight: 600 }}>Register</Link>
//       </p>
//     </div>
//   );
// }

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(form);
      navigate('/');
    } catch (err) {
      setError(err?.data?.message || err?.message || 'Login failed. Check your credentials.');
    }
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

        {/* Email */}
        <div style={{ width: '32.05cqw', height: 0, left: '63.37cqw', top: '21.29vh', position: 'absolute', outline: '5px #714012 solid', outlineOffset: '-2.50px' }} />
        <label style={{ left: '63.37cqw', top: '16.11vh', position: 'absolute', opacity: form.email ? 0 : 0.80, color: 'black', fontSize: '2.93vh', fontFamily: 'Klee One', fontWeight: '600', wordWrap: 'break-word', pointerEvents: 'none' }}>
          Email
        </label>
        <input
          name="email" type="email" value={form.email} onChange={handleChange}
          style={{ width: '32.05cqw', left: '63.37cqw', top: '16.11vh', position: 'absolute', background: 'transparent', border: 'none', outline: 'none', color: 'black', fontSize: '2.93vh', fontFamily: 'Klee One', fontWeight: '600', opacity: 1 }}
        />

        {/* Password */}
        <div style={{ width: '32.05cqw', height: 0, left: '63.37cqw', top: '32.03vh', position: 'absolute', outline: '5px #714012 solid', outlineOffset: '-2.50px' }} />
        <label style={{ left: '63.37cqw', top: '26.86vh', position: 'absolute', opacity: form.password ? 0 : 0.80, color: 'black', fontSize: '2.93vh', fontFamily: 'Klee One', fontWeight: '600', wordWrap: 'break-word', pointerEvents: 'none' }}>
          Password
        </label>
        <input
          name="password" type="password" value={form.password} onChange={handleChange}
          style={{ width: '32.05cqw', left: '63.37cqw', top: '26.86vh', position: 'absolute', background: 'transparent', border: 'none', outline: 'none', color: 'black', fontSize: '2.93vh', fontFamily: 'Klee One', fontWeight: '600', opacity: 1 }}
        />

        <button
          type="submit"
          style={{ width: '32.05cqw', height: '7.81vh', left: '63.37cqw', top: '37.60vh', position: 'absolute', background: 'rgba(112.54, 63.68, 17.96, 0.60)', borderRadius: 20, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <span style={{ color: 'white', fontSize: '3.91vh', fontFamily: 'Inria Serif', fontWeight: '700', wordWrap: 'break-word' }}>
            Login
          </span>
        </button>

        {error && (
          <p style={{ width: '32.05cqw', left: '63.37cqw', top: '45.70vh', position: 'absolute', color: '#B00020', fontSize: '1.70vh', fontFamily: 'Klee One', fontWeight: '600', wordWrap: 'break-word' }}>
            {error}
          </p>
        )}
      </form>

      <p style={{ left: '63.37cqw', top: '47.85vh', position: 'absolute', color: 'black', fontSize: '1.95vh', fontFamily: 'Klee One', fontWeight: '400' }}>
        New user? <Link to="/register" style={{ color: '#714012', fontWeight: 600 }}>Register</Link>
      </p>
      <p style={{ left: '63.37cqw', top: '51.50vh', position: 'absolute', color: 'black', fontSize: '1.95vh', fontFamily: 'Klee One', fontWeight: '400' }}>
        <Link to="/forgot-password" style={{ color: '#714012', fontWeight: 600 }}>Forgot password?</Link>
      </p>
    </div>
  );
}