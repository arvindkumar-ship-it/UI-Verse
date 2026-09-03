// export function Navbar() {
//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         <div className="navbar-logo">LOGIX</div>
//         <div className="nav-items">
//           <a href="#home" className="nav-link">HOME</a>
//           <a href="#events" className="nav-link">EVENTS</a>
//           <a href="#team" className="nav-link">MEET THE TEAM</a>
//           <a href="#schedule" className="nav-link">SCHEDULE</a>
//         </div>
//         <button className="btn-signin">SIGN IN</button>
//       </div>
//     </nav>
//   );
// }

// import { Link } from 'react-router-dom';

// export function Navbar() {
//   return (
//     <nav className="navbar">
//       <div className="navbar-logo-pill">LOGIX</div>
//       <div className="navbar-nav-pill">
//         <div className="nav-items">
//           <a href="#home" className="nav-link">HOME</a>
//           <Link to="/submission" className="nav-link">EVENTS</Link>
//           <a href="#team" className="nav-link">MEET THE TEAM</a>
//           <a href="#schedule" className="nav-link">SCHEDULE</a>
//         </div>
//         <Link to="/login" className="btn-signin">SIGN IN</Link>
//       </div>
//     </nav>
//   );
// }





import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <nav className="navbar">
      <div className="navbar-logo-pill">LOGIX</div>
      <div className="navbar-nav-pill">
        <div className="nav-items">
          <a href="#home" className="nav-link">HOME</a>
          <Link to="/submission" className="nav-link">EVENTS</Link>
          <a href="#team" className="nav-link">MEET THE TEAM</a>
          <a href="#schedule" className="nav-link">SCHEDULE</a>
        </div>
        {user ? (
          <div className="navbar-profile-wrap" ref={menuRef}>
            <button
              type="button"
              className="navbar-profile-pill"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="navbar-profile-avatar">
                {user.name?.trim()?.[0]?.toUpperCase() || '?'}
              </span>
              <span className="navbar-profile-name">{user.name}</span>
            </button>

            {menuOpen && (
              <div className="navbar-profile-dropdown">
                <div className="navbar-profile-dropdown-row">
                  <span className="navbar-profile-dropdown-label">Name</span>
                  <span className="navbar-profile-dropdown-value">{user.name}</span>
                </div>
                <div className="navbar-profile-dropdown-row">
                  <span className="navbar-profile-dropdown-label">Email</span>
                  <span className="navbar-profile-dropdown-value">{user.email}</span>
                </div>
                <div className="navbar-profile-dropdown-row">
                  <span className="navbar-profile-dropdown-label">Phone</span>
                  <span className="navbar-profile-dropdown-value">
                    {user.phone || 'Not provided'}
                  </span>
                </div>
                <button
                  type="button"
                  className="navbar-profile-logout-btn"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="btn-signin">SIGN IN</Link>
        )}
      </div>
    </nav>
  );
}