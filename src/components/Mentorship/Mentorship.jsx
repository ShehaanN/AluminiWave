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

import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export default function Mentorship() {
  const [date, setDate] = useState(new Date());
  const userType = "alumini";

  return (
    <div className="min-h-screen flex ">
      <Sidebar userType={userType} />
      <main className="flex-1 md:ml-64 ml-0 px-8 py-4 bg-purple-50">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Mentorship</h1>

            {userType === "student" && (
              <div className="flex ">
                <Link to="/mentors">
                  <button className="px-4 py-2 bg-[#269EB2] text-white rounded-lg w-full md:w-auto min-h-[44px]">
                    <i className="fa-solid fa-magnifying-glass mr-2"></i>Find
                    Mentors
                  </button>
                </Link>
              </div>
            )}
            {userType === "alumini" && (
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
              {/* -------------- */}
              {userType === "student" && (
                <div className="grid grid-cols-4  gap-6">
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                      <img src={sara} className="w-12 h-12 rounded-full" />
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        95% Match
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg">Dr. Sarah Johnson</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Senior ML Engineer at Google
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <i className="fas fa-briefcase mr-2"></i>15 years
                      experience
                    </div>
                    <div className="space-y-2 mb-4">
                      <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm mr-2">
                        Machine Learning
                      </span>
                      <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm">
                        Leadership
                      </span>
                    </div>
                    <button className="w-full bg-[#269EB2] text-white rounded-lg py-3 min-h-[44px]">
                      View Profile
                    </button>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                      <img src={mdp} className="w-12 h-12 rounded-full" />
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        88% Match
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg">Michael Chen</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Senior Project Manager at Alibaba
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <i className="fas fa-briefcase mr-2"></i>10 years
                      experience
                    </div>
                    <div className="space-y-2 mb-4">
                      <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm mr-2">
                        Product Strategy
                      </span>
                      <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm">
                        Startup
                      </span>
                    </div>
                    <button className="w-full bg-[#269EB2] text-white rounded-lg py-3 min-h-[44px]">
                      View Profile
                    </button>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                      <img src={sara} className="w-12 h-12 rounded-full" />
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        82% Match
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg">Emma Williams</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Head Marketing Officer at Telecom
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <i className="fas fa-briefcase mr-2"></i>12 years
                      experience
                    </div>
                    <div className="space-y-2 mb-4">
                      <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm mr-2">
                        Digital Marketing
                      </span>
                      <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm">
                        Strategy
                      </span>
                    </div>
                    <button className="w-full bg-[#269EB2] text-white rounded-lg py-3 min-h-[44px]">
                      View Profile
                    </button>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                      <img src={mdp} className="w-12 h-12 rounded-full" />
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        78% Match
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg">David Kumar</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Senior Cloud Engineer at Microsoft
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <i className="fas fa-briefcase mr-2"></i>8 years
                      experience
                    </div>
                    <div className="space-y-2 mb-4">
                      <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm mr-2">
                        Cloud Computing
                      </span>
                      <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm">
                        DevOps
                      </span>
                    </div>
                    <button className="w-full bg-[#269EB2] text-white rounded-lg py-3 min-h-[44px]">
                      View Profile
                    </button>
                  </div>
                </div>
              )}
              {userType === "alumni" && <div></div>}

              {/* -------------------------- */}
              <div className="flex flex-row justify-between">
                <div className=" mt-4 p-8 ml-24">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border shadow day_selected"
                  />
                </div>
                {userType === "student" && (
                  <Card className="w-[650px] p-8 border-none mt-4 shadow-none">
                    <CardHeader>
                      <CardTitle className="text-2xl">
                        Session Request
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form>
                        <div className="grid w-full items-center gap-3 ">
                          <div className="flex flex-col space-y-1.5">
                            <label htmlFor="mentor">Select Mentor</label>
                            <select
                              id="mentor"
                              name="mentor"
                              className="border p-2 w-full h-10 rounded-md text-sm mt-2 text-gray-700  border-gray-400"
                            >
                              <option value="mentorname">
                                Dr. Sarah Johnson
                              </option>
                              <option value="mentorname">Michael Chen</option>
                              <option value="mentorname">Emma Williams</option>
                              <option value="mentorname">David Kumar</option>
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
                              className="outline-none"
                            />
                          </div>
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter className="flex  justify-between">
                      <Button className="w-full text-lg bg-[#269EB2] text-white px-7 py-6">
                        Request mentor
                      </Button>
                    </CardFooter>
                  </Card>
                )}

                {userType === "alumini" && (
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
    </div>
  );
}
