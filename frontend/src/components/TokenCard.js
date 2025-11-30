function TokenCard({ token, serving, position, department }) {
  return (
    <div className="token-card">
      <p className="token-label">Your Token Number</p>
      <div className="token-number">{token}</div>
      <p className="department-name">{department}</p>

      <div className="queue-info">
        <div className="info-box">
          <span className="info-label">Now Serving</span>
          <span className="info-value">{serving}</span>
        </div>
        <div className="info-box">
          <span className="info-label">People Ahead of You</span>
          <span className="info-value">{position}</span>
        </div>
      </div>
    </div>
  );
}

export default TokenCard;

