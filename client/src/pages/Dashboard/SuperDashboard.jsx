import { useEffect, useState } from "react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/logo.png";
import dp from "@/assets/mdp.jpg";
import { Textarea } from "@/components/ui/textarea";
import sara from "@/assets/sara.png";
import { supabase } from "../../supabaseClient";
import { fetchUserProfileDetails } from "../../services/dataService";

import MultiSelect from "../Events/MultiSelect";

const SuperDashboard = () => {
  const [activeTab, setActiveTab] = useState("user-management");

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteEventDialog, setDeleteEventDialog] = useState(false);
  const [deleteJobDialog, setDeleteJobDialog] = useState(false);
  const [viewProfileDialog, setViewProfileDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editJobDialog, setEditJobDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isJobFormChanged, setIsJobFormChanged] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  console.log(selectedUser);

  const [stats, setStats] = useState({
    totalUsers: 0,
    activeStudents: 0,
    activeAlumni: 0,
    totalEvents: 0,
    upcomingEvents: 0,
    activeJobs: 0,
  });

  const [users, setUsers] = useState([]);

  const [filteredUsers, setFilteredUsers] = useState([]);

  console.log("filterd user", filteredUsers);
  console.log("users", users);

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all-roles");

  // Fetch dashboard stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get users count
        const { data: usersCount } = await supabase
          .from("profiles")
          .select("role", { count: "exact" });

        const { data: eventsData } = await supabase
          .from("events")
          .select("status", { count: "exact" });

        const { data: jobsData } = await supabase
          .from("jobs")
          .select("*", { count: "exact" })
          .eq("is_active", true);

        setStats({
          totalUsers: usersCount?.length || 0,
          activeStudents:
            usersCount?.filter((u) => u.role === "student").length || 0,
          activeAlumni:
            usersCount?.filter((u) => u.role === "alumni").length || 0,
          totalEvents: eventsData?.length || 0,
          upcomingEvents:
            eventsData?.filter((e) => e.status === "upcoming").length || 0,
          activeJobs: jobsData?.length || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select(
            `
            id,
            full_name,
            email,
            role,
            created_at,
            profile_photo_url
          `
          )
          .order("created_at", { ascending: false });

        if (error) throw error;

        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search and role
  useEffect(() => {
    let filtered = users;

    if (searchQuery) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (roleFilter !== "all-roles") {
      filtered = filtered.filter(
        (user) => user.role.toLowerCase() === roleFilter.toLowerCase()
      );
    }

    setFilteredUsers(filtered);
  }, [searchQuery, roleFilter, users]);

  // Pagination calculations
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedUsers = filteredUsers.slice(startIndex, endIndex);
  const totalResults = filteredUsers.length;
  const startItem = totalResults === 0 ? 0 : startIndex + 1;
  const endItem = Math.min(endIndex, totalResults);

  const [eventStats, setEventStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    completedEvents: 0,
    cancelledEvents: 0,
  });

  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [eventSearchQuery, setEventSearchQuery] = useState("");
  const [eventStatusFilter, setEventStatusFilter] = useState("all-status");

  console.log(filteredEvents);

  //  fetching event stats
  useEffect(() => {
    const fetchEventStats = async () => {
      try {
        const { data: eventData, error } = await supabase
          .from("events")
          .select(
            "id, status,location,time_slot_start,title,banner_image_url, event_date"
          );

        if (error) throw error;

        const currentDate = new Date();

        setEventStats({
          totalEvents: eventData.length,
          upcomingEvents: eventData.filter(
            (event) =>
              new Date(event.event_date) > currentDate &&
              event.status === "upcoming"
          ).length,
          completedEvents: eventData.filter(
            (event) => event.status === "completed"
          ).length,
          cancelledEvents: eventData.filter(
            (event) => event.status === "cancelled"
          ).length,
        });

        setEvents(eventData);
        setFilteredEvents(eventData);
      } catch (error) {
        console.error("Error fetching event stats:", error);
      }
    };

    fetchEventStats();
  }, []);

  //  filtering events
  useEffect(() => {
    let filtered = events;

    if (eventSearchQuery) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(eventSearchQuery.toLowerCase()) ||
          event.location.toLowerCase().includes(eventSearchQuery.toLowerCase())
      );
    }

    if (eventStatusFilter !== "all-status") {
      filtered = filtered.filter(
        (event) =>
          event.status.toLowerCase() === eventStatusFilter.toLowerCase()
      );
    }

    setFilteredEvents(filtered);
  }, [eventSearchQuery, eventStatusFilter, events]);

  const [jobStats, setJobStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    applicationsReceived: 0,
    jobsFilledRate: 0,
  });

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [jobSearchQuery, setJobSearchQuery] = useState("");
  const [jobStatusFilter, setJobStatusFilter] = useState("all");

  console.log("filteredJobs", filteredJobs);

  //  fetching job stats
  useEffect(() => {
    const fetchJobStats = async () => {
      try {
        const { data: jobsData, error } = await supabase.from("jobs").select(`
          *,
          job_applications (
            id,
            status
          )
        `);

        if (error) throw error;

        const stats = {
          totalJobs: jobsData.length,
          activeJobs: jobsData.filter((job) => job.is_active).length,
          applicationsReceived: jobsData.reduce(
            (total, job) => total + (job.job_applications?.length || 0),
            0
          ),
          jobsFilledRate: (
            (jobsData.filter((job) => !job.is_active).length /
              jobsData.length) *
            100
          ).toFixed(1),
        };

        setJobStats(stats);
        setJobs(jobsData);
        setFilteredJobs(jobsData);
      } catch (error) {
        console.error("Error fetching job stats:", error);
      }
    };

    fetchJobStats();
  }, []);

  //  filtering jobs
  useEffect(() => {
    let filtered = jobs;

    if (jobSearchQuery) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(jobSearchQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(jobSearchQuery.toLowerCase())
      );
    }

    if (jobStatusFilter !== "all") {
      filtered = filtered.filter((job) =>
        jobStatusFilter === "active" ? job.is_active : !job.is_active
      );
    }

    setFilteredJobs(filtered);
  }, [jobSearchQuery, jobStatusFilter, jobs]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const handleJobFormChange = (e) => {
    e.setIsJobFormChanged(true);
  };
  const handleEditJob = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    console.log("Updating job:", Object.fromEntries(formData));
    setEditJobDialog(false);
    setIsJobFormChanged(false);
  };

  const [addUserDialog, setAddUserDialog] = useState(false);
  const [addEventDialog, setAddEventDialog] = useState(false);
  const [addJobDialog, setAddJobDialog] = useState(false);

  const [editEventDialog, setEditEventDialog] = useState(false);
  const [isEventFormChanged, setIsEventFormChanged] = useState(false);

  const handleEventFormChange = (e) => {
    e.setIsEventFormChanged(true);
  };
  const handleEditEvent = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    console.log("Updating event:", Object.fromEntries(formData));
    setEditEventDialog(false);
    setIsEventFormChanged(false);
  };

  const [activeViewTab, setActiveViewTab] = useState("profile");

  // Handle user creation
  const handleAddUser = async (formData) => {
    try {
      // First create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.get("email"),
        password: formData.get("password"),
        options: {
          data: {
            role: formData.get("role"),
          },
        },
      });

      if (authError) throw authError;

      // Then create profile
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: authData.user.id,
          full_name: formData.get("name"),
          email: formData.get("email"),
          role: formData.get("role").toLowerCase(),
          profile_photo_url: null,
        },
      ]);

      if (profileError) throw profileError;

      // Refresh users list
      const fetchUsers = async () => {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setUsers(data);
      };

      await fetchUsers();
      setAddUserDialog(false);
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user");
    }
  };

  // Handle user deletion
  const handleDeleteUser = async (user) => {
    setSelectedUser(user);
    setDeleteDialog(true);
  };

  const handleDeleteEvent = (event) => {
    setSelectedEvent(event);
    setDeleteEventDialog(true);
  };
  const handleDeleteJob = (job) => {
    setSelectedJob(job);
    setDeleteJobDialog(true);
  };

  const confirmDeleteUser = () => {
    console.log(`Deleted user: ${selectedUser.name}`);
    setDeleteDialog(false);
  };

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

  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({
    profile_summary: "",

    skillsExpertise: [],
    fullName: "",
    gender: "",
    dob: "",
    city: "",
    country: "",
    passoutYear: "",
    jobPosition: "",
    company: "",
    course: "",
    institute: "",
    photo: null,
  });

  console.log("profileData", profileData);
  console.log("formData", formData);

  // fetch profile data when user is selected
  useEffect(() => {
    const fetchProfileData = async () => {
      if (selectedUser?.id) {
        const data = await fetchUserProfileDetails(selectedUser.id);
        if (data) {
          setProfileData(data);

          setFormData({
            profile_summary: data.profile_summary || "",
            skillsExpertise: data.skills_expertise || [],
            fullName: data.full_name || "",
            gender: data.gender || "",
            dob: data.date_of_birth || "",
            city: data.location_city || "",
            country: data.location_country || "",
            passoutYear: data.graduation_year || "",
            jobPosition: data.current_job_title || "",
            company: data.current_company || "",
            course: data.course || "",
            institute: data.institute || "",
          });
        }
      }
    };
    fetchProfileData();
  }, [selectedUser?.id]);

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

      // Handle timeline updates
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

  const handleAccountSubmit = async (e) => {
    e.preventDefault();
    try {
      let photoUrl = formData.photo;

      if (formData.photo instanceof File) {
        const fileExt = formData.photo.name.split(".").pop();
        const fileName = `${selectedUser.id}/${Date.now()}.${fileExt}`;

        // Upload with proper metadata
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("profile-pictures")
          .upload(fileName, formData.photo, {
            cacheControl: "3600",
            upsert: true,
            contentType: formData.photo.type,
            duplex: "half",
          });

        if (uploadError) {
          console.error("Storage error:", uploadError);
          throw new Error(`Failed to upload photo: ${uploadError.message}`);
        }

        // Get the public URL after successful upload
        const {
          data: { publicUrl },
        } = supabase.storage.from("profile-pictures").getPublicUrl(fileName);

        photoUrl = publicUrl;
      }

      // Update profile data
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name: formData.fullName,
          gender: formData.gender,
          date_of_birth: formData.dob,
          location_city: formData.city,
          location_country: formData.country,
          graduation_year: formData.passoutYear,
          profile_photo_url: photoUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", selectedUser.id);

      if (profileError) {
        console.error("Profile update error:", profileError);
        throw profileError;
      }

      // Refresh data
      const updatedData = await fetchUserProfileDetails(selectedUser.id);
      if (updatedData) {
        setProfileData(updatedData);
        setFormData((prev) => ({
          ...prev,
          photo: null,
        }));
      }

      alert("Account details updated successfully");
    } catch (error) {
      console.error("Error updating account:", error);
      alert(`Failed to update account: ${error.message}`);
    }
  };

  const handleskillsExpertiseChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFormData((prev) => ({
      ...prev,
      skillsExpertise: selectedValues,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src={logo} alt="AlumniWave Logo" className="h-20 w-auto" />
          </div>
          <div className="flex items-center">
            <span className="mr-4 text-md text-gray-600">Welcome, Admin</span>

            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer size-10">
                    <AvatarImage src={dp} alt="Admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link to="/supersettings">
                    <DropdownMenuItem>Update Profile</DropdownMenuItem>
                  </Link>
                  <Link to="/">
                    <DropdownMenuItem>Log out</DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className=" text-2xl font-semibold text-gray-900 py-8 mb-6">
          SuperAdmin Dashboard
        </h1>
        <Tabs
          defaultValue="user-management"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger
              value="user-management"
              className="!rounded-button whitespace-nowrap"
            >
              <i className="fas fa-users mr-2"></i> User Management
            </TabsTrigger>
            <TabsTrigger
              value="event-oversight"
              className="!rounded-button whitespace-nowrap"
            >
              <i className="fas fa-calendar-alt mr-2"></i> Event Oversight
            </TabsTrigger>
            <TabsTrigger
              value="job-oversight"
              className="!rounded-button whitespace-nowrap"
            >
              <i className="fas fa-briefcase mr-2"></i> Job Oversight
            </TabsTrigger>
          </TabsList>
          {/* User Management Tab */}
          <TabsContent value="user-management" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                User Management
              </h2>
            </div>
            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Total Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.totalUsers}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Active Students
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {stats.activeStudents}{" "}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Active Alumni
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {stats.activeAlumni}{" "}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* User List Controls */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4 w-2/3">
                <div className="relative w-full max-w-md">
                  <Input
                    type="text"
                    placeholder="Search users..."
                    className="pl-10 border-gray-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <i className="fas fa-search text-gray-400"></i>
                  </div>
                </div>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-[180px] !rounded-button">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-roles">All Roles</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="alumni">Alumni</SelectItem>
                    <SelectItem value="superadmin">Superadmin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="!rounded-button bg-[#415B68] text-white whitespace-nowrap"
                onClick={() => setAddUserDialog(true)}
              >
                <i className="fas fa-plus mr-2"></i> Add User
              </Button>
            </div>
            {/* User Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[60px]">Avatar</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined Date</TableHead>

                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.slice(startIndex, endIndex).map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <Avatar>
                            <AvatarImage
                              src={user.profile_photo_url || dp}
                              alt={user.name}
                            />
                            <AvatarFallback>{user.full_name}</AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell className="font-medium">
                          {user.full_name}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.role === "superadmin"
                                ? "destructive"
                                : user.role === "alumni"
                                ? "outline"
                                : "default"
                            }
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.created_at}</TableCell>

                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="!rounded-button whitespace-nowrap cursor-pointer text-blue-600 border-blue-600 hover:bg-blue-50"
                              onClick={() => {
                                setSelectedUser({
                                  name: user.full_name,
                                  id: user.id,
                                  email: user.email,
                                  role: user.role,
                                  profile_photo_url: user.profile_photo_url,
                                });
                                setViewProfileDialog(true);
                              }}
                            >
                              <i className="fas fa-eye"></i>
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              className="!rounded-button whitespace-nowrap cursor-pointer text-red-600 border-red-600 hover:bg-red-50"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <i className="fas fa-trash-alt"></i>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            {/* Pagination */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing {startItem} to {endItem} of {filteredUsers.length}{" "}
                results
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className="!rounded-button whitespace-nowrap cursor-pointer"
                >
                  <i className="fas fa-chevron-left mr-2"></i> Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={endIndex >= filteredUsers.length}
                  className="!rounded-button whitespace-nowrap cursor-pointer"
                >
                  Next <i className="fas fa-chevron-right ml-2"></i>
                </Button>
              </div>
            </div>
          </TabsContent>
          {/* Event Oversight Tab */}
          <TabsContent value="event-oversight" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Event Oversight
              </h2>
            </div>
            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Total Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {eventStats.totalEvents}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {eventStats.upcomingEvents}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Event List Controls */}

            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4 w-2/3">
                <div className="relative w-full max-w-md">
                  <Input
                    type="text"
                    placeholder="Search events..."
                    className="pl-10 border-gray-300"
                    value={eventSearchQuery}
                    onChange={(e) => setEventSearchQuery(e.target.value)}
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <i className="fas fa-search text-gray-400"></i>
                  </div>
                </div>
                <Select
                  value={eventStatusFilter}
                  onValueChange={setEventStatusFilter}
                >
                  <SelectTrigger className="w-[180px] !rounded-button">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-status">All Status</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                className="!rounded-button whitespace-nowrap bg-[#415B68] text-white"
                onClick={() => setAddEventDialog(true)}
              >
                <i className="fas fa-plus mr-2"></i> Add Event
              </Button>
            </div>
            {/* Event Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Banner</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Organizer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEvents.slice(startIndex, endIndex).map((event) => (
                      <TableRow key={event.id}>
                        <TableCell>
                          <img
                            src={event.banner_image_url || dp}
                            alt="Event Banner"
                            width={80}
                            height={160}
                            className="w-20 h-auto aspect-auto brightness-90 transition-transform duration-300 hover:brightness-105 hover:scale-105 hover:shadow-lg"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {event.title}
                        </TableCell>
                        <TableCell>{event.event_date}</TableCell>
                        <TableCell>{event.time_slot_start}</TableCell>
                        <TableCell>{event.location}</TableCell>
                        <TableCell>Organizer</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              event.status === "upcoming"
                                ? "default"
                                : event.status === "completed"
                                ? "outline"
                                : "secondary"
                            }
                            className={
                              event.status === "upcoming"
                                ? "bg-blue-100 text-blue-800"
                                : event.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {event.status.charAt(0).toUpperCase() +
                              event.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="!rounded-button whitespace-nowrap cursor-pointer text-amber-600 border-amber-600 hover:bg-amber-50"
                              onClick={() => {
                                setSelectedEvent(event);
                                setEditEventDialog(true);
                              }}
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteEvent(event)}
                              className="!rounded-button whitespace-nowrap cursor-pointer text-red-600 border-red-600 hover:bg-red-50"
                            >
                              <i className="fas fa-trash-alt"></i>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            {/* Pagination */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">{startItem}</span> to{" "}
                <span className="font-medium">{endItem}</span> of{" "}
                <span className="font-medium">{filteredEvents.length}</span>{" "}
                results
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  className="!rounded-button whitespace-nowrap cursor-pointer"
                >
                  <i className="fas fa-chevron-left mr-2"></i> Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={endIndex >= filteredEvents.length}
                  className="!rounded-button whitespace-nowrap cursor-pointer"
                >
                  Next <i className="fas fa-chevron-right ml-2"></i>
                </Button>
              </div>
            </div>
          </TabsContent>
          {/* Job Oversight Tab */}
          <TabsContent value="job-oversight" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Job Oversight
              </h2>
            </div>
            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Active Job Listings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{jobStats.totalJobs}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Active Jobs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {jobStats.activeJobs}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Applications Received
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {jobStats.applicationsReceived}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Job List Controls */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4 w-2/3">
                <div className="relative w-full max-w-md">
                  <Input
                    type="text"
                    placeholder="Search jobs..."
                    className="pl-10 border-gray-300"
                    value={jobSearchQuery}
                    onChange={(e) => setJobSearchQuery(e.target.value)}
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <i className="fas fa-search text-gray-400"></i>
                  </div>
                </div>
                <Select
                  value={jobStatusFilter}
                  onValueChange={setJobStatusFilter}
                >
                  <SelectTrigger className="w-[180px] !rounded-button">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Jobs</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="filled">Filled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                className="!rounded-button whitespace-nowrap bg-[#415B68] text-white"
                onClick={() => setAddJobDialog(true)}
              >
                <i className="fas fa-plus mr-2"></i> Add Job
              </Button>
            </div>
            {/* Job Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Posted Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Applications</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredJobs.slice(startIndex, endIndex).map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">
                          {job.job_title}
                        </TableCell>
                        <TableCell>{job.company_name}</TableCell>
                        <TableCell>{job.location}</TableCell>
                        <TableCell>
                          {new Date(job.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={job.is_active ? "default" : "secondary"}
                            className={
                              job.is_active
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {job.is_active ? "Active" : "Filled"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {job.job_applications?.length || 0}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="!rounded-button whitespace-nowrap cursor-pointer text-amber-600 border-amber-600 hover:bg-amber-50"
                              onClick={() => {
                                setSelectedJob(job);
                                setEditJobDialog(true);
                              }}
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteJob(job)}
                              className="!rounded-button whitespace-nowrap cursor-pointer text-red-600 border-red-600 hover:bg-red-50"
                            >
                              <i className="fas fa-trash-alt"></i>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            {/* Pagination */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">{startItem}</span> to{" "}
                <span className="font-medium">{endItem}</span> of{" "}
                <span className="font-medium">{filteredJobs.length}</span>{" "}
                results
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className="!rounded-button whitespace-nowrap cursor-pointer"
                >
                  <i className="fas fa-chevron-left mr-2"></i> Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={endIndex >= filteredJobs.length}
                  className="!rounded-button whitespace-nowrap cursor-pointer"
                >
                  Next <i className="fas fa-chevron-right ml-2"></i>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* View Profile Dialog */}
      <Dialog open={viewProfileDialog} onOpenChange={setViewProfileDialog}>
        <DialogContent className="min-w-5xl   top-[93%] left-[76%]">
          <DialogHeader className="mb-2">
            <DialogTitle>User Profile</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-start space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={selectedUser.profile_photo_url || dp}
                    alt={selectedUser.name || "User"}
                  />
                  <AvatarFallback>
                    {selectedUser.name ? selectedUser.name.charAt(0) : "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="text-2xl font-semibold">
                    {selectedUser.name || "Unknown User"}
                  </h3>
                  <p className="text-gray-500">{selectedUser.email}</p>
                  <Badge
                    variant={
                      selectedUser.role === "superadmin"
                        ? "destructive"
                        : selectedUser.role === "alumni"
                        ? "outline"
                        : "default"
                    }
                  >
                    {selectedUser.role || "USER"}
                  </Badge>
                </div>
              </div>
              {/* -------------------------------------------------------------- */}
              <div className="min-h-[55vh]">
                <main>
                  <div>
                    <div className="max-w-7xl mx-auto ">
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
                                        selectedOptions={
                                          formData.skillsExpertise
                                        }
                                        onChange={handleskillsExpertiseChange}
                                        options={industryskills}
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
                                                      jobPosition:
                                                        e.target.value,
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
                                          if (
                                            file &&
                                            file.type.startsWith("image/")
                                          ) {
                                            setFormData((prev) => ({
                                              ...prev,
                                              photo: file,
                                            }));
                                          } else {
                                            alert(
                                              "Please select an image file"
                                            );
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
                            <form onSubmit={handleProfileSubmit}>
                              <div className="border-2 border-dashed w-full border-gray-300 rounded-lg p-4 space-y-2.5">
                                <div className="flex flex-col space-y-1.5">
                                  <Label
                                    className="text-md mb-1"
                                    htmlFor="newpass"
                                  >
                                    New Password
                                  </Label>
                                  <Input
                                    id="newpass"
                                    className="h-10 w-1/2"
                                    placeholder=""
                                  />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                  <Label
                                    className="text-md mb-1"
                                    htmlFor="confirmpass"
                                  >
                                    Confirm Password
                                  </Label>
                                  <Input
                                    id="confirmpass"
                                    className="h-10 w-1/2"
                                    placeholder=""
                                  />
                                </div>

                                <div>
                                  <button
                                    type="submit"
                                    className="bg-[#269EB2] text-white px-4 py-2 rounded-lg mr-4 mt-6"
                                  >
                                    Reset
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
              {/* ----------------------------------------------------------------- */}
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

      {/* Add User Dialog */}
      <Dialog open={addUserDialog} onOpenChange={setAddUserDialog}>
        <DialogContent className=" top-[80%]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Fill in the user details below.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleAddUser}
            id="add-user-form"
            className="space-y-4"
          >
            <div className="space-y-2">
              <label htmlFor="user-name" className="text-sm font-medium">
                Name
              </label>
              <Input
                id="user-name"
                name="name"
                placeholder="Enter user name"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="user-email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="user-email"
                name="email"
                type="email"
                placeholder="Enter email address"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="user-password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="user-password"
                name="password"
                type="password"
                placeholder="Enter password"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="user-role" className="text-sm font-medium">
                Role
              </label>
              <Select name="role" defaultValue="">
                <SelectTrigger
                  id="user-role"
                  className="w-full !rounded-button"
                >
                  <SelectValue placeholder="Select user role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="alumni">Alumni</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="user-avatar" className="text-sm font-medium">
                Avatar
              </label>
              <Input
                id="user-avatar"
                name="avatar"
                type="file"
                accept="image/*"
                className="w-full"
              />
            </div>
          </form>
          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              className="!rounded-button whitespace-nowrap "
              onClick={() => setAddUserDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="add-user-form"
              className="!rounded-button whitespace-nowrap bg-[#269EB2] text-white"
            >
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Add Event Dialog */}
      <Dialog open={addEventDialog} onOpenChange={setAddEventDialog}>
        <DialogContent className=" top-[93%]">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
            <DialogDescription>
              Fill in the user details below
            </DialogDescription>
          </DialogHeader>
          <form id="add-event-form" className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="event-title" className="text-sm font-medium">
                Event Title
              </label>
              <Input id="event-title" name="title" className="w-full" />
            </div>
            <div className="space-y-2">
              <label htmlFor="event-date" className="text-sm font-medium">
                Event Date
              </label>
              <Input
                id="event-date"
                name="event-date"
                type="date"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="event-time" className="text-sm font-medium">
                Time Slot
              </label>
              <Input
                id="event-time"
                name="event-time"
                type="time"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="event-location" className="text-sm font-medium">
                Location
              </label>
              <Input
                id="event-location"
                name="event-location"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="event-organizer" className="text-sm font-medium">
                Organizer
              </label>
              <Input
                id="event-organizer"
                name="event-organizer"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="event-description"
                className="text-sm font-medium"
              >
                Description
              </label>
              <Textarea
                placeholder="Type your message here."
                id="description"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="event-banner" className="text-sm font-medium">
                Event Banner
              </label>
              <Input
                id="event-banner"
                name="event-banner"
                type="file"
                accept="image/*"
                className="w-full"
              />
            </div>
          </form>
          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              className="!rounded-button whitespace-nowrap "
              onClick={() => setAddEventDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="add-event-form"
              className="!rounded-button whitespace-nowrap bg-[#269EB2] text-white"
            >
              Add Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Add Job Dialog */}
      <Dialog open={addJobDialog} onOpenChange={setAddJobDialog}>
        <DialogContent className=" top-[90%]">
          <DialogHeader>
            <DialogTitle>Add New Job</DialogTitle>
            <DialogDescription>Fill in the Job details below</DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleEditJob}
            id="edit-job-form"
            className="space-y-4"
          >
            <div className="space-y-2">
              <label htmlFor="job-title" className="text-sm font-medium">
                Job Title *
              </label>
              <Input
                id="job-title"
                name="title"
                required
                defaultValue={selectedJob?.title}
                onChange={handleJobFormChange}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="job-company" className="text-sm font-medium">
                Company Name *
              </label>
              <Input
                id="job-company"
                name="company"
                required
                defaultValue={selectedJob?.company}
                onChange={handleJobFormChange}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="job-location" className="text-sm font-medium">
                Location *
              </label>
              <Input
                id="job-location"
                name="location"
                required
                defaultValue={selectedJob?.location}
                onChange={handleJobFormChange}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="job-description" className="text-sm font-medium">
                Description *
              </label>
              <textarea
                id="job-description"
                name="description"
                required
                className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                defaultValue={selectedJob?.description || ""}
                onChange={handleJobFormChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="job-requirements" className="text-sm font-medium">
                Requirements *
              </label>
              <textarea
                id="job-requirements"
                name="requirements"
                required
                className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                defaultValue={selectedJob?.requirements || ""}
                onChange={handleJobFormChange}
              />
            </div>
          </form>
          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              className="!rounded-button whitespace-nowrap "
              onClick={() => setAddJobDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="add-event-form"
              className="!rounded-button whitespace-nowrap bg-[#269EB2] text-white"
            >
              Add Job
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <DialogContent className=" top-[60%]">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete user:{" "}
              <span className="font-medium">{selectedUser?.name}</span>? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="!rounded-button whitespace-nowrap"
              onClick={() => setDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="!rounded-button whitespace-nowrap bg-red-500"
              onClick={confirmDeleteUser}
            >
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Delete Event Dialog */}
      <Dialog open={deleteEventDialog} onOpenChange={setDeleteEventDialog}>
        <DialogContent className=" top-[60%]">
          <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete event:{" "}
              <span className="font-medium">{selectedEvent?.title}</span>? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="!rounded-button whitespace-nowrap"
              onClick={() => setDeleteEventDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="!rounded-button whitespace-nowrap bg-red-500"
              onClick={confirmDeleteUser}
            >
              Delete Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Delete Job Dialog */}
      <Dialog open={deleteJobDialog} onOpenChange={setDeleteJobDialog}>
        <DialogContent className=" top-[60%]">
          <DialogHeader>
            <DialogTitle>Delete Job</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete Job:{" "}
              <span className="font-medium">{selectedJob?.title}</span>? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="!rounded-button whitespace-nowrap"
              onClick={() => setDeleteJobDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="!rounded-button whitespace-nowrap bg-red-500"
              onClick={confirmDeleteUser}
            >
              Delete Job
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Edit Event Dialog */}
      <Dialog open={editEventDialog} onOpenChange={setEditEventDialog}>
        <DialogContent className="max-w-2xl top-[96%]">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>
              Modify the event details below
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleEditEvent}
            id="edit-event-form"
            className="space-y-4"
          >
            <div className="space-y-2">
              <label htmlFor="event-title" className="text-sm font-medium">
                Event Title
              </label>
              <Input
                id="event-title"
                name="title"
                defaultValue={selectedEvent?.title}
                onChange={handleEventFormChange}
                className="w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="event-date" className="text-sm font-medium">
                  Date
                </label>
                <Input
                  id="event-date"
                  name="date"
                  type="date"
                  required
                  defaultValue={selectedEvent?.date}
                  onChange={handleEventFormChange}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="event-time" className="text-sm font-medium">
                  Time
                </label>
                <Input
                  id="event-time"
                  name="time"
                  type="time"
                  defaultValue="09:00"
                  onChange={handleEventFormChange}
                  className="w-full"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="event-location" className="text-sm font-medium">
                Location
              </label>
              <Input
                id="event-location"
                name="location"
                required
                defaultValue={selectedEvent?.location}
                onChange={handleEventFormChange}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="event-organizer" className="text-sm font-medium">
                Organizer
              </label>
              <Input
                id="event-organizer"
                name="organizer"
                required
                defaultValue={selectedEvent?.organizer}
                onChange={handleEventFormChange}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="event-description"
                className="text-sm font-medium"
              >
                Description
              </label>
              <textarea
                id="event-description"
                name="description"
                required
                className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                defaultValue={selectedEvent?.description || ""}
                onChange={handleEventFormChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="event-banner" className="text-sm font-medium">
                Event Banner
              </label>
              <Input
                id="event-banner"
                name="banner"
                type="file"
                accept="image/*"
                className="w-full"
                onChange={handleEventFormChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="event-status" className="text-sm font-medium">
                Status
              </label>
              <Select
                name="status"
                defaultValue={selectedEvent?.status || "Upcoming"}
                onValueChange={() => setIsEventFormChanged(true)}
              >
                <SelectTrigger
                  id="event-status"
                  className="w-full !rounded-button"
                >
                  <SelectValue placeholder="Select event status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Upcoming">Upcoming</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              className="!rounded-button whitespace-nowrap"
              onClick={() => setEditEventDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="edit-event-form"
              className="!rounded-button whitespace-nowrap"
              disabled={!isEventFormChanged}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Job Dialog */}
      <Dialog open={editJobDialog} onOpenChange={setEditJobDialog}>
        <DialogContent className="max-w-2xl top-[90%]">
          <DialogHeader>
            <DialogTitle>Edit Job Posting</DialogTitle>
            <DialogDescription>Modify the job details below</DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleEditJob}
            id="edit-job-form"
            className="space-y-4"
          >
            <div className="space-y-2">
              <label htmlFor="job-title" className="text-sm font-medium">
                Job Title
              </label>
              <Input
                id="job-title"
                name="title"
                required
                defaultValue={selectedJob?.title}
                onChange={handleJobFormChange}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="job-company" className="text-sm font-medium">
                Company Name
              </label>
              <Input
                id="job-company"
                name="company"
                required
                defaultValue={selectedJob?.company}
                onChange={handleJobFormChange}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="job-location" className="text-sm font-medium">
                Location
              </label>
              <Input
                id="job-location"
                name="location"
                required
                defaultValue={selectedJob?.location}
                onChange={handleJobFormChange}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="job-description" className="text-sm font-medium">
                Description
              </label>
              <textarea
                id="job-description"
                name="description"
                required
                className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                defaultValue={selectedJob?.description || ""}
                onChange={handleJobFormChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="job-requirements" className="text-sm font-medium">
                Requirements
              </label>
              <textarea
                id="job-requirements"
                name="requirements"
                required
                className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                defaultValue={selectedJob?.requirements || ""}
                onChange={handleJobFormChange}
              />
            </div>
          </form>
          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              className="!rounded-button whitespace-nowrap"
              onClick={() => setEditJobDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="edit-job-form"
              className="!rounded-button whitespace-nowrap"
              disabled={!isJobFormChanged}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default SuperDashboard;
