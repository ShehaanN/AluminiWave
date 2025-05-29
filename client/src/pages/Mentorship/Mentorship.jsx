import Sidebar from "../Sidebar/Sidebar";
import { Link } from "react-router-dom";
import sara from "../../assets/sara.png";
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
              console.log("Recommended Mentors:", data.recommendations);
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
            {userType === "alumni" && (
              <div className="flex ">
                <Link to="/sturequest">
                  <button className="px-4 py-2 bg-[#269EB2] text-white rounded-lg w-full md:w-auto min-h-[44px]">
                    <i class="fa-solid fa-bell mr-2"></i>Student Requests
                  </button>
                </Link>
              </div>
            )}
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
                      No recommended mentors found
                    </div>
                  ) : (
                    recommendedMentors.map((mentor) => (
                      <div
                        key={mentor.id}
                        className="bg-white rounded-lg shadow p-6"
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
                          {mentor.skills_expertise
                            ?.slice(0, 2)
                            .map((skill, index) => (
                              <span
                                key={index}
                                className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm mr-2"
                              >
                                {skill}
                              </span>
                            ))}
                        </div>
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
                    ))
                  )}
                </div>
              )}
              {userType === "alumni" && <div></div>}

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

                {userType === "alumni" && (
                  <Card className="w-[650px] p-8 border-none mt-4 shadow-none">
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
                  </Card>
                )}
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
                      {selectedMentor.professional_summary}
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
