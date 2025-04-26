import './ActiveMentorshipCard.css';

export default function ActiveMentorshipCard({ mentee, mentor, goal, current, total }) {
  return (
    <div className="active-card">
      <h2 className="active-title">Active Mentorship</h2>

      <div className="active-info">
        <p><strong>Mentee:</strong> {mentee}</p>
        <p><strong>Mentor:</strong> {mentor}</p>
        <p><strong>Goal:</strong> {goal}</p>
      </div>

      <div className="active-progress">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(current / total) * 100}%` }}
          />
        </div>
        <p className="progress-text">{current} of {total} sessions completed</p>
      </div>
    </div>
  );
}
