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

  const allindustries = [
    {
      label: "Information Technology",
      value: "Information Technology",
      skills: [
        "Software Development (Backend, Frontend, Full-Stack)",
        "Web Development (HTML, CSS, JavaScript, Frameworks)",
        "Mobile Development (iOS, Android, Cross-Platform)",
        "UI/UX Design & Research",
        "DevOps & SRE (CI/CD, Docker, Kubernetes)",
        "Database Management (SQL, NoSQL, Administration)",
        "Cloud Computing (AWS, Azure, GCP, Cloud Architecture)",
        "Cybersecurity (Ethical Hacking, Forensics, SecOps)",
        "Machine Learning & AI (NLP, Computer Vision)",
        "Data Science & Analytics (Big Data, Data Engineering, Business Intelligence)",
        "IT Support & Helpdesk",
        "Networking (Design, Administration, Security)",
        "System Administration (Linux, Windows)",
        "Version Control (Git, GitHub, GitLab)",
        "Agile & Scrum Methodologies",
        "QA & Software Testing (Manual, Automated)",
        "Technical Writing & Documentation",
        "API Design & Development",
        "Embedded Systems Development",
        "Firmware Engineering",
        "Blockchain Development",
        "IoT Solutions Architecture",
        "Cloud Security",
        "Data Privacy & Compliance",
        "Game Development (Programming)",
      ],
    },
    {
      label: "Healthcare & Life Sciences",
      value: "Healthcare & Life Sciences",
      skills: [
        "Patient Care (Direct, Indirect)",
        "Medical Terminology",
        "Clinical Procedures & Protocols",
        "Medical Coding & Billing",
        "Health Informatics & EHR/EMR Management",
        "Pharmacology & Pharmacy Operations",
        "Surgery Assistance & Surgical Technology",
        "Health Policy & Administration",
        "Medical Equipment Handling & Maintenance",
        "Nursing (RN, LPN, NP, Specialties)",
        "Physiotherapy & Rehabilitation",
        "Telemedicine & Remote Patient Monitoring",
        "Medical Imaging (X-Ray, MRI, CT, Ultrasound)",
        "Laboratory Science & Technology",
        "Public Health & Epidemiology",
        "Mental Health Counseling & Psychiatry",
        "Dental Hygiene & Assisting",
        "Geriatrics & Palliative Care",
        "Pediatrics",
        "Biostatistics",
        "Clinical Trial Management",
        "Regulatory Affairs (Healthcare)",
        "Genetics & Genomics",
        "Medical Research",
        "Occupational Therapy",
        "Speech-Language Pathology",
        "Healthcare Management",
      ],
    },
    {
      label: "Finance & Accounting",
      value: "Finance & Accounting",
      skills: [
        "Financial Analysis & Modeling",
        "Accounting (GAAP, IFRS)",
        "Budgeting & Forecasting",
        "Taxation (Corporate, Personal)",
        "Auditing (Internal, External)",
        "Investment Management & Portfolio Strategy",
        "Financial Planning (Personal, Corporate)",
        "Risk Management (Credit, Market, Operational)",
        "Corporate Finance & M&A",
        "Bookkeeping & Payroll",
        "Advanced Excel & VBA",
        "Financial Reporting & Compliance (SOX, SEC)",
        "FinTech & Financial Software",
        "Quantitative Analysis & Algorithmic Trading",
        "Asset Management",
        "Forensic Accounting",
        "Securities Trading & Brokerage",
        "Wealth Management",
        "Private Equity & Venture Capital",
        "Treasury Management",
        "Actuarial Science",
      ],
    },
    {
      label: "Education & Training",
      value: "Education & Training",
      skills: [
        "Curriculum Design & Development",
        "Lesson Planning & Delivery",
        "Classroom Management & Student Engagement",
        "Instructional Design & E-Learning Development",
        "Student Assessment & Evaluation",
        "Education Technology Integration (LMS, EdTech tools)",
        "Special Education & Inclusive Practices",
        "Academic Advising & Counseling",
        "Tutoring & Mentoring",
        "Educational Leadership & Administration",
        "Online Teaching & Facilitation",
        "Pedagogy & Andragogy",
        "Child Development & Early Childhood Education",
        "Educational Psychology",
        "Corporate Training & Development",
        "Vocational Training",
        "ESL/TESOL Instruction",
        "Research in Education",
        "Grant Writing (Education)",
      ],
    },
    {
      label: "Engineering (Multidisciplinary)",
      value: "Engineering (Multidisciplinary)",
      skills: [
        "Mechanical Design & Engineering (CAD, CAM, FEA)",
        "Electrical Systems Design & Engineering (Circuit Design, Power Systems)",
        "Civil & Structural Engineering (Structural Analysis, Infrastructure)",
        "Chemical Engineering & Process Design",
        "Software Engineering (see IT)",
        "Aerospace Engineering & Aeronautics",
        "Biomedical Engineering & Medical Devices",
        "Environmental Engineering & Sustainability",
        "Industrial Engineering & Operations Management",
        "Materials Science & Engineering",
        "Robotics & Automation Engineering",
        "Project Management (Engineering Projects)",
        "Quality Control & Assurance (Engineering)",
        "Thermodynamics & Fluid Mechanics",
        "Control Systems Engineering",
        "Petroleum Engineering",
        "Nuclear Engineering",
        "Geotechnical Engineering",
        "Systems Engineering",
        "Manufacturing Engineering",
        "Automotive Engineering",
      ],
    },
    {
      label: "Marketing, Advertising & PR",
      value: "Marketing, Advertising & PR",
      skills: [
        "SEO/SEM & PPC Advertising",
        "Content Marketing & Strategy",
        "Email Marketing & Automation",
        "Social Media Management & Marketing",
        "Brand Strategy & Management",
        "Market Research & Analysis",
        "Digital Advertising (Display, Video)",
        "Digital Analytics & Reporting (Google Analytics)",
        "Copywriting & Content Creation",
        "Public Relations & Media Outreach",
        "Marketing Automation Platforms (HubSpot, Marketo)",
        "CRM Software Management",
        "Affiliate Marketing",
        "Video Marketing & Production",
        "Influencer Marketing",
        "Growth Hacking & User Acquisition",
        "Conversion Rate Optimization (CRO)",
        "Product Marketing",
        "Event Marketing",
        "Graphic Design (Marketing Materials)",
      ],
    },
    {
      label: "Human Resources & Talent Acquisition",
      value: "Human Resources & Talent Acquisition",
      skills: [
        "Recruitment & Sourcing",
        "Employee Relations & Engagement",
        "Payroll & Compensation Administration",
        "Training & Development Program Management",
        "Performance Management Systems",
        "HRIS & HR Technology",
        "Conflict Resolution & Mediation",
        "Labor Law & Compliance",
        "Interviewing & Selection",
        "Benefits Administration & Design",
        "Talent Management & Succession Planning",
        "Organizational Development",
        "Workforce Planning & Analytics",
        "Change Management",
        "Employer Branding",
        "Diversity, Equity, & Inclusion (DEI) Initiatives",
      ],
    },
    {
      label: "Legal Services",
      value: "Legal Services",
      skills: [
        "Legal Research & Writing",
        "Contract Drafting & Negotiation",
        "Litigation & Court Procedures",
        "Regulatory Compliance & Corporate Governance",
        "Corporate Law (M&A, Securities)",
        "Case Management & E-Discovery",
        "Paralegal Support",
        "Criminal Law & Procedure",
        "Intellectual Property Law (Patents, Trademarks, Copyrights)",
        "Real Estate Law",
        "Family Law",
        "Environmental Law",
        "Tax Law",
        "International Law",
        "Mediation & Arbitration",
        "Legal Tech Software",
      ],
    },
    {
      label: "Construction & Skilled Trades",
      value: "Construction & Skilled Trades",
      skills: [
        "Blueprint Reading & Interpretation",
        "Masonry & Concrete Work",
        "Carpentry & Woodworking",
        "Construction Project Management",
        "Safety Protocols & OSHA Compliance",
        "Welding & Fabrication",
        "Electrical Installation & Wiring",
        "Plumbing & Pipefitting",
        "Site Supervision & Management",
        "Cost Estimation & Bidding",
        "HVAC Installation & Repair",
        "Heavy Equipment Operation",
        "Surveying",
        "Building Codes & Regulations",
        "Sustainable & Green Building",
        "Painting & Finishing",
        "Roofing",
      ],
    },
    {
      label: "Hospitality, Tourism & Event Management",
      value: "Hospitality, Tourism & Event Management",
      skills: [
        "Customer Service Excellence",
        "Event Planning & Coordination",
        "Hotel & Resort Management",
        "Travel & Tour Coordination",
        "Food & Beverage Service & Management",
        "Reservations & Booking Systems",
        "Cultural Awareness & Sensitivity",
        "Tour Guiding & Interpretation",
        "Multilingual Communication",
        "Hospitality Property Management Systems (PMS)",
        "Revenue Management & Pricing Strategy",
        "Catering Management",
        "Conference & Convention Services",
        "Guest Relations",
        "Cruise Line Operations",
      ],
    },
    {
      label: "Manufacturing & Production",
      value: "Manufacturing & Production",
      skills: [
        "Production Planning & Scheduling",
        "CNC Machining & Programming",
        "Assembly Line Operations & Management",
        "Quality Assurance & Control (QA/QC)",
        "Lean Manufacturing & Six Sigma",
        "Welding & Metal Fabrication",
        "Machine Operation & Maintenance",
        "Supply Chain & Logistics (Manufacturing)",
        "Technical Drawing & CAD/CAM",
        "Robotics & Automation in Manufacturing",
        "Process Improvement & Optimization",
        "Inventory Control & Management",
        "PLC Programming & Industrial Controls",
        "Industrial Maintenance & Repair",
        "Safety Management (Manufacturing)",
      ],
    },
    {
      label: "Retail & E-commerce",
      value: "Retail & E-commerce",
      skills: [
        "Sales & Customer Engagement",
        "Point of Sale (POS) Systems",
        "Merchandising & Visual Display",
        "Inventory Management & Stock Control",
        "E-commerce Platform Management (Shopify, Magento, etc.)",
        "Product Knowledge & Demonstration",
        "Cash Handling & Reconciliation",
        "Store Management & Operations",
        "Loss Prevention & Security",
        "Retail Analytics & Sales Reporting",
        "Supply Chain & Logistics (Retail)",
        "Customer Relationship Management (CRM - Retail)",
        "Omnichannel Retail Strategy",
        "Digital Marketing for E-commerce",
      ],
    },
    {
      label: "Arts, Design & Creative Industries",
      value: "Arts, Design & Creative Industries",
      skills: [
        "Graphic Design & Visual Communication",
        "Illustration & Digital Art",
        "Creative Direction & Art Direction",
        "Art History & Theory",
        "Photography & Photo Editing",
        "Animation (2D, 3D, Motion Graphics)",
        "3D Modeling & Rendering",
        "Typography & Layout Design",
        "Video Editing & Post-Production",
        "Design Software (Adobe Creative Suite, etc.)",
        "User Interface (UI) Design",
        "User Experience (UX) Design",
        "Industrial & Product Design",
        "Fashion Design & Merchandising",
        "Interior Design & Space Planning",
        "Web Design",
        "Sound Design & Audio Engineering",
        "Game Art & Design",
        "Fine Arts (Painting, Sculpture, etc.)",
      ],
    },
    {
      label: "Transportation, Logistics & Supply Chain",
      value: "Transportation, Logistics & Supply Chain",
      skills: [
        "Fleet Management & Maintenance",
        "Logistics Planning & Coordination",
        "Supply Chain Management & Optimization",
        "Route Planning & Optimization",
        "Warehouse Operations & Management (WMS)",
        "Customs & International Trade Compliance",
        "Inventory Management & Control",
        "Freight Forwarding & Brokerage",
        "Dispatch & Scheduling",
        "Safety & Regulatory Compliance (DOT, IATA)",
        "Transportation Management Systems (TMS)",
        "Last-Mile Delivery Solutions",
        "Procurement & Sourcing",
        "Demand Forecasting & Planning",
        "Cold Chain Logistics",
        "Maritime & Air Cargo Operations",
      ],
    },
    {
      label: "Agriculture, Food Production & Environmental Science",
      value: "Agriculture, Food Production & Environmental Science",
      skills: [
        "Crop Management & Agronomy",
        "Soil Science & Conservation",
        "Irrigation Systems & Water Management",
        "Agrochemicals Handling & Pest Management",
        "Environmental Policy & Regulation",
        "Conservation Planning & Land Management",
        "Animal Husbandry & Livestock Management",
        "Sustainable Farming & Organic Practices",
        "Food Science & Technology",
        "Food Safety & HACCP",
        "Aquaculture & Fisheries Management",
        "Forestry & Arboriculture",
        "Environmental Monitoring & Impact Assessment",
        "Renewable Energy in Agriculture",
        "GIS & Remote Sensing (Agri/Env)",
        "Horticulture & Viticulture",
      ],
    },
    {
      label: "Media, Communication & Publishing",
      value: "Media, Communication & Publishing",
      skills: [
        "Journalism (Investigative, Broadcast, Print, Digital)",
        "Public Speaking & Presentation",
        "Social Media Strategy & Community Management",
        "Podcasting & Audio Production",
        "Media Production (Video, Audio)",
        "Broadcasting (Radio, TV)",
        "Copywriting & Editing (for various media)",
        "Storytelling & Narrative Development",
        "Scriptwriting (Film, TV, Web)",
        "Content Strategy & Management (CMS)",
        "Digital Media Management",
        "Photojournalism",
        "Technical Communication",
        "Corporate Communications & Public Affairs",
        "Publishing Operations (Editing, Typesetting, Rights)",
      ],
    },
    {
      label: "Real Estate & Property Management",
      value: "Real Estate & Property Management",
      skills: [
        "Property Management & Tenant Relations",
        "Real Estate Law & Regulations",
        "Sales & Leasing (Residential, Commercial)",
        "Market Analysis & Valuation",
        "Contract Negotiation & Closing",
        "Real Estate Appraisal",
        "Client Relationship Management (Real Estate)",
        "Real Estate Software (MLS, CRM)",
        "Site Evaluation & Development",
        "Real Estate Investment Strategies",
        "Mortgage Brokering & Lending",
        "Home Inspection",
        "Urban Planning & Zoning",
      ],
    },
    {
      label: "Scientific Research & Development",
      value: "Scientific Research & Development",
      skills: [
        "Data Analysis & Statistical Modeling (R, Python, SPSS)",
        "Experimental Design & Methodology",
        "Scientific Writing & Publication",
        "Laboratory Techniques & Management (e.g., PCR, Microscopy, Spectroscopy)",
        "Literature Review & Synthesis",
        "Hypothesis Testing & Validation",
        "Research Project Management",
        "Peer Review Process",
        "Fieldwork & Data Collection",
        "Grant Writing & Funding Acquisition",
        "Bioinformatics & Computational Biology",
        "Materials Science Research",
        "Physics, Chemistry, Biology (Specialized sub-fields)",
        "Clinical Research Design & Execution",
        "Ethical Conduct in Research",
      ],
    },
    {
      label: "Government & Public Administration",
      value: "Government & Public Administration",
      skills: [
        "Public Policy Analysis & Development",
        "Governance & Public Sector Management",
        "Legislative Process & Bill Drafting",
        "Public Speaking & Community Engagement",
        "Budgeting & Public Finance",
        "Regulatory Compliance & Enforcement",
        "Grant Management & Administration",
        "Urban & Regional Planning",
        "International Relations & Diplomacy",
        "Emergency Management & Disaster Response",
        "Intelligence Analysis",
        "Social Program Management",
        "Election Administration",
      ],
    },
    {
      label: "Consulting (Management, IT, Specialized)",
      value: "Consulting (Management, IT, Specialized)",
      skills: [
        "Business Analysis & Process Improvement",
        "Strategy Development & Implementation",
        "Project & Program Management",
        "Client Relationship & Stakeholder Management",
        "Change Management & Organizational Transformation",
        "Data Analysis & Interpretation for Business",
        "Presentation & Workshop Facilitation",
        "Problem Solving & Critical Thinking",
        "Industry-Specific Expertise (e.g., Financial, Healthcare, Tech)",
        "Market Entry Strategy",
        "Management Consulting Frameworks",
        "IT Consulting (Systems, Infrastructure, Software)",
        "Financial Advisory",
      ],
    },
    {
      label: "Non-Profit & Social Services",
      value: "Non-Profit & Social Services",
      skills: [
        "Fundraising & Donor Relations",
        "Grant Writing & Management",
        "Volunteer Coordination & Management",
        "Community Outreach & Engagement",
        "Program Development & Evaluation",
        "Advocacy & Policy Influence",
        "Social Work & Case Management",
        "Non-profit Financial Management & Accounting",
        "Impact Assessment & Reporting",
        "Counseling & Support Services",
        "Crisis Intervention",
        "Public Speaking (for advocacy)",
        "Non-profit Leadership & Governance",
      ],
    },
    {
      label: "Energy (Oil, Gas, Renewables, Utilities)",
      value: "Energy (Oil, Gas, Renewables, Utilities)",
      skills: [
        "Energy Policy & Regulation",
        "Renewable Energy Technologies (Solar, Wind, Hydro, Geothermal)",
        "Grid Management & Smart Grid Technology",
        "Petroleum Engineering & Geoscience",
        "Drilling & Well Operations",
        "Power Plant Operations & Maintenance",
        "Environmental Impact Assessment (Energy Sector)",
        "Resource Exploration & Extraction",
        "Energy Trading & Markets",
        "Safety Engineering & Compliance (Energy)",
        "Energy Storage Solutions",
        "Utility Operations & Management",
        "Nuclear Energy & Safety",
        "Pipeline Engineering & Management",
      ],
    },
    {
      label: "Automotive & Aerospace Manufacturing/Maintenance",
      value: "Automotive & Aerospace Manufacturing/Maintenance",
      skills: [
        "Automotive Design & Engineering",
        "Aerospace Design & Engineering",
        "Vehicle Diagnostics & Repair",
        "Aircraft Maintenance, Repair & Overhaul (MRO)",
        "Assembly Line Operations (Automotive/Aerospace)",
        "Quality Control & Assurance (Automotive/Aerospace)",
        "Electric Vehicle (EV) Technology",
        "Autonomous Driving Systems",
        "Avionics Systems",
        "Sales & After-Sales Service (Automotive)",
        "Supply Chain Management (Automotive/Aerospace)",
        "Engine Mechanics & Rebuilding",
        "Auto Body Repair & Painting",
        "Flight Systems & Controls",
        "Motorsport Engineering",
      ],
    },
    {
      label: "Security & Protective Services",
      value: "Security & Protective Services",
      skills: [
        "Law Enforcement & Criminal Justice",
        "Private Security & Guarding",
        "Physical Security Systems (CCTV, Access Control)",
        "Surveillance & Investigation Techniques",
        "Emergency Dispatch & Response",
        "Firefighting & Rescue Operations",
        "Corrections & Offender Management",
        "Cybersecurity Operations (see IT)",
        "Loss Prevention & Asset Protection",
        "Executive Protection & Close Protection",
        "Risk Assessment & Security Management",
        "Crisis Management & De-escalation",
      ],
    },
    {
      label: "Gaming & Interactive Entertainment",
      value: "Gaming & Interactive Entertainment",
      skills: [
        "Game Design (Mechanics, Narrative, Level)",
        "Game Development & Programming (Unity, Unreal)",
        "2D/3D Art & Animation for Games",
        "Sound Design & Music Composition (Games)",
        "QA Testing & Debugging (Games)",
        "UX/UI Design for Games",
        "Game Production & Project Management",
        "Monetization Strategies",
        "Virtual Reality (VR) & Augmented Reality (AR) Development",
        "Community Management (Gaming)",
        "Esports Management & Operations",
      ],
    },
    {
      label: "Personal Care, Wellness & Fitness",
      value: "Personal Care, Wellness & Fitness",
      skills: [
        "Cosmetology (Hair, Skin, Nails)",
        "Barbering",
        "Esthetics & Skincare",
        "Massage Therapy",
        "Personal Training & Fitness Instruction",
        "Nutrition & Dietetics Counseling",
        "Yoga & Pilates Instruction",
        "Holistic Health Practices",
        "Spa Management & Operations",
        "Makeup Artistry",
        "Life Coaching",
        "Acupuncture & Traditional Medicine",
      ],
    },
    {
      label: "Insurance Services",
      value: "Insurance Services",
      skills: [
        "Underwriting (Life, Health, P&C)",
        "Claims Adjusting & Processing",
        "Actuarial Analysis (Insurance)",
        "Risk Assessment & Management (Insurance)",
        "Insurance Sales & Brokerage",
        "Policy Administration & Customer Service",
        "Insurance Law & Compliance",
        "Reinsurance",
        "Loss Control & Prevention",
        "Insurance Fraud Investigation",
        "Insurtech & Digital Transformation",
      ],
    },
  ];

  const industrySelectOptions = allindustries.map((industry) => ({
    value: industry.value,
    label: industry.label,
  }));

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
                                        options={industrySelectOptions}
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
