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




export function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo-pill">LOGIX</div>
      <div className="navbar-nav-pill">
        <div className="nav-items">
          <a href="#home" className="nav-link">HOME</a>
          <a href="#events" className="nav-link">EVENTS</a>
          <a href="#team" className="nav-link">MEET THE TEAM</a>
          <a href="#schedule" className="nav-link">SCHEDULE</a>
        </div>
        <button className="btn-signin">SIGN IN</button>
      </div>
    </nav>
  );
}