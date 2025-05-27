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
import { supabase } from "../../supabaseClient";

import { useEffect, useState } from "react";
import {
  getUserData,
  fetchJobs,
  createJobApplication,
} from "../../services/dataService";
import { formatDistanceToNow } from "date-fns";

export default function JobPortal() {
  // const [timeFilter, setTimeFilter] = useState("Last 30 days");
  const [userType, setUserType] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applicationData, setApplicationData] = useState({
    applicant_name: "",
    contact_number: "",
    email: "",
    cover_letter: "",
    resume: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [currentJobId, setCurrentJobId] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setApplicationData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setApplicationData((prev) => ({
      ...prev,
      resume: file,
    }));
  };

  const handleApply = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const userData = await getUserData();
      if (!userData?.session?.user?.id) {
        throw new Error("Please login to apply");
      }

      // Verify user is alumni
      if (userData.profile.role !== "alumni") {
        throw new Error("Only alumni can apply for jobs");
      }

      let resume_url = null;
      if (applicationData.resume) {
        try {
          const fileName = `${
            userData.session.user.id
          }/${currentJobId}/${Date.now()}_${applicationData.resume.name.replace(
            /\s+/g,
            "_"
          )}`;

          // Upload the file
          const { data: uploadData, error: uploadError } =
            await supabase.storage
              .from("job-resumes")
              .upload(fileName, applicationData.resume);

          if (uploadError) throw uploadError;

          // Get the signed URL
          const { data: urlData, error: urlError } = await supabase.storage
            .from("job-resumes")
            .createSignedUrl(fileName, 3600);

          if (urlError) throw urlError;

          if (!urlData?.signedUrl) {
            throw new Error("Failed to generate signed URL for resume");
          }

          resume_url = urlData.signedUrl;
        } catch (uploadError) {
          console.error("Resume upload error:", uploadError);
          throw new Error("Failed to upload resume. Please try again.");
        }
      }

      const application = await createJobApplication({
        job_id: currentJobId,
        applicant_user_id: userData.session.user.id,
        cover_letter_text: applicationData.cover_letter,
        resume_url: resume_url,
        status: "pending",
      });

      alert("Application submitted successfully!");
      setApplicationData({
        applicant_name: "",
        contact_number: "",
        email: "",
        cover_letter: "",
        resume: null,
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  };
  useEffect(() => {
    const loadData = async () => {
      try {
        const [userData, jobsData] = await Promise.all([
          getUserData(),
          fetchJobs(),
        ]);

        if (userData) {
          setUserType(userData.profile.role);
        }

        setJobs(jobsData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <>
      {userType === "alumni" && (
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar userType={userType} />

          <main className="flex-1 md:ml-64 ml-0 px-8 py-4 bg-gray-50">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Job Portal</h1>

                <div className="flex flex-wrap space-x-4  ">
                  <Link to="/managejob">
                    <button className="px-4 py-2 bg-[#7a999e] text-white rounded-lg w-full md:w-auto min-h-[44px]">
                      <i className="fas fa-cog mr-2"></i>Manage
                    </button>
                  </Link>
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
                    {loading ? (
                      <div>Loading jobs...</div>
                    ) : jobs.length === 0 ? (
                      <div>No jobs found</div>
                    ) : (
                      jobs.map((job) => (
                        <div
                          key={job.id}
                          className="bg-white rounded-lg shadow-lg p-6"
                        >
                          <div className="flex justify-between mb-3">
                            <h3 className="font-bold text-gray-800">
                              {job.job_title}
                            </h3>
                          </div>
                          <p className="mb-3 text-sm text-gray-600">
                            {job.company_name} • {job.location}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="px-2 py-1.5 text-xs bg-gray-100 rounded-md">
                              {job.job_type}
                            </span>
                            <span className="px-2 py-1.5 text-xs bg-gray-100 rounded-md">
                              ${job.salary_range_min}-${job.salary_range_max}
                            </span>
                          </div>
                          <p className="mb-4 text-sm text-gray-700">
                            {job.description.substring(0, 150)}...
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">
                              Posted{" "}
                              {formatDistanceToNow(new Date(job.created_at))}{" "}
                              ago
                            </span>
                            <Dialog>
                              <DialogTrigger asChild>
                                <button
                                  className="px-3 py-2 text-sm font-medium text-white bg-[#269EB2] rounded-md hover:bg-[#269EB2]/90"
                                  onClick={() => setCurrentJobId(job.id)}
                                >
                                  Quick Apply
                                </button>
                              </DialogTrigger>
                              <DialogContent className="max-w-[455px] min-w-[600px]">
                                <DialogHeader>
                                  <DialogTitle>Job Application</DialogTitle>
                                  <DialogDescription>
                                    Apply for {job.job_title} at{" "}
                                    {job.company_name}
                                  </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleApply}>
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label
                                        htmlFor="applicant_name"
                                        className="text-right"
                                      >
                                        Full Name
                                      </Label>
                                      <Input
                                        id="applicant_name"
                                        value={applicationData.applicant_name}
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                        required
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label
                                        htmlFor="contact_number"
                                        className="text-right"
                                      >
                                        Contact Number
                                      </Label>
                                      <Input
                                        id="contact_number"
                                        value={applicationData.contact_number}
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                        required
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label
                                        htmlFor="email"
                                        className="text-right"
                                      >
                                        Email
                                      </Label>
                                      <Input
                                        id="email"
                                        type="email"
                                        value={applicationData.email}
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                        required
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label
                                        htmlFor="cover_letter"
                                        className="text-right"
                                      >
                                        Cover Letter
                                      </Label>
                                      <Textarea
                                        id="cover_letter"
                                        placeholder="Type your message here."
                                        value={applicationData.cover_letter}
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                        required
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label
                                        htmlFor="resume"
                                        className="text-right"
                                      >
                                        Upload Resume
                                      </Label>
                                      <Input
                                        id="resume"
                                        type="file"
                                        onChange={handleFileChange}
                                        className="col-span-3"
                                        accept=".pdf,.doc,.docx"
                                        required
                                      />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button
                                      type="submit"
                                      className="bg-[#269EB2] text-white"
                                      disabled={submitting}
                                    >
                                      {submitting ? "Submitting..." : "Apply"}
                                    </Button>
                                  </DialogFooter>
                                </form>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      ))
                    )}
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
