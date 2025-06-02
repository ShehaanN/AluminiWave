import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Sidebar from "../Sidebar/Sidebar";
import dp from "../../assets/mdp.jpg";
import { getUserData } from "../../services/dataService";
import { formatDistance } from "date-fns";

const Dashboard = () => {
  const [userType, setUserType] = useState("");
  const [user, setUser] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [mentorshipStats, setMentorshipStats] = useState({
    pendingRequests: 0,
    activeSessions: 0,
    requestType: "",
  });
  const [activeJobsCount, setActiveJobsCount] = useState(0);
  const [activeMentorships, setActiveMentorships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recentJobs, setRecentJobs] = useState([]);

  console.log("userdata", user);
  console.log("activementorshipsdata", activeMentorships);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Get user data
        const userData = await getUserData();
        if (!userData) return;

        setUserType(userData.profile.role);
        setUser(userData.profile);

        // Fetch recent jobs
        const { data: jobs, error: jobsError } = await supabase
          .from("jobs")
          .select("*")
          .eq("is_active", true)
          .order("created_at", { ascending: false })
          .limit(3);

        if (jobsError) throw jobsError;
        setRecentJobs(jobs || []);

        // Fetch upcoming events
        const { data: events, error: eventsError } = await supabase
          .from("events")
          .select("id, title, event_date, location")
          .eq("status", "upcoming")
          .gte("event_date", new Date().toISOString().split("T")[0])
          .order("event_date", { ascending: true })
          .limit(3);

        if (eventsError) throw eventsError;
        setUpcomingEvents(events || []);

        // Fetch mentorship stats
        let stats = { pendingRequests: 0, activeSessions: 0, requestType: "" };

        if (userData.profile.role === "student") {
          stats.requestType = "sent";
          const { count: pendingCount } = await supabase
            .from("mentorship_requests")
            .select("*", { count: "exact", head: true })
            .eq("student_user_id", userData.session.user.id)
            .eq("status", "pending");
          stats.pendingRequests = pendingCount || 0;
        } else if (userData.profile.role === "alumni") {
          stats.requestType = "received";
          const { count: pendingCount } = await supabase
            .from("mentorship_requests")
            .select("*", { count: "exact", head: true })
            .eq("alumni_user_id", userData.session.user.id)
            .eq("status", "pending");
          stats.pendingRequests = pendingCount || 0;

          // Fetch active jobs count for alumni
          const { count: jobsCount } = await supabase
            .from("jobs")
            .select("*", { count: "exact", head: true })
            .eq("is_active", true);
          setActiveJobsCount(jobsCount || 0);
        }

        // Get active sessions count for both roles
        const { count: activeCount } = await supabase
          .from("mentorship_sessions")
          .select("*", { count: "exact", head: true })
          .or(
            `student_user_id.eq.${userData.session.user.id},alumni_user_id.eq.${userData.session.user.id}`
          )
          .eq("status", "scheduled");
        stats.activeSessions = activeCount || 0;

        setMentorshipStats(stats);

        // Fetch active mentorship sessions
        const { data: sessions } = await supabase
          .from("mentorship_sessions")
          .select(
            `
            id,
            session_datetime,
            status,
            student:profiles!student_user_id (full_name, profile_photo_url),
            alumni:profiles!alumni_user_id (full_name, profile_photo_url)
          `
          )
          .or(
            `student_user_id.eq.${userData.session.user.id},alumni_user_id.eq.${userData.session.user.id}`
          )
          .eq("status", "scheduled")
          .order("session_datetime", { ascending: true })
          .limit(3);

        setActiveMentorships(sessions || []);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar userType={userType} />
      <main className="flex-1 ml-64 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.full_name.split(" ")[0] || "User"}!
            </h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer size-12">
                  <AvatarImage src={user?.profile_photo_url || dp} />
                  <AvatarFallback>
                    {user?.full_name.split(" ")[0]?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to="/settings">
                  <DropdownMenuItem>Update Profile</DropdownMenuItem>
                </Link>

                <Link to="/">
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div
            className={`grid ${
              userType === "alumni" ? "grid-cols-3" : "grid-cols-2"
            } gap-6 mb-8`}
          >
            {/* Upcoming Events Card */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-calendar text-[#269EB2]"></i>
              </div>
              <h3 className="font-semibold text-gray-900">UPCOMING EVENTS</h3>
              <div className="text-3xl font-bold">{upcomingEvents.length}</div>
              <Link to="/events">
                <button className="mt-4 !rounded-button rounded-lg bg-[#269EB2] w-30 text-white px-4 py-2 text-sm font-medium">
                  More Events
                </button>
              </Link>
            </div>

            {/* Mentorship Stats Card */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-users text-[#269EB2]"></i>
              </div>
              <h3 className="font-semibold text-gray-900">MENTORSHIPS</h3>
              <div className="text-3xl font-bold">
                {mentorshipStats.activeSessions}
              </div>
              <Link to={userType === "student" ? "/mentors" : "/sturequest"}>
                <button className="mt-4 !rounded-button rounded-lg bg-[#269EB2] w-40 text-white px-4 py-2 text-sm font-medium">
                  {userType === "student" ? "Find Mentors" : "View Requests"}
                </button>
              </Link>
            </div>

            {/* Job Opportunities Card (Alumni Only) */}
            {userType === "alumni" && (
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-briefcase text-[#269EB2]"></i>
                </div>
                <h3 className="font-semibold text-gray-900">
                  JOB OPPORTUNITIES
                </h3>
                <div className="text-3xl font-bold">{activeJobsCount}</div>
                <Link to="/jobportal">
                  <button className="mt-4 !rounded-button rounded-lg bg-[#269EB2] w-30 text-white px-4 py-2 text-sm font-medium">
                    Explore Jobs
                  </button>
                </Link>
              </div>
            )}
          </div>
          {/* Upcoming Events Section */}
          <div className="bg-white rounded-lg border border-gray-200 mb-8">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Upcoming Events
              </h2>
              <div className="divide-y divide-gray-200">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="py-4 flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <i className="fas fa-calendar text-[#269EB2]"></i>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium text-gray-900">
                          {event.title}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {new Date(event.event_date).toLocaleDateString()} •{" "}
                          {event.location}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/events">
                <button className="mt-6 w-full !rounded-button rounded-lg bg-[#269EB2] text-white py-2 font-medium">
                  View All Events
                </button>
              </Link>
            </div>
          </div>
          {/* Active Mentorships Section */}
          <div className="bg-white rounded-lg border border-gray-200 mb-8">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Active Mentorships
              </h2>
              <div className="space-y-4">
                {activeMentorships.map((session) => (
                  <div key={session.id} className="border-b pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={
                              userType === "student"
                                ? session.alumni.profile_photo_url
                                : session.student.profile_photo_url
                            }
                          />
                          <AvatarFallback>
                            {userType === "student"
                              ? session.alumni.full_name?.charAt(0)
                              : session.student.full_name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <h3 className="font-semibold">
                            Session with{" "}
                            {userType === "student"
                              ? session.alumni.full_name
                              : session.student.full_name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {new Date(
                              session.session_datetime
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      {userType === "student" && (
                        <Link to="/activementorships">
                          <button className="px-4 py-2 bg-[#269EB2] text-white rounded-lg">
                            View Session
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Recent Job Postings Section */}
          {userType === "alumni" && (
            <>
              <div className="bg-white rounded-lg border border-gray-200 mb-8">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Career Resources
                  </h2>
                  <div className="divide-y divide-gray-200">
                    {recentJobs.map((job) => (
                      <div
                        key={job.id}
                        className="py-4 flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <i className="fas fa-briefcase text-[#269EB2]"></i>
                          </div>
                          <div className="ml-4">
                            <h4 className="font-medium text-gray-900">
                              {job.job_title}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {job.company_name} • {job.location}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-500">
                            Posted{" "}
                            {formatDistance(
                              new Date(job.created_at),
                              new Date(),
                              { addSuffix: true }
                            )}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Link to="/jobportal">
                      <button className="!rounded-button rounded-lg w-full bg-[#269EB2] text-white py-2 font-medium">
                        View All Jobs
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
