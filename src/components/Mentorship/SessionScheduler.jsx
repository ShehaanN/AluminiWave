import './SessionScheduler.css';

export default function SessionScheduler({ nextSession, onScheduleClick }) {
  return (
    <div className="session-card">
      <h2 className="session-title">Upcoming Mentorship Session</h2>
      {nextSession ? (
        <div className="session-info">
          <p><strong>Date:</strong> {nextSession.date}</p>
          <p><strong>Time:</strong> {nextSession.time}</p>
          <p><strong>With:</strong> {nextSession.mentor}</p>
        </div>
      ) : (
        <p className="session-none">No session scheduled.</p>
      )}
      <button className="session-button" onClick={onScheduleClick}>
        Schedule Session
      </button>
    </div>
  );
}
