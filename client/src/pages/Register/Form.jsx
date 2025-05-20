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
import MultiSelect from "../Events/MultiSelect";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export function Personal({ formData, setFormData }) {
  // console.log(formData.role);

  return (
    <Card className="w-[650px] p-8 border-none shadow-none ">
      <CardHeader>
        <CardTitle className="text-2xl">Account Creation</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-3 ">
            <div className="flex flex-col space-y-1.5">
              <Label className="text-lg mb-1" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                className="h-10"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  });
                }}
                value={formData.email}
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="text-lg mb-1" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  });
                }}
                value={formData.password}
                placeholder="Password"
                className="h-10"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="text-lg mb-1" htmlFor="confirmpassword">
                Confirm Password
              </Label>
              <Input
                id="confirmpassword"
                type="password"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  });
                }}
                value={formData.confirmPassword}
                placeholder="Confirm Password"
                className="h-10"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="type">I am a</label>
              <select
                id="type"
                name="type"
                onChange={(e) => {
                  setFormData({ ...formData, role: e.target.value });
                }}
                value={formData.role}
                className="border p-2 w-full text-sm mt-2 h-10 rounded-md text-gray-600  border-gray-400"
              >
                <option value="alumni">Alumni</option>
                <option value="student">Student</option>
              </select>
            </div>
            {/* <div className="flex items-center space-x-2 mt-2">
              <Checkbox id="terms" className="border-2 border-gray-400" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
              >
                Accept terms and conditions
              </label>
            </div> */}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

//----------------------------------------------------------

export function Signup({ formData, setFormData }) {
  return (
    <Card className="w-[650px] p-8 border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">Basic Profile Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-3 ">
            <div className="flex flex-col space-y-1.5">
              <Label className="text-lg mb-1" htmlFor="picture">
                Upload a profile photo
              </Label>
              <Input
                id="picture"
                className="h-10 border-gray-500"
                type="file"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="text-lg mb-1" htmlFor="name">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Enter your name"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    fullName: e.target.value,
                  });
                }}
                value={formData.fullName}
                type="text"
                className="h-10"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                onChange={(e) => {
                  setFormData({ ...formData, gender: e.target.value });
                }}
                value={formData.gender}
                className="border p-2 w-full text-sm mt-2 rounded-md text-gray-600  border-gray-400"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <label>Date of Birth</label>
              <input
                type="date"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    dateOfBirth: e.target.value,
                  });
                }}
                value={formData.dateOfBirth}
                className="border p-2 w-full text-sm mt-2 text-gray-600  border-gray-400"
              />
            </div>
            {formData.role === "student" && (
              <>
                <div className="flex flex-col space-y-1.5">
                  <Label className="text-lg mb-1" htmlFor="course">
                    Course
                  </Label>
                  <Input
                    id="course"
                    placeholder="e.g.BSc in Biology"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        course: e.target.value,
                      });
                    }}
                    value={formData.course}
                    type="text"
                    className="h-10"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label className="text-lg mb-1" htmlFor="course">
                    Institute
                  </Label>
                  <Input
                    id="institute"
                    placeholder="e.g.University of Kelaniya"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        institute: e.target.value,
                      });
                    }}
                    value={formData.institute}
                    type="text"
                    className="h-10"
                  />
                </div>
              </>
            )}

            {formData.role === "alumni" && (
              <>
                <div className="flex flex-col space-y-1.5">
                  <Label className="text-lg mb-1" htmlFor="graduationyear">
                    Graduation Year
                  </Label>
                  <Input
                    id="graduationyear"
                    placeholder="Graduation Year"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        graduationYear: e.target.value,
                      });
                    }}
                    value={formData.graduationYear}
                    type="number"
                    className="h-10"
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label className="text-lg mb-1" htmlFor="time">
                    Current Position
                  </Label>

                  <div className="flex flex-row justify-between gap-4">
                    <Input
                      id="jobtitle"
                      type="text"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          currentJobTitle: e.target.value,
                        });
                      }}
                      value={formData.currentJobTitle}
                      className="h-10"
                      placeholder="Job Title"
                    />
                    <Input
                      id="company"
                      type="text"
                      className="h-10"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          currentCompany: e.target.value,
                        });
                      }}
                      value={formData.currentCompany}
                      placeholder="Company"
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label className="text-lg mb-1" htmlFor="location">
                    Location
                  </Label>
                  <Input
                    id="location"
                    className="h-10"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        locationCityCountry: e.target.value,
                      });
                    }}
                    value={formData.locationCityCountry}
                    placeholder="City, Country"
                  />
                </div>
              </>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

//--------------------------------------------------

export function Sociallinks({ formData, setFormData }) {
  const handleIndustriesChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFormData((prev) => ({
      ...prev,
      industriesOfInterest: selectedValues,
    }));
  };
  const handleskillsExpertiseChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFormData((prev) => ({
      ...prev,
      skillsExpertise: selectedValues,
    }));
  };
  const industryOptions = [
    {
      value: "Information Technology (IT) & Software Development",
      label: "Information Technology (IT) & Software Development",
    },
    {
      value: "Healthcare & Life Sciences",
      label: "Healthcare & Life Sciences",
    },
    { value: "Education & Academia", label: "Education & Academia" },
    { value: "Finance & Banking", label: "Finance & Banking" },
    {
      value: "Engineering & Manufacturing",
      label: "Engineering & Manufacturing",
    },
    { value: "Marketing & Advertising", label: "Marketing & Advertising" },
    { value: "Sales & Retail", label: "Sales & Retail" },
    {
      value: "Human Resources (HR) & Recruitment",
      label: "Human Resources (HR) & Recruitment",
    },
    { value: "Legal & Compliance", label: "Legal & Compliance" },
    {
      value: "Consulting & Business Services",
      label: "Consulting & Business Services",
    },
    {
      value: "Government & Public Administration",
      label: "Government & Public Administration",
    },
    { value: "Non-Profit & NGOs", label: "Non-Profit & NGOs" },
    { value: "Media & Communications", label: "Media & Communications" },
    { value: "Design & Creative Arts", label: "Design & Creative Arts" },
    {
      value: "Architecture & Urban Planning",
      label: "Architecture & Urban Planning",
    },
    {
      value: "Agriculture & Environmental Science",
      label: "Agriculture & Environmental Science",
    },
    { value: "Aerospace & Defense", label: "Aerospace & Defense" },
    { value: "Hospitality & Tourism", label: "Hospitality & Tourism" },
    {
      value: "Transportation & Logistics",
      label: "Transportation & Logistics",
    },
    {
      value: "Real Estate & Property Management",
      label: "Real Estate & Property Management",
    },
    { value: "Telecommunications", label: "Telecommunications" },
    { value: "Energy & Utilities", label: "Energy & Utilities" },
    { value: "Sports & Recreation", label: "Sports & Recreation" },
    { value: "Fashion & Apparel", label: "Fashion & Apparel" },
    { value: "Automotive", label: "Automotive" },
    { value: "Pharmaceuticals & Biotech", label: "Pharmaceuticals & Biotech" },
    {
      value: "Construction & Civil Engineering",
      label: "Construction & Civil Engineering",
    },
    { value: "Event Management", label: "Event Management" },
    { value: "E-commerce", label: "E-commerce" },
    { value: "Cybersecurity", label: "Cybersecurity" },
    {
      value: "Research & Development (R&D)",
      label: "Research & Development (R&D)",
    },
    {
      value: "Entertainment & Film Industry",
      label: "Entertainment & Film Industry",
    },
    { value: "Publishing & Journalism", label: "Publishing & Journalism" },
    { value: "Food & Beverage", label: "Food & Beverage" },
    { value: "Blockchain & Web3", label: "Blockchain & Web3" },
    {
      value: "Artificial Intelligence & Data Science",
      label: "Artificial Intelligence & Data Science",
    },
    {
      value: "Customer Support & Service",
      label: "Customer Support & Service",
    },
    { value: "Supply Chain Management", label: "Supply Chain Management" },
    { value: "Gaming & Game Development", label: "Gaming & Game Development" },
    { value: "Insurance", label: "Insurance" },
  ];

  const industryskills = [
    { value: "Programming", label: "Programming" },
    { value: "Web Development", label: "Web Development" },
    { value: "Database Management", label: "Database Management" },
    { value: "Cloud Computing", label: "Cloud Computing" },
    { value: "System Design", label: "System Design" },
    { value: "Patient Care", label: "Patient Care" },
    { value: "Medical Research", label: "Medical Research" },
    { value: "Health Informatics", label: "Health Informatics" },
    { value: "Phlebotomy", label: "Phlebotomy" },
    { value: "Clinical Documentation", label: "Clinical Documentation" },
    { value: "Curriculum Design", label: "Curriculum Design" },
    { value: "Lesson Planning", label: "Lesson Planning" },
    { value: "Online Teaching", label: "Online Teaching" },
    { value: "Assessment", label: "Assessment" },
    { value: "Student Counseling", label: "Student Counseling" },
    { value: "Accounting", label: "Accounting" },
    { value: "Financial Analysis", label: "Financial Analysis" },
    { value: "Investment Management", label: "Investment Management" },
    { value: "Risk Assessment", label: "Risk Assessment" },
    { value: "Taxation", label: "Taxation" },
    { value: "SEO", label: "SEO" },
    { value: "Content Marketing", label: "Content Marketing" },
    { value: "Social Media Management", label: "Social Media Management" },
    { value: "Market Research", label: "Market Research" },
    { value: "Email Marketing", label: "Email Marketing" },
    { value: "Network Security", label: "Network Security" },
    { value: "Threat Analysis", label: "Threat Analysis" },
    { value: "Penetration Testing", label: "Penetration Testing" },
    { value: "Security Audits", label: "Security Audits" },
    { value: "Incident Response", label: "Incident Response" },
    { value: "CAD", label: "CAD" },
    { value: "Mathematical Modeling", label: "Mathematical Modeling" },
    { value: "Structural Analysis", label: "Structural Analysis" },
    { value: "Project Management", label: "Project Management" },
    { value: "Thermodynamics", label: "Thermodynamics" },
    { value: "Recruitment", label: "Recruitment" },
    { value: "Employee Engagement", label: "Employee Engagement" },
    { value: "Conflict Resolution", label: "Conflict Resolution" },
    { value: "Performance Management", label: "Performance Management" },
    { value: "HR Policies", label: "HR Policies" },
    { value: "Shopify", label: "Shopify" },
    { value: "Dropshipping", label: "Dropshipping" },
    { value: "Product Listing", label: "Product Listing" },
    { value: "UX Design", label: "UX Design" },
    { value: "Google Ads", label: "Google Ads" },
    { value: "Machine Learning", label: "Machine Learning" },
    { value: "Deep Learning", label: "Deep Learning" },
    {
      value: "Natural Language Processing",
      label: "Natural Language Processing",
    },
    { value: "Computer Vision", label: "Computer Vision" },
    { value: "Model Training", label: "Model Training" },
  ];

  return (
    <Card className="w-[650px] p-8 border-none shadow-none min-h-[28rem] ">
      <CardHeader>
        <CardTitle className="text-2xl">Career Interests & Expertise</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-3 ">
            <div className="flex flex-col space-y-1.5">
              <Label className="text-lg mb-1" htmlFor="interestIndustries">
                Select Your Industries of Interest (Multiple)
              </Label>
              <MultiSelect
                selectedOptions={formData.industriesOfInterest}
                onChange={handleIndustriesChange}
                options={industryOptions}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="text-lg mb-1" htmlFor="skills">
                Skills & Expertise
              </Label>
              {/* <Input
                id="skills"
                placeholder="Type a skill (e.g., Leadership, Marketing, Data Analysis...)"
                type="text"
                className="h-10"
                onChange={(e) => {
                  const value = e.target.value;
                  const skills = value.split(",").map((skill) => skill.trim());
                  setFormData((prev) => ({
                    ...prev,
                    skillsExpertise: skills,
                  }));
                }}
                value={formData.skillsExpertise}
              /> */}
              <MultiSelect
                selectedOptions={formData.skillsExpertise}
                onChange={handleskillsExpertiseChange}
                options={industryskills}
              />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
