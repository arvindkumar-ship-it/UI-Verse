import { Link } from 'react-router-dom';

export function ThankYouPage() {
  return (
    <div className="thank-you-figma-page">
      <img className="thank-you-bg" src="/images/green-forest.png" alt="" />
      <div className="thank-you-content">
        <h1 className="thank-you-title">THANK YOU !</h1>
        <p className="thank-you-subtitle">Your Submissions are received</p>
      </div>
    </div>
  );
}