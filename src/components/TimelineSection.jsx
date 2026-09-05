export function TimelineSection() {
  const events = [
    { title: 'Registration Starts', date: '5 September 2026', icon: '/images/timeline-registration.png', side: 'right' },
    { title: 'Workshop', date: '8 September 2026', icon: '/images/timeline-workshop.png', side: 'left' },
    { title: 'Event start', date: '09 September 2026 (1:30 PM)', icon: '/images/timeline-event.png', side: 'right' },
    { title: 'Prize Distribution', date: '10 September 2026 (4:20 PM)', icon: '/images/timeline-prize.png', side: 'left' }
  ];

  return (
    <section className="timeline-section">
      <div className="timeline-container">
        <div className="timeline-line"></div>
        {events.map((event, index) => (
          <div key={index} className={`timeline-item ${event.side}`}>
            <div className="timeline-dot"></div>
            <div className="timeline-side">
              <img src={event.icon} alt="" className="timeline-icon" />
              <div className="timeline-content">
                <h3>{event.title}</h3>
                <p>{event.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}