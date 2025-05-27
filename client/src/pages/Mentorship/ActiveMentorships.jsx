import { useState, useEffect } from "react";
import mdp from "../../assets/mdp.jpg";
import { Link } from "react-router-dom";
import { Timer } from "lucide-react";
import { fetchScheduledSessions } from "../../services/dataService";

const ActiveMentorships = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      setLoading(true);
      const data = await fetchScheduledSessions();
      console.log("Received sessions in component:", data);
      setSessions(data);
    } catch (err) {
      console.error("Error in loadSessions:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    return {
      date: date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const handleJoinMeeting = (sessionUrl) => {
    if (sessionUrl) {
      window.open(sessionUrl, "_blank", "noopener,noreferrer");
    } else {
      alert("Meeting link is not available");
    }
  };

  return (
    <div className="min-h-screen flex">
      <main className="flex-1 px-32 py-4 bg-purple-50">
        <div className="p-6">
          <div className="flex justify-end items-center mb-6">
            <div className="flex flex-wrap md:flex-nowrap space-x-0 md:space-x-4 space-y-2 md:space-y-0 w-full md:w-auto">
              <Link to="/mentorship">
                <button className="px-6 py-2 bg-[#269EB2] text-white rounded-lg w-full md:w-auto min-h-[44px]">
                  <i className="fa-solid fa-backward mr-2"></i>Back
                </button>
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-1 grid-cols-1 gap-6">
            <div className="col-span-2">
              <div className="bg-white min-h-screen rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Active Mentorships</h2>
                </div>

                {loading ? (
                  <div className="text-center py-4">Loading sessions...</div>
                ) : error ? (
                  <div className="text-red-500 text-center py-4">{error}</div>
                ) : sessions.length === 0 ? (
                  <div className="text-center py-4">
                    No scheduled sessions found
                  </div>
                ) : (
                  <div className="flex flex-col space-y-6">
                    {sessions.map((session) => {
                      const { date, time } = formatDateTime(
                        session.session_datetime
                      );
                      const isSessionActive =
                        new Date(session.session_datetime) <= new Date();

                      return (
                        <div
                          key={session.id}
                          className="bg-gray-100 rounded-lg shadow p-6"
                        >
                          <div className="flex flex-row justify-between">
                            <div className="w-10/12">
                              <div className="flex items-center">
                                <div className="mb-4 mr-3">
                                  <img
                                    src={session.alumni?.avatar_url || mdp}
                                    className="w-12 h-12 rounded-full"
                                    alt={session.alumni?.full_name}
                                  />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-lg">
                                    {session.alumni?.full_name}
                                  </h3>
                                  <p className="text-gray-600 text-sm">
                                    {session.alumni?.current_job_title}
                                  </p>
                                  <p className="text-gray-500 text-sm mb-3">
                                    {session.alumni?.current_company}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center text-sm text-gray-700 mb-4">
                                <i className="fa-solid fa-calendar mr-3"></i>
                                {date}
                              </div>

                              <div className="flex items-center text-sm text-gray-700 mb-4">
                                <Timer className="mr-2 size-4.5 text-gray-800" />
                                {time}
                              </div>

                              <div className="flex items-center text-sm text-gray-700 mb-4">
                                <i className="fa-solid fa-video mr-3"></i>
                                {session.platform}
                              </div>

                              <div className="flex items-start mb-4">
                                <i className="fa-regular fa-message mr-2 mt-1"></i>
                                <p className="text-gray-700 text-sm">
                                  {session.agenda_notes}
                                </p>
                              </div>
                            </div>

                            <div>
                              <button
                                onClick={() =>
                                  handleJoinMeeting(session.session_url)
                                }
                                className={`px-5 py-3 min-h-[44px] rounded-lg ${
                                  isSessionActive
                                    ? "bg-[#269EB2] text-white"
                                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                                }`}
                                disabled={!isSessionActive}
                              >
                                Join Meeting
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ActiveMentorships;
