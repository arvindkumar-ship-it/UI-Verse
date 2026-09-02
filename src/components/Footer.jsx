// export function Footer() {
//   return (
//     <div className="footer-outer">
//       <footer className="footer">
//         <div className="footer-wordmark">LOGIX</div>
//         <div className="footer-content">
//           <div className="footer-section">
//             <h4 className="footer-logo">UI Verse</h4>
//             <div className="footer-links">
//               <p>Register now!</p>
//               <p>Sign In</p>
//             </div>
//           </div>
//           <div className="footer-section">
//             <h4>Contact Us</h4>
//             <p>contact@uiverse.com</p>
//             <p>Phone: 609053540</p>
//             <div className="social-links">
//               <a href="#" className="social-link">LinkedIn</a>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }




// import { Instagram, Linkedin } from 'lucide-react';

// export function Footer() {
//   return (
//     <div className="footer-outer">
//       <footer className="footer">
//         <div className="footer-wordmark">LOGIX</div>
//         <div className="footer-content">
//           <div className="footer-section">
//             <h4 className="footer-logo">UI Verse</h4>
//             <div className="footer-links">
//               <p>Register now!</p>
//               <p>Sign In</p>
//             </div>
//           </div>
//           <div className="footer-section">
//             <h4>Contact Us</h4>
//             <p>contact@uiverse.com</p>
//             <p>Phone: 609053540</p>
//             <div className="social-links">
//               <a href="#" className="social-icon" aria-label="Instagram">
//                 <Instagram size={20} />
//               </a>
//               <a href="#" className="social-icon" aria-label="LinkedIn">
//                 <Linkedin size={20} />
//               </a>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }







export function Footer() {
  return (
    <div className="footer-outer">
      <footer className="footer">
        <div className="footer-wordmark">LOGIX</div>
        <div className="footer-content">
          <div className="footer-section">
            <h4 className="footer-logo">
              <span className="footer-logo-ui">UI</span> <span className="footer-logo-verse">Verse</span>
            </h4>
            <div className="footer-links">
              <p>Register now!</p>
              <p>Sign In</p>
            </div>
          </div>
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>contact@uiverse.com</p>
            <p>Phone: 609053540</p>
            <div className="social-links">
              <a href="#" className="social-icon" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="LinkedIn">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}