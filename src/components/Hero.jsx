// export function Hero() {
//   return (
//     <section className="hero-section">
//       <div className="hero-background">
//         <div className="mountain-landscape"></div>
//       </div>
//       <div className="hero-content">
//         <p className="hero-ui-text">UI</p>
//         <p className="hero-title">Verse</p>
//         <p className="hero-date">September 10, 2026</p>
//         <button className="hero-button">Register here</button>
//       </div>
//     </section>
//   );
// }





export function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-background">
        <video 
          className="mountain-landscape"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-content">
        <p className="hero-ui-text">UI</p>
        <p className="hero-title">Verse</p>
        <p className="hero-date">September 10, 2026</p>
        <button className="hero-button">Register here</button>
        <p className="hero-tagline">Think. Design. Connect. Create</p>
      </div>
    </section>
  );
}