import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import MultiSelect from "../Events/MultiSelect";
import { fetchJobs, updateJob, deleteJob } from "../../services/dataService";

const ManageJob = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editFormData, setEditFormData] = useState({
    job_title: "",
    company_name: "",
    location: "",
    job_type: "",
    qualification_requirements: "",
    salary_range_min: "",
    salary_range_max: "",
    description: "",
    key_skills: "",
    reference_email: "",
    application_deadline: "",
    industry: [],
  });
  const [error, setError] = useState(null);

  // Fetch jobs on component mount
  useEffect(() => {
    const loadJobs = async () => {
      try {
        const jobData = await fetchJobs();
        setJobs(jobData || []);
      } catch (error) {
        setError("Failed to load jobs");
        console.error("Error loading jobs:", error);
      }
    };
    loadJobs();
  }, []);

  const handleEditClick = (job) => {
    setSelectedJob(job);
    setEditFormData({
      job_title: job.job_title,
      company_name: job.company_name,
      location: job.location,
      job_type: job.job_type,
      qualification_requirements: job.qualification_requirements,
      salary_range_min: job.salary_range_min,
      salary_range_max: job.salary_range_max,
      description: job.description,
      key_skills: Array.isArray(job.key_skills)
        ? job.key_skills.join(", ")
        : job.key_skills,
      reference_email: job.reference_email,
      application_deadline: job.application_deadline,
      industry: job.industry,
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleIndustryChange = (selectedOptions) => {
    setEditFormData((prev) => ({
      ...prev,
      industry: selectedOptions.map((option) => option.value),
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!selectedJob?.id) return;

    setLoading(true);
    try {
      const updatedJob = await updateJob(selectedJob.id, editFormData);
      setJobs((prev) =>
        prev.map((job) => (job.id === selectedJob.id ? updatedJob : job))
      );
      setSelectedJob(null);
      alert("Job updated successfully!");
    } catch (error) {
      setError("Failed to update job");
      console.error("Error updating job:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await deleteJob(jobId);
      setJobs((prev) => prev.filter((job) => job.id !== jobId));
      alert("Job deleted successfully!");
    } catch (error) {
      setError("Failed to delete job");
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div className="min-h-screen flex">
      <main className="flex-1 px-32 py-4 bg-purple-50">
        <div className="grid md:grid-cols-1 grid-cols-1 gap-6">
          <div className="bg-white min-h-screen rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Manage Job Posting</h2>
              <Link to="/jobportal">
                <button className="px-6 py-2 bg-[#269EB2] text-white rounded-lg w-full md:w-auto min-h-[44px]">
                  <i className="fa-solid fa-backward mr-2"></i>Back
                </button>
              </Link>
            </div>

            <div className="p-8 px-10">
              <div className="overflow-x-auto">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold text-[17px]">
                        Job Title
                      </TableHead>
                      <TableHead className="font-bold text-[17px]">
                        Company
                      </TableHead>
                      <TableHead className="font-bold text-[17px]">
                        Salary
                      </TableHead>
                      <TableHead className="font-bold text-[17px]">
                        Description
                      </TableHead>
                      <TableHead className="flex items-center justify-end mr-24 text-[17px]">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  {error && (
                    <div className="text-red-500 text-sm mt-2">{error}</div>
                  )}

                  <TableBody>
                    {jobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell>{job.job_title}</TableCell>
                        <TableCell>{job.company_name}</TableCell>
                        <TableCell>
                          ${job.salary_range_min}-${job.salary_range_max}
                        </TableCell>
                        <TableCell className="w-[320px]">
                          {job.description.substring(0, 150)}...
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-3">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  className="min-w-[65px] bg-blue-400 text-black"
                                  onClick={() => handleEditClick(job)}
                                >
                                  Edit
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-[455px] min-w-[600px] top-[93%] max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Edit Job</DialogTitle>
                                  <DialogDescription>
                                    Make changes to your job here.
                                  </DialogDescription>
                                </DialogHeader>

                                <form onSubmit={handleEditSubmit}>
                                  <div className="grid w-full items-center gap-3">
                                    <div className="flex flex-col space-y-1.5">
                                      <Label htmlFor="job_title">
                                        Job Title
                                      </Label>
                                      <Input
                                        id="job_title"
                                        value={editFormData.job_title}
                                        onChange={handleInputChange}
                                        className="h-10"
                                        required
                                      />
                                    </div>

                                    <div className="flex flex-col space-y-1.5">
                                      <Label>Company Details</Label>
                                      <div className="flex flex-row justify-between gap-4">
                                        <Input
                                          id="company_name"
                                          value={editFormData.company_name}
                                          onChange={handleInputChange}
                                          className="h-10"
                                          placeholder="Company Name"
                                          required
                                        />
                                        <Input
                                          id="location"
                                          value={editFormData.location}
                                          onChange={handleInputChange}
                                          className="h-10"
                                          placeholder="Location"
                                          required
                                        />
                                      </div>
                                    </div>

                                    <div className="flex flex-col space-y-1.5">
                                      <Label htmlFor="job_type">Job Type</Label>
                                      <Input
                                        id="job_type"
                                        value={editFormData.job_type}
                                        onChange={handleInputChange}
                                        className="h-10"
                                        required
                                      />
                                    </div>

                                    <div className="flex flex-col space-y-1.5">
                                      <Label>Salary Range</Label>
                                      <div className="flex flex-row justify-between gap-4">
                                        <Input
                                          id="salary_range_min"
                                          type="number"
                                          value={editFormData.salary_range_min}
                                          onChange={handleInputChange}
                                          className="h-10"
                                          placeholder="Min Salary"
                                          required
                                        />
                                        <Input
                                          id="salary_range_max"
                                          type="number"
                                          value={editFormData.salary_range_max}
                                          onChange={handleInputChange}
                                          className="h-10"
                                          placeholder="Max Salary"
                                          required
                                        />
                                      </div>
                                    </div>

                                    <div className="flex flex-col space-y-1.5">
                                      <Label htmlFor="qualification_requirements">
                                        Qualification Requirements
                                      </Label>
                                      <Textarea
                                        id="qualification_requirements"
                                        value={
                                          editFormData.qualification_requirements
                                        }
                                        onChange={handleInputChange}
                                        required
                                      />
                                    </div>

                                    <div className="flex flex-col space-y-1.5">
                                      <Label htmlFor="description">
                                        Description
                                      </Label>
                                      <Textarea
                                        id="description"
                                        value={editFormData.description}
                                        onChange={handleInputChange}
                                        required
                                      />
                                    </div>

                                    <div className="flex flex-col space-y-1.5">
                                      <Label htmlFor="key_skills">
                                        Key Skills
                                      </Label>
                                      <Input
                                        id="key_skills"
                                        value={editFormData.key_skills}
                                        onChange={handleInputChange}
                                        className="h-10"
                                        placeholder="Comma separated skills"
                                        required
                                      />
                                    </div>

                                    <div className="flex flex-col space-y-1.5">
                                      <Label htmlFor="reference_email">
                                        Reference Email
                                      </Label>
                                      <Input
                                        id="reference_email"
                                        type="email"
                                        value={editFormData.reference_email}
                                        onChange={handleInputChange}
                                        className="h-10"
                                        required
                                      />
                                    </div>

                                    <div className="flex flex-col space-y-1.5">
                                      <Label htmlFor="application_deadline">
                                        Application Deadline
                                      </Label>
                                      <Input
                                        id="application_deadline"
                                        type="date"
                                        value={
                                          editFormData.application_deadline
                                        }
                                        onChange={handleInputChange}
                                        className="h-10"
                                        required
                                      />
                                    </div>

                                    <div className="flex flex-col space-y-1.5">
                                      <Label htmlFor="industry">Industry</Label>
                                      <MultiSelect
                                        options={[
                                          {
                                            value: "it",
                                            label: "Information Technology",
                                          },
                                          {
                                            value: "finance",
                                            label: "Finance",
                                          },
                                          {
                                            value: "healthcare",
                                            label: "Healthcare",
                                          },
                                          {
                                            value: "engineering",
                                            label: "Engineering",
                                          },
                                          {
                                            value: "education",
                                            label: "Education",
                                          },
                                          {
                                            value: "marketing",
                                            label: "Marketing",
                                          },
                                        ]}
                                        selectedOptions={editFormData.industry}
                                        onChange={handleIndustryChange}
                                      />
                                    </div>
                                  </div>

                                  <DialogFooter className="mt-10">
                                    <Button
                                      type="submit"
                                      disabled={loading}
                                      className="bg-[#269EB2] text-white"
                                    >
                                      {loading ? "Saving..." : "Save changes"}
                                    </Button>
                                  </DialogFooter>
                                </form>
                              </DialogContent>
                            </Dialog>

                            <Button
                              size="sm"
                              className="min-w-[65px] bg-red-400 text-black"
                              onClick={() => handleDeleteClick(job.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManageJob;
