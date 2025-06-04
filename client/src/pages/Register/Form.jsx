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
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox
                id="terms"
                className="border-2 border-gray-400"
                checked={formData.acceptTerms} // Bind to formData
                onCheckedChange={(checked) => {
                  // Use onCheckedChange for ShadCN Checkbox
                  setFormData({
                    ...formData,
                    acceptTerms: checked,
                  });
                }}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
              >
                Accept terms and conditions
              </label>
            </div>
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
            {/* <div className="flex flex-col space-y-1.5">
              <Label className="text-lg mb-1" htmlFor="picture">
                Upload a profile photo
              </Label>
              {}

              <Input
                id="picture"
                className="h-10 border-gray-500"
                type="file"
                accept="image/*" // Good practice to specify accepted file types
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    profilePhotoFile: e.target.files[0], // Store the File object
                  });
                }}
              />
            </div> */}
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

  // Get selected industries' skills
  const selectedIndustrySkills = formData.industriesOfInterest
    .map((industryValue) => {
      const industry = allindustries.find((ind) => ind.value === industryValue);
      return industry ? industry.skills : [];
    })
    .flat();

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
                options={industrySelectOptions}
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
                options={selectedIndustrySkills.map((skill) => ({
                  value: skill,
                  label: skill,
                }))}
              />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
