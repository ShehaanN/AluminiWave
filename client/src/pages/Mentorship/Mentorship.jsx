import Sidebar from "../Sidebar/Sidebar";
import { Link } from "react-router-dom";

import mdp from "../../assets/mdp.jpg";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  fetchMentorshipRequests,
  scheduleSession,
} from "../../services/dataService";

import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import {
  getUserData,
  fetchAlumniMentors,
  createMentorshipRequest,
} from "../../services/dataService";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

export default function Mentorship() {
  const [date, setDate] = useState(new Date());
  const [userType, setUserType] = useState("");
  const [mentors, setMentors] = useState([]);
  const [recommendedMentors, setRecommendedMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState("");
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewProfileDialog, setViewProfileDialog] = useState(false);

  const [requests, setRequests] = useState([]);

  const [sessionForm, setSessionForm] = useState({
    date: "",
    time: "",
    platform: "Zoom",
    session_url: "",
    agenda_notes: "",
  });

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      setLoading(true);
      const data = await fetchMentorshipRequests();
      console.log("Fetched requests:", data);
      setRequests(data);
    } catch (err) {
      console.error("Error in fetchPendingRequests:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAction = async (requestId, status) => {
    try {
      const { error } = await supabase
        .from("mentorship_requests")
        .update({ status })
        .eq("id", requestId);

      if (error) throw error;

      setRequests((prev) => prev.filter((req) => req.id !== requestId));
      alert(`Request ${status} successfully`);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSessionFormSubmit = async (e, request) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setError(null);

      // Validate form
      if (
        !sessionForm.date ||
        !sessionForm.time ||
        !sessionForm.platform ||
        !sessionForm.session_url
      ) {
        throw new Error("Please fill in all required fields");
      }

      await scheduleSession(request.id, {
        ...sessionForm,
        student_user_id: request.student_user_id,
      });

      setRequests((prev) => prev.filter((req) => req.id !== request.id));
      alert("Session scheduled successfully!");
    } catch (err) {
      setError(err.message);
      console.error("Error scheduling session:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await getUserData();
        if (userData) {
          setUserType(userData.profile.role);

          // Fetch mentors if user is a student
          if (userData.profile.role === "student") {
            const mentorsData = await fetchAlumniMentors();
            setMentors(mentorsData);

            const {
              data: { user },
            } = await supabase.auth.getUser();
            if (user) {
              const { data, error } = await supabase.functions.invoke(
                "recommend-mentors",
                {
                  body: { student_user_id: user.id },
                }
              );

              if (error) throw error;
              setRecommendedMentors(data.recommendations);
            }
          }
        }
      } catch (error) {
        console.error("Error loading data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (!selectedMentor) {
        throw new Error("Please select a mentor");
      }

      if (!description.trim()) {
        throw new Error("Please enter a description");
      }

      await createMentorshipRequest({
        mentorId: selectedMentor,
        message: description,
        areas: [],
      });

      // Reset form
      setSelectedMentor("");
      setDescription("");
      setDate(new Date());

      alert("Mentorship request sent successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex ">
      <Sidebar userType={userType} />
      <main className="flex-1 md:ml-64 ml-0 px-8 py-4 bg-gray-50">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Mentorship</h1>

            {userType === "student" && (
              <div className="flex ">
                <Link to="/activementorships">
                  <button className="px-4 py-2 bg-[#269EB2] text-white rounded-lg w-full md:w-auto min-h-[44px] mr-2">
                    <i className="fa-solid fa-magnifying-glass mr-2"></i>Active
                    Mentorships
                  </button>
                </Link>
                <Link to="/mentors">
                  <button className="px-4 py-2 bg-[#269EB2] text-white rounded-lg w-full md:w-auto min-h-[44px]">
                    <i className="fa-solid fa-magnifying-glass mr-2"></i>Find
                    Mentors
                  </button>
                </Link>
              </div>
            )}

            {/* <div className="flex ">
                <Link to="/sturequest">
                  <button className="px-4 py-2 bg-[#269EB2] text-white rounded-lg w-full md:w-auto min-h-[44px]">
                    <i class="fa-solid fa-bell mr-2"></i>Student Requests
                  </button>
                </Link>
              </div> */}
          </div>

          <div className="grid md:grid-cols-1 grid-cols-1 gap-6">
            <div className="bg-white rounded-lg shadow p-6 min-h-screen">
              {/* Recommended Mentors Section  */}
              {userType === "student" && (
                <div className="grid grid-cols-4 gap-6">
                  {loading ? (
                    <div className="col-span-4 text-center py-8">
                      Loading recommended mentors...
                    </div>
                  ) : error ? (
                    <div className="col-span-4 text-center py-8 text-red-500">
                      {error}
                    </div>
                  ) : recommendedMentors.length === 0 ? (
                    <div className="col-span-4 text-center py-8">
                      {/* No recommended mentors found */}
                    </div>
                  ) : (
                    recommendedMentors.map((mentor) => (
                      <div
                        key={mentor.id}
                        className="bg-white rounded-lg shadow p-6 flex flex-col h-full"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <img
                            src={mentor.profile_photo_url || mdp}
                            className="w-12 h-12 rounded-full"
                            alt={mentor.full_name}
                          />
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                            {mentor.match_score}% Match
                          </span>
                        </div>
                        <h3 className="font-semibold text-lg">
                          {mentor.full_name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          {mentor.current_job_title} at {mentor.current_company}
                        </p>
                        <div className="space-y-2 mb-4">
                          <p className="text-sm font-medium text-gray-800 mb-1">
                            Match Reasons:
                          </p>
                          <ul className="text-sm text-gray-600">
                            {mentor.match_reasons
                              ?.slice(0, 6)
                              .map((skill, index) => (
                                <li key={index} className="flex items-center">
                                  <span className="mr-2 text-3xl">•</span>{" "}
                                  {skill}
                                </li>
                              ))}
                          </ul>
                        </div>
                        <div className="mt-auto">
                          <button
                            className="w-full bg-[#269EB2] text-white rounded-lg py-3 min-h-[44px]"
                            onClick={() => {
                              setSelectedMentor(mentor);
                              setViewProfileDialog(true);
                            }}
                          >
                            View Profile
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
              {userType === "alumni" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">
                      Available Requests
                    </h2>
                  </div>

                  {loading ? (
                    <div className="text-center py-4">Loading requests...</div>
                  ) : error ? (
                    <div className="text-red-500 text-center py-4">{error}</div>
                  ) : requests.length === 0 ? (
                    <div className="text-center py-4">
                      No pending mentorship requests
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      {requests.map((request) => (
                        <div
                          key={request.id}
                          className="bg-white p-6 rounded-lg border border-gray-200 shadow"
                        >
                          <div className="flex items-center mb-4">
                            <img
                              src={mdp}
                              className="w-10 h-10 rounded-full"
                              alt={request.student.full_name}
                            />
                            <div className="ml-3">
                              <h4 className="font-medium text-gray-900">
                                {request.student.full_name}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {request.student.course}
                              </p>
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 mb-4">
                            {request.request_message}
                          </p>

                          {request.areas_of_interest?.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {request.areas_of_interest.map((area, index) => (
                                <span
                                  key={index}
                                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                                >
                                  {area}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="flex gap-3">
                            {/* ----------------- */}
                            <Dialog>
                              <DialogTrigger asChild>
                                <button className="rounded-lg flex-1 bg-[#269EB2] text-white py-2 text-sm font-medium">
                                  Accept
                                </button>
                              </DialogTrigger>
                              <DialogContent className="max-w-[455px] min-w-[600px]">
                                <DialogHeader>
                                  <DialogTitle>Session Scheduling</DialogTitle>
                                  <DialogDescription>
                                    Session Details
                                  </DialogDescription>
                                </DialogHeader>

                                <form
                                  onSubmit={(e) =>
                                    handleSessionFormSubmit(e, request)
                                  }
                                >
                                  <div className="grid w-full items-center gap-3">
                                    <div className="flex flex-col space-y-1.5">
                                      <Label htmlFor="date">
                                        Available Date
                                      </Label>
                                      <Input
                                        id="date"
                                        type="date"
                                        className="h-10"
                                        value={sessionForm.date}
                                        onChange={(e) =>
                                          setSessionForm((prev) => ({
                                            ...prev,
                                            date: e.target.value,
                                          }))
                                        }
                                        required
                                      />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                      <Label htmlFor="time">Time Slot</Label>
                                      <Input
                                        id="time"
                                        type="time"
                                        className="h-10"
                                        value={sessionForm.time}
                                        onChange={(e) =>
                                          setSessionForm((prev) => ({
                                            ...prev,
                                            time: e.target.value,
                                          }))
                                        }
                                        required
                                      />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                      <Label htmlFor="platform">
                                        Select Platform
                                      </Label>
                                      <select
                                        id="platform"
                                        name="platform"
                                        className="border p-2 w-full h-10 rounded-md text-sm mt-2 text-gray-700 border-gray-400"
                                        value={sessionForm.platform}
                                        onChange={(e) =>
                                          setSessionForm((prev) => ({
                                            ...prev,
                                            platform: e.target.value,
                                          }))
                                        }
                                        required
                                      >
                                        <option value="Zoom">Zoom</option>
                                        <option value="MS Teams">
                                          MS Teams
                                        </option>
                                      </select>
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                      <Label htmlFor="session_url">
                                        Session URL
                                      </Label>
                                      <Input
                                        id="session_url"
                                        className="h-10"
                                        placeholder="Enter the session URL"
                                        value={sessionForm.session_url}
                                        onChange={(e) =>
                                          setSessionForm((prev) => ({
                                            ...prev,
                                            session_url: e.target.value,
                                          }))
                                        }
                                        required
                                      />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                      <Label htmlFor="agenda_notes">
                                        Session Agenda
                                      </Label>
                                      <Textarea
                                        placeholder="Type your agenda here..."
                                        id="agenda_notes"
                                        className="outline-none"
                                        value={sessionForm.agenda_notes}
                                        onChange={(e) =>
                                          setSessionForm((prev) => ({
                                            ...prev,
                                            agenda_notes: e.target.value,
                                          }))
                                        }
                                        required
                                      />
                                    </div>
                                  </div>

                                  {error && (
                                    <div className="text-red-500 text-sm mt-2">
                                      {error}
                                    </div>
                                  )}

                                  <DialogFooter className="mt-10">
                                    <Button
                                      type="submit"
                                      disabled={isSubmitting}
                                      className="bg-[#269EB2] text-white"
                                    >
                                      {isSubmitting
                                        ? "Scheduling..."
                                        : "Schedule Session"}
                                    </Button>
                                  </DialogFooter>
                                </form>
                              </DialogContent>
                            </Dialog>
                            {/* ----------------- */}
                            <button
                              onClick={() =>
                                handleRequestAction(request.id, "declined")
                              }
                              className="rounded-lg flex-1 border border-gray-200 text-gray-700 py-2 text-sm font-medium"
                            >
                              Decline
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* -------------------------- */}
              <div className="flex flex-row justify-between">
                {userType === "student" && (
                  <Card className="w-[650px] p-8 border-none mt-4 shadow-none">
                    <CardHeader>
                      <CardTitle className="text-2xl">
                        Session Request
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-3">
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="mentor">Select Mentor</Label>
                            <select
                              id="mentor"
                              name="mentor"
                              value={selectedMentor}
                              onChange={(e) =>
                                setSelectedMentor(e.target.value)
                              }
                              className="border p-2 w-full h-10 rounded-md text-sm mt-2 text-gray-700 border-gray-400"
                              required
                            >
                              <option value="">Select a mentor</option>
                              {mentors.map((mentor) => (
                                <option key={mentor.id} value={mentor.id}>
                                  {mentor.full_name} -{" "}
                                  {mentor.current_job_title} at{" "}
                                  {mentor.current_company}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="flex flex-col space-y-1.5 overflow-x-hidden">
                            <Label
                              className="text-lg mb-1"
                              htmlFor="description"
                            >
                              Description
                            </Label>
                            <Textarea
                              placeholder="Type your message here."
                              id="description"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              className="outline-none"
                              required
                            />
                          </div>

                          {error && (
                            <div className="text-red-500 text-sm mt-2">
                              {error}
                            </div>
                          )}
                        </div>

                        <CardFooter className="flex justify-between px-0 mt-4">
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full text-lg bg-[#269EB2] text-white px-7 py-6"
                          >
                            {isSubmitting
                              ? "Sending request..."
                              : "Request mentor"}
                          </Button>
                        </CardFooter>
                      </form>
                    </CardContent>
                  </Card>
                )}

                {/* <Card className="w-[650px] p-8 border-none mt-4 shadow-none">
                    <CardHeader>
                      <CardTitle className="text-2xl">
                        Session Scheduling
                      </CardTitle>
                      <CardDescription className="mt-4 text-xl text-black">
                        Session Deatails
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="mt-[-12px]">
                      <form>
                        <div className="grid w-full items-center gap-3 ">
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="student">Select Student</Label>
                            <select
                              id="student"
                              name="student"
                              className="border p-2 w-full h-10 rounded-md text-sm mt-2 text-gray-700 border-gray-400"
                            >
                              <option value="">Select a student</option>
                            </select>
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <Label className="text-lg mb-1" htmlFor="date">
                              Available Date
                            </Label>
                            <Input id="date" type="date" className="h-10" />
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <Label className="text-lg mb-1" htmlFor="time">
                              Time Slot
                            </Label>
                            <Input
                              id="time"
                              type="time"
                              className="h-10"
                              placeholder="Name of your project"
                            />
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <label htmlFor="platform">Select Platform</label>
                            <select
                              id="platform"
                              name="platform"
                              className="border p-2 w-full h-10 rounded-md text-sm mt-2 text-gray-700  border-gray-400"
                            >
                              <option value="mentorname">Zoom</option>
                              <option value="mentorname">MS Teams</option>
                            </select>
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <Label
                              className="text-lg mb-1"
                              htmlFor="sessionurl"
                            >
                              Session URL
                            </Label>
                            <Input
                              id="sessionurl"
                              className="h-10"
                              placeholder="Enter the session Url"
                            />
                          </div>

                          <div className="flex flex-col space-y-1.5 overflow-x-hidden">
                            <Label
                              className="text-lg mb-1"
                              htmlFor="sessionagenda"
                            >
                              Session Agenda
                            </Label>
                            <Textarea
                              placeholder="Type your message here."
                              id="sessionagenda"
                              className="outline-none"
                            />
                          </div>
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter className="flex  justify-between">
                      <Button className="w-full text-lg bg-[#269EB2] text-white px-7 py-6">
                        Schedule Session
                      </Button>
                    </CardFooter>
                  </Card> */}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* View Profile Dialog */}
      <Dialog open={viewProfileDialog} onOpenChange={setViewProfileDialog}>
        <DialogContent className="min-w-5xl top-[85%] left-[77%]">
          <DialogHeader>
            <DialogTitle>Mentor Profile</DialogTitle>
          </DialogHeader>
          {selectedMentor && (
            <div className="space-y-6">
              <div className="flex items-start space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={selectedMentor.profile_photo_url || mdp}
                    alt={selectedMentor.full_name}
                  />
                  <AvatarFallback>
                    {selectedMentor.full_name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="text-2xl font-semibold">
                    {selectedMentor.full_name}
                  </h3>
                  <p className="text-gray-500">
                    {selectedMentor.current_job_title} at{" "}
                    {selectedMentor.current_company}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Professional Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-gray-600 leading-relaxed">
                      {selectedMentor.profile_summary}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Skills & Expertise
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedMentor.skills_expertise?.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-purple-100 text-[#415B68] rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Experience Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex  space-x-4">
                      <i className="fas fa-briefcase text-green-500 mt-1.5"></i>
                      <div>
                        <div className="flex">
                          <div>
                            <h3 className="font-semibold">
                              {selectedMentor.current_company}{" "}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {selectedMentor.current_job_title}
                            </p>
                            <p className="text-sm text-gray-500">2017 - 2020</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              className="!rounded-button whitespace-nowrap"
              onClick={() => setViewProfileDialog(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
