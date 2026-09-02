import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function SubmissionPage() {
  const [showActions, setShowActions] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/thank-you');
  };

  return (
    <div className="submission-figma-page">
      <img className="submission-bg" src="/images/green-forest.png" alt="" />

      <div className="submission-nav-pill">
        <Link to="/" className="submission-nav-link">HOME</Link>
        <span className="submission-nav-divider">|</span>
        <span className="submission-nav-link">EVENTS</span>
      </div>

      <div className="submission-logo">
        <span className="submission-logo-ui">UI</span>
        <span className="submission-logo-verse">Verse</span>
      </div>

      <button className="submission-cta" onClick={() => setShowActions(true)}>
        Submit Your Design
      </button>

      {showActions && (
        <div className="submission-panel">
          <div className="submission-actions">
            <div className="submission-action-row">
              <label className="submission-file-btn">
                Landing Page
                <input type="file" hidden />
              </label>
              <label className="submission-file-btn">
                Login Page
                <input type="file" hidden />
              </label>
            </div>
            <button className="submission-final-btn" onClick={handleSubmit}>
              SUBMIT
            </button>
          </div>
        </div>
      )}

      <div className="submission-powered">powered by Figma</div>
    </div>
  );
}