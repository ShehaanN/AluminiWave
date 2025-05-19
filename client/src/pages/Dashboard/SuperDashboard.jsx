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
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [displayedEvents, setDisplayedEvents] = useState([]);
  const [displayedJobs, setDisplayedJobs] = useState([]);
  const itemsPerPage = 6;

  // Mock user data
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "STUDENT",
      joinedDate: "2024-03-15",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "ALUMNI",
      joinedDate: "2024-02-10",
      status: "Active",
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert.j@example.com",
      role: "SUPERADMIN",
      joinedDate: "2023-11-22",
      status: "Active",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      role: "STUDENT",
      joinedDate: "2024-04-05",
      status: "Inactive",
    },
    {
      id: 5,
      name: "Michael Wilson",
      email: "michael.w@example.com",
      role: "ALUMNI",
      joinedDate: "2023-12-18",
      status: "Active",
    },
    {
      id: 6,
      name: "Sarah Thompson",
      email: "sarah.t@example.com",
      role: "STUDENT",
      joinedDate: "2024-01-30",
      status: "Active",
    },
    {
      id: 7,
      name: "David Brown",
      email: "david.b@example.com",
      role: "STUDENT",
      joinedDate: "2024-01-15",
    },
    {
      id: 8,
      name: "Lisa Anderson",
      email: "lisa.a@example.com",
      role: "ALUMNI",
      joinedDate: "2023-10-05",
    },
    {
      id: 9,
      name: "James Wilson",
      email: "james.w@example.com",
      role: "STUDENT",
      joinedDate: "2024-02-28",
    },
    {
      id: 10,
      name: "Jennifer Lee",
      email: "jennifer.l@example.com",
      role: "ALUMNI",
      joinedDate: "2023-09-12",
    },
    {
      id: 11,
      name: "Thomas Clark",
      email: "thomas.c@example.com",
      role: "STUDENT",
      joinedDate: "2024-03-20",
    },
    {
      id: 12,
      name: "Patricia White",
      email: "patricia.w@example.com",
      role: "SUPERADMIN",
      joinedDate: "2023-08-15",
    },
    {
      id: 13,
      name: "Christopher Harris",
      email: "chris.h@example.com",
      role: "STUDENT",
      joinedDate: "2024-01-05",
    },
    {
      id: 14,
      name: "Elizabeth Martin",
      email: "elizabeth.m@example.com",
      role: "ALUMNI",
      joinedDate: "2023-11-10",
    },
    {
      id: 15,
      name: "Daniel Thompson",
      email: "daniel.t@example.com",
      role: "STUDENT",
      joinedDate: "2024-02-15",
    },
    {
      id: 16,
      name: "Margaret Garcia",
      email: "margaret.g@example.com",
      role: "ALUMNI",
      joinedDate: "2023-10-22",
    },
    {
      id: 17,
      name: "Joseph Martinez",
      email: "joseph.m@example.com",
      role: "STUDENT",
      joinedDate: "2024-03-05",
    },
    {
      id: 18,
      name: "Susan Robinson",
      email: "susan.r@example.com",
      role: "ALUMNI",
      joinedDate: "2023-09-30",
    },
    {
      id: 19,
      name: "Charles Lewis",
      email: "charles.l@example.com",
      role: "STUDENT",
      joinedDate: "2024-02-01",
    },
    {
      id: 20,
      name: "Jessica Walker",
      email: "jessica.w@example.com",
      role: "ALUMNI",
      joinedDate: "2023-12-05",
    },
    {
      id: 21,
      name: "Matthew Hall",
      email: "matthew.h@example.com",
      role: "STUDENT",
      joinedDate: "2024-01-20",
    },
    {
      id: 22,
      name: "Karen Allen",
      email: "karen.a@example.com",
      role: "SUPERADMIN",
      joinedDate: "2023-08-25",
    },
    {
      id: 23,
      name: "Donald Young",
      email: "donald.y@example.com",
      role: "STUDENT",
      joinedDate: "2024-03-10",
    },
    {
      id: 24,
      name: "Betty King",
      email: "betty.k@example.com",
      role: "ALUMNI",
      joinedDate: "2023-11-15",
    },
    {
      id: 25,
      name: "Shehan Nadeesha",
      email: "shehan@gmail.com",
      role: "ALUMNI",
      joinedDate: "2025-05-16",
    },
  ];

  const totalUsers = 1248;
  const activeStudents = 856;
  const activeAlumni = 392;
  const totalResults = users.length;

  // Mock events data
  const events = [
    {
      id: 1,
      title: "Spring Career Fair",
      date: "2025-05-25",
      location: "Main Campus",
      organizer: "Career Services",
      status: "Upcoming",
    },
    {
      id: 2,
      title: "Alumni Networking Night",
      date: "2025-06-10",
      location: "Downtown Conference Center",
      organizer: "Alumni Association",
      status: "Upcoming",
    },
    {
      id: 3,
      title: "Tech Industry Panel",
      date: "2025-04-15",
      location: "Virtual",
      organizer: "Computer Science Department",
      status: "Completed",
    },
    {
      id: 4,
      title: "Resume Workshop",
      date: "2025-05-05",
      location: "Student Center",
      organizer: "Career Services",
      status: "Completed",
    },
    {
      id: 5,
      title: "Graduate School Info Session",
      date: "2025-06-20",
      location: "Academic Building",
      organizer: "Graduate Studies Office",
      status: "Upcoming",
    },
    {
      id: 6,
      title: "Alumni Reunion",
      date: "2025-07-15",
      location: "University Campus",
      organizer: "Alumni Association",
      status: "Upcoming",
    },
    {
      id: 7,
      title: "Job Search Strategies",
      date: "2025-05-12",
      location: "Career Services Office",
      organizer: "Career Services",
      status: "Completed",
    },
    {
      id: 8,
      title: "Entrepreneurship Workshop",
      date: "2025-06-05",
      location: "Business School",
      organizer: "Entrepreneurship Center",
      status: "Upcoming",
    },
    {
      id: 9,
      title: "Networking Lunch with Alumni",
      date: "2025-05-30",
      location: "Dining Hall",
      organizer: "Alumni Association",
      status: "Upcoming",
    },
    {
      id: 10,
      title: "Mental Health Awareness Seminar",
      date: "2025-04-28",
      location: "Wellness Center",
      organizer: "Counseling Services",
      status: "Completed",
    },
    {
      id: 11,
      title: "Diversity and Inclusion Workshop",
      date: "2025-05-18",
      location: "Cultural Center",
      organizer: "Diversity Office",
      status: "Upcoming",
    },
    {
      id: 12,
      title: "Financial Literacy Seminar",
      date: "2025-06-25",
      location: "Finance Department",
      organizer: "Finance Office",
      status: "Upcoming",
    },
    {
      id: 13,
      title: "Public Speaking Workshop",
      date: "2025-05-22",
      location: "Communication Department",
      organizer: "Communication Office",
      status: "Upcoming",
    },
    {
      id: 14,
      title: "Career Development Conference",
      date: "2025-07-01",
      location: "Convention Center",
      organizer: "Career Services",
      status: "Upcoming",
    },
  ];

  const totalEvents = 87;
  const upcommingEvents = 32;
  const totalEventResults = events.length;

  // Mock jobs data
  const jobs = [
    {
      id: 1,
      title: "Software Engineer",
      company: "Tech Solutions Inc.",
      location: "San Francisco, CA",
      postedDate: "2025-05-10",
      status: "Active",
    },
    {
      id: 2,
      title: "Marketing Specialist",
      company: "Global Brands",
      location: "New York, NY",
      postedDate: "2025-05-08",
      status: "Active",
    },
    {
      id: 3,
      title: "Financial Analyst",
      company: "Investment Partners",
      location: "Chicago, IL",
      postedDate: "2025-05-01",
      status: "Filled",
    },
    {
      id: 4,
      title: "Product Manager",
      company: "Innovate Labs",
      location: "Austin, TX",
      postedDate: "2025-04-28",
      status: "Active",
    },
    {
      id: 5,
      title: "HR Coordinator",
      company: "Corporate Services",
      location: "Remote",
      postedDate: "2025-05-12",
      status: "Active",
    },
    {
      id: 6,
      title: "Data Scientist",
      company: "AI Ventures",
      location: "Seattle, WA",
      postedDate: "2025-05-15",
      status: "Active",
    },
    {
      id: 7,
      title: "Graphic Designer",
      company: "Creative Studio",
      location: "Los Angeles, CA",
      postedDate: "2025-05-05",
      status: "Active",
    },
    {
      id: 8,
      title: "Sales Manager",
      company: "Retail Corp",
      location: "Dallas, TX",
      postedDate: "2025-05-03",
      status: "Filled",
    },
    {
      id: 9,
      title: "Cybersecurity Analyst",
      company: "SecureTech",
      location: "Washington, DC",
      postedDate: "2025-05-07",
      status: "Active",
    },
    {
      id: 10,
      title: "Content Writer",
      company: "MediaWorks",
      location: "Remote",
      postedDate: "2025-05-09",
      status: "Active",
    },
    {
      id: 11,
      title: "UI/UX Designer",
      company: "DesignHub",
      location: "San Diego, CA",
      postedDate: "2025-05-11",
      status: "Active",
    },
    {
      id: 12,
      title: "DevOps Engineer",
      company: "CloudOps",
      location: "Denver, CO",
      postedDate: "2025-05-13",
      status: "Active",
    },
    {
      id: 13,
      title: "Business Analyst",
      company: "Enterprise Solutions",
      location: "Boston, MA",
      postedDate: "2025-05-06",
      status: "Active",
    },
    {
      id: 14,
      title: "Operations Manager",
      company: "LogisticsPro",
      location: "Phoenix, AZ",
      postedDate: "2025-05-04",
      status: "Filled",
    },
    {
      id: 15,
      title: "Mobile App Developer",
      company: "Appify",
      location: "Orlando, FL",
      postedDate: "2025-05-02",
      status: "Active",
    },
    {
      id: 16,
      title: "SEO Specialist",
      company: "DigitalBoost",
      location: "Remote",
      postedDate: "2025-05-14",
      status: "Active",
    },
    {
      id: 17,
      title: "Network Engineer",
      company: "NetSecure",
      location: "Houston, TX",
      postedDate: "2025-05-16",
      status: "Active",
    },
    {
      id: 18,
      title: "Project Coordinator",
      company: "BuildIt",
      location: "Portland, OR",
      postedDate: "2025-05-17",
      status: "Active",
    },
    {
      id: 19,
      title: "Customer Support Specialist",
      company: "HelpDesk Inc.",
      location: "Remote",
      postedDate: "2025-05-18",
      status: "Active",
    },
    {
      id: 20,
      title: "AI Researcher",
      company: "FutureTech",
      location: "Palo Alto, CA",
      postedDate: "2025-05-19",
      status: "Active",
    },
  ];

  const totalJobs = 125;
  const totalJobResults = jobs.length;

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedUsers(users.slice(startIndex, endIndex));
    setDisplayedEvents(events.slice(startIndex, endIndex));
    setDisplayedJobs(jobs.slice(startIndex, endIndex));
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  // Calculate pagination display text
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalResults);

  const handleNextPage = () => {
    if (currentPage * itemsPerPage < totalResults) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

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

  const [activeSettingTab, setActiveSettingTab] = useState("profile");
  const [accountData, setAccountData] = useState({
    fullName: "",
    photo: null,
    gender: "",
    dob: "",
    contactNo: "",
    passoutYear: "",
    degreeProgram: "",
    occupation: "",
    headline: "",
    region: "",
  });

  const [profileData, setProfileData] = useState({
    academicSummary: "",
    technicalSkills: "",
    academicTimeline: {
      title: "",
      institution: "",
      duration: "",
      gpa: "",
    },
  });

  const handleAccountChange = (e) => {
    const { name, value, files, type } = e.target;
    setAccountData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    if (["title", "institution", "duration", "gpa"].includes(name)) {
      setProfileData((prev) => ({
        ...prev,
        academicTimeline: {
          ...prev.academicTimeline,
          [name]: value,
        },
      }));
    } else {
      setProfileData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAccountSubmit = (e) => {
    e.preventDefault();
    console.log("Account Data:", accountData);
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Data:", profileData);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Basic validation
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const role = formData.get("role");

    if (!name || !email || !password || !role) {
      return;
    }

    console.log("Adding new user:", Object.fromEntries(formData));

    // Close dialog and reset form
    setAddUserDialog(false);
    form.reset();
  };

  const handleDeleteUser = (user) => {
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
                  <div className="text-3xl font-bold">{totalUsers}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Active Students
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{activeStudents} </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Active Alumni
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{activeAlumni} </div>
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
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <i className="fas fa-search text-gray-400"></i>
                  </div>
                </div>
                <Select defaultValue="all-roles">
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
                    {displayedUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <Avatar>
                            <AvatarImage src={sara} alt={user.name} />
                            <AvatarFallback>
                              {user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell className="font-medium">
                          {user.name}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.role === "SUPERADMIN"
                                ? "destructive"
                                : user.role === "ALUMNI"
                                ? "outline"
                                : "default"
                            }
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.joinedDate}</TableCell>

                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="!rounded-button whitespace-nowrap cursor-pointer text-blue-600 border-blue-600 hover:bg-blue-50"
                              onClick={() => {
                                setSelectedUser(user);
                                setViewProfileDialog(true);
                              }}
                            >
                              <i className="fas fa-eye"></i>
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              className="!rounded-button whitespace-nowrap cursor-pointer text-red-600 border-red-600 hover:bg-red-50"
                              onClick={() => handleDeleteUser(user)}
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
                Showing {startItem} to {endItem} of {totalResults} results
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="!rounded-button whitespace-nowrap cursor-pointer"
                  id="previous-button"
                >
                  <i className="fas fa-chevron-left mr-1"></i> Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={currentPage * itemsPerPage >= totalResults}
                  className="!rounded-button whitespace-nowrap cursor-pointer"
                  id="next-button"
                >
                  Next <i className="fas fa-chevron-right ml-1"></i>
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
                  <div className="text-3xl font-bold">{totalEvents}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{upcommingEvents}</div>
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
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <i className="fas fa-search text-gray-400"></i>
                  </div>
                </div>
                <Select defaultValue="all-status">
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
                    {displayedEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">
                          {event.title}
                        </TableCell>
                        <TableCell>{event.date}</TableCell>
                        <TableCell>8:30 AM</TableCell>
                        <TableCell>{event.location}</TableCell>
                        <TableCell>{event.organizer}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              event.status === "Upcoming"
                                ? "default"
                                : event.status === "Completed"
                                ? "outline"
                                : "secondary"
                            }
                            className={
                              event.status === "Upcoming"
                                ? "bg-blue-100 text-blue-800"
                                : event.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {event.status}
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
                              onClick={() => {
                                handleDeleteEvent(event);
                              }}
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
                <span className="font-medium">{totalEventResults}</span> results
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={handlePreviousPage}
                  className="!rounded-button whitespace-nowrap cursor-pointer"
                >
                  <i className="fas fa-chevron-left mr-2"></i> Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Active Job Listings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{totalJobs}</div>
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
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <i className="fas fa-search text-gray-400"></i>
                  </div>
                </div>
              </div>
              <Button
                className="!rounded-button whitespace-nowrap bg-[#415B68] text-white"
                onClick={() => {
                  setAddJobDialog(true);
                }}
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

                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayedJobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">
                          {job.title}
                        </TableCell>
                        <TableCell>{job.company}</TableCell>
                        <TableCell>{job.location}</TableCell>
                        <TableCell>{job.postedDate}</TableCell>

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
                              onClick={() => {
                                handleDeleteJob(job);
                              }}
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
                <span className="font-medium">{totalJobResults}</span> results
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="!rounded-button whitespace-nowrap cursor-pointer"
                >
                  <i className="fas fa-chevron-left mr-2"></i> Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
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
              <div className="flex items-start  space-x-6 ">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={sara} alt={selectedUser.name} />
                  <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="text-2xl font-semibold">
                    {selectedUser.name}
                  </h3>
                  <p className="text-gray-500">{selectedUser.email}</p>
                  <Badge
                    variant={
                      selectedUser.role === "SUPERADMIN"
                        ? "destructive"
                        : selectedUser.role === "ALUMNI"
                        ? "outline"
                        : "default"
                    }
                  >
                    {selectedUser.role}
                  </Badge>
                </div>
              </div>
              {/* -------------------------------------------------------------- */}
              <div className="min-h-[55vh]">
                <main>
                  <div>
                    <div className="max-w-7xl mx-auto ">
                      <div className="bg-white rounded-lg shadow-lg p-4 lg:p-6 min-h-[59vh]">
                        {/* Tab Navigation */}
                        <div className="border-b border-gray-200">
                          <div className="flex lg:space-x-8 space-x-4 overflow-x-auto pb-2">
                            <button
                              onClick={() => setActiveSettingTab("profile")}
                              className={`px-4 py-2 whitespace-nowrap min-h-[44px] min-w-[44px] flex items-center ${
                                activeTab === "profile"
                                  ? "text-[#269EB2] border-b-2 border-[#269EB2]"
                                  : "text-gray-500"
                              }`}
                            >
                              Profile
                            </button>
                            <button
                              onClick={() => setActiveSettingTab("account")}
                              className={`px-4 py-2 whitespace-nowrap min-h-[44px] min-w-[44px] flex items-center ${
                                activeTab === "account"
                                  ? "text-[#269EB2] border-b-2 border-[#269EB2]"
                                  : "text-gray-500"
                              }`}
                            >
                              Account
                            </button>
                            <button
                              onClick={() =>
                                setActiveSettingTab("changepassword")
                              }
                              className={`px-4 py-2 whitespace-nowrap min-h-[44px] min-w-[44px] flex items-center ${
                                activeTab === "changepassword"
                                  ? "text-[#269EB2] border-b-2 border-[#269EB2]"
                                  : "text-gray-500"
                              }`}
                            >
                              Change Password
                            </button>
                          </div>
                        </div>

                        {/* Tab Content */}
                        <div className="mt-8 space-y-6">
                          {activeSettingTab === "profile" && (
                            <form onSubmit={handleProfileSubmit}>
                              <div className="grid lg:grid-cols-1 grid-cols-1 gap-4">
                                <div className="border-2 border-dashed w-full border-gray-300 rounded-lg p-4 cursor-move">
                                  <div className="flex justify-between flex-wrap gap-4">
                                    <div className="flex-1 min-w-[250px]">
                                      <label>Academic Summary</label>
                                      <textarea
                                        name="academicSummary"
                                        value={profileData.academicSummary}
                                        onChange={handleProfileChange}
                                        className="border p-2 w-full text-sm mt-2 text-gray-600 border-gray-400"
                                      />
                                    </div>

                                    <div className="flex-1 min-w-[250px]">
                                      <label>Technical Skills</label>
                                      <input
                                        type="text"
                                        name="technicalSkills"
                                        value={profileData.technicalSkills}
                                        onChange={handleProfileChange}
                                        className="border p-2 w-full text-sm mt-2 text-gray-600 border-gray-400"
                                      />
                                    </div>

                                    <div className="w-full mt-4">
                                      <label>Academic Timeline</label>
                                      <div className="border-2 border-dashed p-4 rounded mb-3 space-y-2 border-gray-300 mt-2">
                                        <div className="grid lg:grid-cols-2 gap-4">
                                          <input
                                            type="text"
                                            name="title"
                                            placeholder="Title"
                                            value={
                                              profileData.academicTimeline.title
                                            }
                                            onChange={handleProfileChange}
                                            className="border p-2 w-full"
                                          />
                                          <input
                                            type="text"
                                            name="institution"
                                            placeholder="Institution"
                                            value={
                                              profileData.academicTimeline
                                                .institution
                                            }
                                            onChange={handleProfileChange}
                                            className="border p-2 w-full"
                                          />
                                          <input
                                            type="text"
                                            name="duration"
                                            placeholder="Duration"
                                            value={
                                              profileData.academicTimeline
                                                .duration
                                            }
                                            onChange={handleProfileChange}
                                            className="border p-2 w-full"
                                          />
                                          <input
                                            type="text"
                                            name="gpa"
                                            placeholder="GPA (if any)"
                                            value={
                                              profileData.academicTimeline.gpa
                                            }
                                            onChange={handleProfileChange}
                                            className="border p-2 w-full"
                                          />
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

                          {activeSettingTab === "account" && (
                            <div className="grid lg:grid-cols-1 grid-cols-1 gap-4">
                              <div className="border-2 border-dashed w-full border-gray-300 rounded-lg p-4 cursor">
                                <form onSubmit={handleAccountSubmit}>
                                  <div className="flex justify-between flex-wrap">
                                    <div className="w-60 mt-4">
                                      <label>Full Name</label>
                                      <input
                                        type="text"
                                        name="fullName"
                                        value={accountData.fullName}
                                        onChange={handleAccountChange}
                                        className="border p-2 w-full text-sm mt-2 text-gray-600 border-gray-400"
                                      />
                                    </div>

                                    <div className="w-60 mt-4">
                                      <label>Photo</label>
                                      <input
                                        type="file"
                                        name="photo"
                                        onChange={handleAccountChange}
                                        className="border p-2 w-full text-sm mt-2 text-gray-600 border-gray-400"
                                      />
                                    </div>

                                    <div className="w-60 mt-4">
                                      <label>Gender</label>
                                      <select
                                        name="gender"
                                        value={accountData.gender}
                                        onChange={handleAccountChange}
                                        className="border p-2 w-full text-sm mt-2 text-gray-600 border-gray-400"
                                      >
                                        <option value="">Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                      </select>
                                    </div>

                                    <div className="w-60 mt-4">
                                      <label>Date of Birth</label>
                                      <input
                                        type="date"
                                        name="dob"
                                        value={accountData.dob}
                                        onChange={handleAccountChange}
                                        className="border p-2 w-full text-sm mt-2 text-gray-600 border-gray-400"
                                      />
                                    </div>

                                    <div className="w-60 mt-4">
                                      <label>Contact No.</label>
                                      <input
                                        type="tel"
                                        name="contactNo"
                                        value={accountData.contactNo}
                                        onChange={handleAccountChange}
                                        className="border p-2 w-full text-sm mt-2 text-gray-600 border-gray-400"
                                      />
                                    </div>

                                    <div className="w-60 mt-4">
                                      <label>Passout Year</label>
                                      <input
                                        type="number"
                                        name="passoutYear"
                                        value={accountData.passoutYear}
                                        onChange={handleAccountChange}
                                        className="border p-2 w-full text-sm mt-2 text-gray-600 border-gray-400"
                                      />
                                    </div>

                                    <div className="w-60 mt-4">
                                      <label>Degree Program</label>
                                      <input
                                        type="text"
                                        name="degreeProgram"
                                        value={accountData.degreeProgram}
                                        onChange={handleAccountChange}
                                        className="border p-2 w-full text-sm mt-2 text-gray-600 border-gray-400"
                                      />
                                    </div>

                                    <div className="w-60 mt-4">
                                      <label>Occupation</label>
                                      <input
                                        type="text"
                                        name="occupation"
                                        value={accountData.occupation}
                                        onChange={handleAccountChange}
                                        className="border p-2 w-full text-sm mt-2 text-gray-600 border-gray-400"
                                      />
                                    </div>

                                    <div className="w-60 mt-4">
                                      <label>Professional headline</label>
                                      <input
                                        type="text"
                                        name="headline"
                                        value={accountData.headline}
                                        onChange={handleAccountChange}
                                        className="border p-2 w-full text-sm mt-2 text-gray-600 border-gray-400"
                                      />
                                    </div>

                                    <div className="w-60 mt-4">
                                      <label>Region</label>
                                      <input
                                        type="text"
                                        name="region"
                                        value={accountData.region}
                                        onChange={handleAccountChange}
                                        className="border p-2 w-full text-sm mt-2 text-gray-600 border-gray-400"
                                      />
                                    </div>
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

                          {activeSettingTab === "changepassword" && (
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
                  <SelectItem value="STUDENT">Student</SelectItem>
                  <SelectItem value="ALUMNI">Alumni</SelectItem>
                  <SelectItem value="SUPERADMIN">Superadmin</SelectItem>
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
