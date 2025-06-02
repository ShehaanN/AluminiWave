import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createJob } from "../../services/dataService";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import MultiSelect from "../Events/MultiSelect";
import { getUserData } from "../../services/dataService";

const PostJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    job_title: "",
    company_name: "",
    location: "",
    job_type: "",
    description: "",
    qualification_requirements: "",
    salary_range_min: "",
    salary_range_max: "",
    key_skills: "",
    reference_email: "",
    application_deadline: "",
    industry: [],
    // application_url: "",
    is_active: true,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleIndustryChange = (selectedOptions) => {
    setFormData((prev) => ({
      ...prev,
      industry: selectedOptions.map((option) => option.value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get current user session
      const userData = await getUserData();
      if (!userData?.session?.user?.id) {
        throw new Error("You must be logged in to post a job");
      }

      const jobData = {
        ...formData,
        posted_by_user_id: userData.session.user.id,
        key_skills: formData.key_skills.split(",").map((skill) => skill.trim()),
        salary_range_min: parseInt(formData.salary_range_min),
        salary_range_max: parseInt(formData.salary_range_max),
        is_active: true,
      };

      console.log("Submitting job data:", jobData); // Debug log

      const result = await createJob(jobData);

      if (result) {
        alert("Job posted successfully!");
        navigate("/jobPortal");
      } else {
        throw new Error("Failed to create job - no data returned");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      alert(error.message || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 ml-0 bg-gray-50">
        <div className="p-10">
          <div className="flex justify-center mx-auto p-5">
            <Card className="w-[650px] p-8">
              <CardHeader>
                <CardTitle className="text-2xl">Job Posting</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="grid w-full items-center gap-3">
                    <div className="flex flex-col space-y-1.5">
                      <Label className="text-lg mb-1" htmlFor="job_title">
                        Job Title
                      </Label>
                      <Input
                        id="job_title"
                        className="h-10"
                        placeholder="Job Position"
                        value={formData.job_title}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <Label className="text-lg mb-1">Company Details</Label>
                      <div className="flex flex-row justify-between gap-4">
                        <Input
                          id="company_name"
                          type="text"
                          className="h-10"
                          placeholder="Company Name"
                          value={formData.company_name}
                          onChange={handleChange}
                          required
                        />
                        <Input
                          id="location"
                          type="text"
                          className="h-10"
                          placeholder="Location"
                          value={formData.location}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <Label className="text-lg mb-1" htmlFor="job_type">
                        Job Type
                      </Label>
                      <Input
                        id="job_type"
                        type="text"
                        className="h-10"
                        placeholder="Full-time, Part-time, etc."
                        value={formData.job_type}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <Label className="text-lg mb-1">Salary Range</Label>
                      <div className="flex flex-row justify-between gap-4">
                        <Input
                          id="salary_range_min"
                          type="number"
                          className="h-10"
                          placeholder="Minimum Salary"
                          value={formData.salary_range_min}
                          onChange={handleChange}
                          required
                        />
                        <Input
                          id="salary_range_max"
                          type="number"
                          className="h-10"
                          placeholder="Maximum Salary"
                          value={formData.salary_range_max}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <Label
                        className="text-lg mb-1"
                        htmlFor="qualification_requirements"
                      >
                        Qualification Requirements
                      </Label>
                      <Textarea
                        id="qualification_requirements"
                        placeholder="Required qualifications"
                        value={formData.qualification_requirements}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <Label className="text-lg mb-1" htmlFor="description">
                        Job Description
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Detailed job description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <Label className="text-lg mb-1" htmlFor="key_skills">
                        Key Skills
                      </Label>
                      <Input
                        id="key_skills"
                        type="text"
                        className="h-10"
                        placeholder="Skills (comma-separated)"
                        value={formData.key_skills}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <Label className="text-lg mb-1" htmlFor="reference_email">
                        Reference Email
                      </Label>
                      <Input
                        id="reference_email"
                        type="email"
                        className="h-10"
                        placeholder="Contact Email"
                        value={formData.reference_email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <Label
                        className="text-lg mb-1"
                        htmlFor="application_deadline"
                      >
                        Application Deadline
                      </Label>
                      <Input
                        id="application_deadline"
                        type="date"
                        className="h-10"
                        value={formData.application_deadline}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* <div className="flex flex-col space-y-1.5">
                      <Label className="text-lg mb-1" htmlFor="application_url">
                        Application URL
                      </Label>
                      <Input
                        id="application_url"
                        type="url"
                        className="h-10"
                        placeholder="Link to apply"
                        value={formData.application_url}
                        onChange={handleChange}
                      />
                    </div> */}

                    <div className="flex flex-col space-y-1.5">
                      <Label className="text-lg mb-1" htmlFor="industry">
                        Industry
                      </Label>
                      <MultiSelect
                        options={[
                          { value: "it", label: "Information Technology" },
                          { value: "finance", label: "Finance" },
                          { value: "healthcare", label: "Healthcare" },
                          { value: "engineering", label: "Engineering" },
                          { value: "education", label: "Education" },
                          { value: "marketing", label: "Marketing" },
                        ]}
                        selectedOptions={formData.industry}
                        onChange={handleIndustryChange}
                      />
                    </div>
                  </div>

                  <CardFooter className="flex justify-between pt-6">
                    <Button
                      type="submit"
                      className="bg-[#269EB2] text-white px-7 py-5"
                      disabled={loading}
                    >
                      {loading ? "Posting..." : "Post Job"}
                    </Button>
                    <Link to="/jobPortal">
                      <Button className="px-7 py-5" variant="outline">
                        Cancel
                      </Button>
                    </Link>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
