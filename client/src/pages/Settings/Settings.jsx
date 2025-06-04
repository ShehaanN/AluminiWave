import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import MultiSelect from "../Events/MultiSelect";
import { getUserData } from "../../services/dataService";

const Settings = () => {
  const [activeViewTab, setActiveViewTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [formData, setFormData] = useState({
    profile_summary: "",

    skillsExpertise: [],
    industries_of_interest: [],
    fullName: "",
    gender: "",
    dob: null,
    city: "",
    country: "",
    passoutYear: null,
    jobPosition: "",
    company: "",
    course: "",
    institute: "",
    photo: null,
  });

  const [passwordForm, setPasswordForm] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        setLoading(true);
        const userData = await getUserData();

        if (!userData || !userData.profile) {
          throw new Error("Could not load profile data");
        }

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError) throw userError;

        setPasswordForm((prev) => ({
          ...prev,
          email: user.email,
        }));

        setSelectedUser(userData.profile);
        setFormData({
          profile_summary: userData.profile.profile_summary || "",
          skillsExpertise: userData.profile.skills_expertise || [],
          industries_of_interest: userData.profile.industries_of_interest || [],
          fullName: userData.profile.full_name || "",
          gender: userData.profile.gender || "",
          dob: userData.profile.date_of_birth || "",
          city: userData.profile.location_city || "",
          country: userData.profile.location_country || "",
          passoutYear: userData.profile.graduation_year || "",
          jobPosition: userData.profile.current_job_title || "",
          company: userData.profile.current_company || "",
          course: userData.profile.course || "",
          institute: userData.profile.institute || "",
        });
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    };

    const loadData = async () => {
      try {
        const userData = await getUserData();
        if (userData) {
          setUserType(userData.profile.role);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
    loadUserProfile();
  }, []);

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setIsSubmitting(true);

    try {
      if (
        !passwordForm.currentPassword ||
        !passwordForm.newPassword ||
        !passwordForm.confirmPassword
      ) {
        throw new Error("All fields are required");
      }

      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        throw new Error("New passwords don't match");
      }

      if (passwordForm.newPassword.length < 6) {
        throw new Error("New password must be at least 6 characters long");
      }

      // Verify current password by trying to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: passwordForm.email,
        password: passwordForm.currentPassword,
      });

      if (signInError) {
        throw new Error("Current password is incorrect");
      }

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: passwordForm.newPassword,
      });

      if (updateError) throw updateError;

      // Clear form and show success
      setPasswordForm((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));

      alert("Password updated successfully!");
    } catch (error) {
      console.error("Password change error:", error);
      setPasswordError(error.message);
    } finally {
      setIsSubmitting(false);
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

  const handleskillsExpertiseChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFormData((prev) => ({
      ...prev,
      skillsExpertise: selectedValues,
    }));
  };
  const handleIndustriesChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFormData((prev) => ({
      ...prev,
      industriesOfInterest: selectedValues,
    }));
  };

  const industrySelectOptions = allindustries.map((industry) => ({
    value: industry.value,
    label: industry.label,
  }));

  const selectedIndustrySkills = formData.industries_of_interest

    .map((industryValue) => {
      const industry = allindustries.find((ind) => ind.value === industryValue);
      return industry ? industry.skills : [];
    })
    .flat();

  const handleAccountSubmit = async (e) => {
    e.preventDefault();
    try {
      let photoUrl = selectedUser.profile_photo_url || null;

      if (formData.photo instanceof File) {
        const fileExt = formData.photo.name.split(".").pop();
        const fileName = `${selectedUser.id}/${Date.now()}.${fileExt}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("profile-pictures")
          .upload(fileName, formData.photo, {
            cacheControl: "3600",
            upsert: true,
            contentType: formData.photo.type,
          });

        if (uploadError) {
          console.error("Storage error:", uploadError);
          throw new Error(`Failed to upload photo: ${uploadError.message}`);
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("profile-pictures").getPublicUrl(fileName);

        photoUrl = publicUrl;
      }

      const updateData = {
        full_name: formData.fullName,
        gender: formData.gender,
        date_of_birth: formData.dob,
        updated_at: new Date().toISOString(),
      };

      // Only add photo URL if it exists
      if (photoUrl) {
        updateData.profile_photo_url = photoUrl;
      }

      // Add alumni specific fields
      if (selectedUser.role === "alumni") {
        updateData.graduation_year = formData.passoutYear;
        updateData.location_city = formData.city;
        updateData.location_country = formData.country;
      }

      // Update profile data
      const { error: profileError } = await supabase
        .from("profiles")
        .update(updateData)
        .eq("id", selectedUser.id);

      if (profileError) {
        console.error("Profile update error:", profileError);
        throw profileError;
      }

      alert("Account details updated successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error updating account:", error);
      alert(`Failed to update account: ${error.message}`);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          profile_summary: formData.profile_summary,
          skills_expertise: formData.skillsExpertise,
        })
        .eq("id", selectedUser.id);

      if (profileError) throw profileError;

      if (selectedUser.role === "alumni") {
        const { error: timelineError } = await supabase
          .from("profiles")
          .update({
            current_job_title: formData.jobPosition,
            current_company: formData.company,
          })
          .eq("id", selectedUser.id);
        if (timelineError) throw timelineError;
      } else {
        const { error: timelineError } = await supabase
          .from("profiles")
          .update({
            course: formData.course,
            institute: formData.institute,
          })
          .eq("id", selectedUser.id);
        if (timelineError) throw timelineError;
      }

      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile: " + error.message);
    }
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div>
      <div className="min-h-screen flex">
        <main className="flex-1 ml-0 bg-gray-50">
          <div className="p-6 mt-9">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between">
                <h1 className="font-semibold text-3xl mb-8 text-gray-700">
                  Settings
                </h1>

                <Link to="/dashboard">
                  <button className="px-6 py-2 bg-[#7a999e] text-white rounded-lg w-full md:w-auto min-h-[44px]">
                    <i class="fa-solid fa-xmark mr-2"></i>
                    Cancel
                  </button>
                </Link>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-4 min-h-[50vh]">
                {/* Tab Navigation */}
                <div className="border-b border-gray-200">
                  <div className="flex  space-x-4 overflow-x-auto pb-2">
                    <button
                      onClick={() => setActiveViewTab("profile")}
                      className={`px-4 py-2 whitespace-nowrap min-h-[44px] min-w-[44px] flex items-center ${
                        activeViewTab === "profile"
                          ? "text-[#269EB2] border-b-2 border-[#269EB2]"
                          : "text-gray-500"
                      }`}
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => setActiveViewTab("account")}
                      className={`px-4 py-2 whitespace-nowrap min-h-[44px] min-w-[44px] flex items-center ${
                        activeViewTab === "account"
                          ? "text-[#269EB2] border-b-2 border-[#269EB2]"
                          : "text-gray-500"
                      }`}
                    >
                      Account
                    </button>

                    <button
                      onClick={() => setActiveViewTab("changepassword")}
                      className={`px-4 py-2 whitespace-nowrap min-h-[44px] min-w-[44px] flex items-center ${
                        activeViewTab === "changepassword"
                          ? "text-[#269EB2] border-b-2 border-[#269EB2]"
                          : "text-gray-500"
                      }`}
                    >
                      Change Password
                    </button>
                  </div>
                </div>

                {/* Tab Content */}
                <div className=" space-y-6  max-h-[46vh] overflow-y-auto">
                  {activeViewTab === "profile" && (
                    <form onSubmit={handleProfileSubmit}>
                      <div className="grid lg:grid-cols-1 grid-cols-1 gap-4">
                        <div className="border-2 border-dashed w-full border-gray-300 rounded-lg p-4">
                          <div className="flex justify-between flex-wrap gap-4">
                            <div className="flex-1 min-w-[250px]">
                              <label>
                                {selectedUser.role === "alumni"
                                  ? "Professional Summary"
                                  : "Academic Summary"}
                              </label>
                              <textarea
                                name="academicSummary"
                                value={formData.profile_summary}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    profile_summary: e.target.value,
                                  })
                                }
                                className="border p-2 w-full text-sm mt-2 text-gray-600 border-gray-400"
                              />
                            </div>

                            <div className="flex-1 min-w-[250px]">
                              <label>Technical Skills</label>
                              <MultiSelect
                                selectedOptions={formData.skillsExpertise}
                                onChange={handleskillsExpertiseChange}
                                options={selectedIndustrySkills.map(
                                  (skill) => ({
                                    value: skill,
                                    label: skill,
                                  })
                                )}
                              />
                            </div>
                            <div className="flex-1 min-w-[250px]">
                              <label>Industry</label>
                              <MultiSelect
                                selectedOptions={
                                  formData.industries_of_interest
                                }
                                onChange={handleIndustriesChange}
                                options={industrySelectOptions}
                              />
                            </div>

                            <div className="w-full mt-4">
                              {selectedUser.role === "alumni" ? (
                                <h3>Experienced Timeline</h3>
                              ) : (
                                <h3>Academic Timeline</h3>
                              )}

                              <div className="border-2 border-dashed p-4 rounded mb-3 space-y-2 border-gray-300 mt-2">
                                <div className="grid grid-cols-2 gap-4">
                                  {selectedUser.role === "alumni" ? (
                                    <>
                                      <div>
                                        <label>Job position</label>
                                        <input
                                          type="text"
                                          name="jobPosition"
                                          value={formData.jobPosition}
                                          onChange={(e) =>
                                            setFormData({
                                              ...formData,
                                              jobPosition: e.target.value,
                                            })
                                          }
                                          className="border p-2 w-full"
                                        />
                                      </div>
                                      <div>
                                        <label>Company</label>
                                        <input
                                          type="text"
                                          name="company"
                                          value={formData.company}
                                          onChange={(e) =>
                                            setFormData({
                                              ...formData,
                                              company: e.target.value,
                                            })
                                          }
                                          className="border p-2 w-full"
                                        />
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <div>
                                        <label>Course</label>
                                        <input
                                          type="text"
                                          name="course"
                                          value={formData.course}
                                          onChange={(e) =>
                                            setFormData({
                                              ...formData,
                                              course: e.target.value,
                                            })
                                          }
                                          className="border p-2 w-full"
                                        />
                                      </div>
                                      <div>
                                        <label>Institute</label>
                                        <input
                                          type="text"
                                          name="institute"
                                          value={formData.institute}
                                          onChange={(e) =>
                                            setFormData({
                                              ...formData,
                                              institute: e.target.value,
                                            })
                                          }
                                          className="border p-2 w-full"
                                        />
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6">
                            <button
                              type="submit"
                              className="bg-[#269EB2] text-white px-4 py-2 rounded-lg mr-4"
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  )}

                  {activeViewTab === "account" && (
                    <div className="grid lg:grid-cols-1 grid-cols-1 gap-4">
                      <div className="border-2 border-dashed w-full border-gray-300 rounded-lg p-4 cursor">
                        <form onSubmit={handleAccountSubmit}>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="w-full mt-4">
                              <label>Full Name</label>
                              <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    fullName: e.target.value,
                                  })
                                }
                                className="border p-2 w-full text-sm mt-2 text-gray-600 border-gray-400"
                              />
                            </div>

                            <div className="w-full mt-4">
                              <label>Photo</label>
                              <input
                                type="file"
                                name="photo"
                                onChange={(e) => {
                                  const file = e.target.files[0];
                                  if (file && file.type.startsWith("image/")) {
                                    setFormData((prev) => ({
                                      ...prev,
                                      photo: file,
                                    }));
                                  } else {
                                    alert("Please select an image file");
                                  }
                                }}
                                className="border p-2 w-full text-sm mt-2 text-gray-600 border-gray-400"
                                accept="image/*"
                              />
                            </div>

                            <div className="w-full mt-4">
                              <label>Gender</label>
                              <select
                                name="gender"
                                value={formData.gender}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    gender: e.target.value,
                                  })
                                }
                                className="border p-2 w-full text-sm mt-2 text-gray-600 border-gray-400"
                              >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </select>
                            </div>

                            <div className="w-full mt-4">
                              <label>Date of Birth</label>
                              <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    dob: e.target.value,
                                  })
                                }
                                className="border p-2 w-full text-sm mt-2 text-gray-600 border-gray-400"
                              />
                            </div>
                            {selectedUser.role === "alumni" && (
                              <>
                                <div className="w-full mt-4">
                                  <label>Passout Year</label>
                                  <input
                                    type="number"
                                    name="passoutYear"
                                    value={formData.passoutYear}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        passoutYear: e.target.value,
                                      })
                                    }
                                    className="border p-2 w-full text-sm mt-2 text-gray-600 border-gray-400"
                                  />
                                </div>
                                <div className="w-full mt-4">
                                  <label> City</label>
                                  <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        city: e.target.value,
                                      })
                                    }
                                    className="border p-2 w-full text-sm mt-2 text-gray-600 border-gray-400"
                                  />
                                </div>
                                <div className="w-full mt-4">
                                  <label> Country</label>
                                  <input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        country: e.target.value,
                                      })
                                    }
                                    className="border p-2 w-full text-sm mt-2 text-gray-600 border-gray-400"
                                  />
                                </div>
                              </>
                            )}
                          </div>

                          <button
                            type="submit"
                            className="mt-6 bg-[#269EB2] text-white py-2 px-4 rounded-lg"
                          >
                            Save Changes
                          </button>
                        </form>
                      </div>
                    </div>
                  )}

                  {activeViewTab === "changepassword" && (
                    <form onSubmit={handleChangePasswordSubmit}>
                      <div className="border-2 border-dashed w-full border-gray-300 rounded-lg p-4 space-y-2.5">
                        {passwordError && (
                          <div className="text-red-500 text-sm mb-4 p-2 bg-red-50 rounded">
                            {passwordError}
                          </div>
                        )}

                        <div className="flex flex-col space-y-1.5">
                          <Label className="text-md mb-1" htmlFor="email">
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={passwordForm.email}
                            className="h-10 w-1/2"
                            disabled
                          />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                          <Label className="text-md mb-1" htmlFor="currentpass">
                            Current Password
                          </Label>
                          <Input
                            id="currentpass"
                            type="password"
                            value={passwordForm.currentPassword}
                            onChange={(e) =>
                              setPasswordForm((prev) => ({
                                ...prev,
                                currentPassword: e.target.value,
                              }))
                            }
                            className="h-10 w-1/2"
                            placeholder="Enter current password"
                          />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                          <Label className="text-md mb-1" htmlFor="newpass">
                            New Password
                          </Label>
                          <Input
                            id="newpass"
                            type="password"
                            value={passwordForm.newPassword}
                            onChange={(e) =>
                              setPasswordForm((prev) => ({
                                ...prev,
                                newPassword: e.target.value,
                              }))
                            }
                            className="h-10 w-1/2"
                            placeholder="Enter new password"
                          />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                          <Label className="text-md mb-1" htmlFor="confirmpass">
                            Confirm new Password
                          </Label>
                          <Input
                            id="confirmpass"
                            type="password"
                            value={passwordForm.confirmPassword}
                            onChange={(e) =>
                              setPasswordForm((prev) => ({
                                ...prev,
                                confirmPassword: e.target.value,
                              }))
                            }
                            className="h-10 w-1/2"
                            placeholder="Confirm new password"
                          />
                        </div>

                        <div>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`bg-[#269EB2] text-white px-4 py-2 rounded-lg mr-4 mt-6 ${
                              isSubmitting
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                          >
                            {isSubmitting ? "Updating..." : "Reset Password"}
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
