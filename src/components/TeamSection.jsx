import { Link } from 'react-router-dom';
export function TeamSection() {
  return (
    <div className="team-scene">
      <div className="team-row">
        <div className="member-card">
          <img src="/images/general-secretary.jpg" alt="Ashutosh - General Secretary" />
          <div className="member-label">
            <span className="member-name">Ashutosh</span>
            <span className="member-role">General Secretary</span>
          </div>
        </div>
        <div className="member-card">
          <img src="/images/om-secretary.jpg" alt="OM - Secretary" />
          <div className="member-label">
            <span className="member-name">OM</span>
            <span className="member-role">Secretary</span>
          </div>
        </div>
        <div className="member-card">
          <img src="/images/saloni-joint-secretary.jpg" alt="Saloni - Joint Secretary" />
          <div className="member-label">
            <span className="member-name">Saloni</span>
            <span className="member-role">Joint Secretary</span>
          </div>
        </div>
        <div className="member-card">
          <img src="/images/arvind-technical-head.jpg" alt="Arvind - Technical Head" />
          <div className="member-label">
            <span className="member-name">Arvind</span>
            <span className="member-role">Technical Head</span>
          </div>
        </div>
        <div className="member-card">
          <img src="/images/shubhangi-design-head.jpg" alt="Shubhangi - Design Head" />
          <div className="member-label">
            <span className="member-name">Shubhangi</span>
            <span className="member-role">Design Head</span>
          </div>
        </div>
      </div>

      <div className="team-cta">
        <Link to="/submission" className="btn-tan">Explore Event</Link>
        <Link to="/register" className="btn-tan">Register Now!</Link>
      </div>
    </div>
  );
}