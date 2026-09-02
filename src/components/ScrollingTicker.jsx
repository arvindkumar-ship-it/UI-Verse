export function ScrollingTicker() {
  const items = ['HACKATHONS', 'COMPETITIONS', 'SEMINARS', 'GUEST LECTURE', 'WORKSHOPS'];
  const repeatedItems = [...items, ...items]; // Repeat for seamless loop

  return (
    <div className="ticker-container">
      <div className="ticker-track">
        {repeatedItems.map((item, index) => (
          <span key={index} className="ticker-item">{item}</span>
        ))}
      </div>
    </div>
  );
}
