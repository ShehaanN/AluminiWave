// import { useState } from "react";
import {
  Search,
  Upload,
  ChevronDown,
  Bookmark,
  Edit,
  Bell,
  Trash2,
  User,
  Settings,
  BarChart2,
  Users,
  Briefcase,
  Calendar,
  Share2,
} from "lucide-react";
import Sidebar from "../Sidebar/Sidebar";
import { Link } from "react-router-dom";
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

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function JobPortal() {
  // const [timeFilter, setTimeFilter] = useState("Last 30 days");
  const userType = "alumini";

  return (
    <>
      {userType === "alumini" && (
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar userType={userType} />

          <main className="flex-1 md:ml-64 ml-0 px-8 py-4 bg-gray-50">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Job Portal</h1>

                <div className="flex ">
                  <Link to="/postjob">
                    <button className="px-4 py-2 bg-[#415B68] text-white rounded-lg w-full md:w-auto min-h-[44px]">
                      <i className="fas fa-plus mr-2"></i>Post a Job
                    </button>
                  </Link>
                </div>
              </div>

              {/* Content */}
              <div className="grid  grid-cols-1 gap-6">
                <div className="bg-gray-50 rounded-lg  p-6 min-h-screen">
                  {/* Job Search Filters */}
                  <div className="p-5 mb-6 bg-white rounded-lg shadow-md">
                    <h2 className="mb-4 text-lg font-semibold text-gray-800">
                      Job Search Filters
                    </h2>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Industry
                        </label>
                        <div className="relative">
                          <select className="w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>All Industries</option>
                            <option>Technology</option>
                            <option>Finance</option>
                            <option>Healthcare</option>
                            <option>Education</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Location
                        </label>
                        <div className="relative">
                          <select className="w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>All Locations</option>
                            <option>San Francisco, CA</option>
                            <option>New York, NY</option>
                            <option>Seattle, WA</option>
                            <option>Remote</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Job Position
                        </label>
                        <div className="relative">
                          <select className="w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>All Levels</option>
                            <option>Software Engineer</option>
                            <option>Project Manager</option>
                            <option>Manager</option>
                            <option>Accountant</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Job Listings */}
                  <div className="grid grid-cols-3 gap-12 mb-6">
                    {/* Job Card 1 */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                      <div className="flex justify-between mb-3">
                        <h3 className="font-bold text-gray-800">
                          Senior Software Engineer
                        </h3>
                        <button className="text-blue-500 hover:text-blue-600"></button>
                      </div>
                      <p className="mb-3 text-sm text-gray-600">
                        Google • San Francisco, CA
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-2 py-1.5 text-xs bg-gray-100 rounded-md">
                          Full-time
                        </span>
                        <span className="px-2 py-1.5 text-xs bg-gray-100 rounded-md">
                          Remote
                        </span>
                        <span className="px-2 py-1.5 text-xs bg-gray-100 rounded-md">
                          $120k-$180k
                        </span>
                      </div>
                      <p className="mb-4 text-sm text-gray-700">
                        We're looking for an experienced software engineer to
                        join our team and help build the next generation of
                        cloud infrastructure...
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          Posted 2 days ago
                        </span>

                        {/* ------------ */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <button className="px-3 py-2 text-sm font-medium text-white bg-[#269EB2] rounded-md hover:bg-[#269EB2]/90">
                              Quick Apply
                            </button>
                          </DialogTrigger>
                          <DialogContent className=" max-w-[455px] min-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>Job Apply</DialogTitle>
                              <DialogDescription>
                                Click apply when you're done.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                  Candidate Name
                                </Label>
                                <Input
                                  id="name"
                                  value="Sara Chen"
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="contactno"
                                  className="text-right"
                                >
                                  Contact No
                                </Label>
                                <Input
                                  id="contactno"
                                  value=""
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="contactno"
                                  className="text-right"
                                >
                                  Email
                                </Label>
                                <Input
                                  id="contactno"
                                  type="email"
                                  value=""
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="username"
                                  className="text-right"
                                >
                                  Cover Letter
                                </Label>
                                <Textarea
                                  placeholder="Type your message here."
                                  className="col-span-3"
                                  id="description"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="resume" className="text-right">
                                  Upload Resume
                                </Label>
                                <Input
                                  id="resume"
                                  type="file"
                                  value=""
                                  className="col-span-3"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                className="bg-[#269EB2] text-white"
                                type="submit"
                              >
                                Apply
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        {/* ------------- */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
}
