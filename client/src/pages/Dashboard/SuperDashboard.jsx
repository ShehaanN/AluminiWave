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
import { Link, useNavigate } from "react-router-dom";
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

  const [stats, setStats] = useState({
    totalUsers: 0,
    activeStudents: 0,
    activeAlumni: 0,
    totalEvents: 0,
    upcomingEvents: 0,
    activeJobs: 0,
  });

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [filteredUsers, setFilteredUsers] = useState([]);

  // const [searchQuery, setSearchQuery] = useState("");
  // const [roleFilter, setRoleFilter] = useState("all-roles");

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setIsSubmitting(true);

    try {
      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        throw new Error("New passwords don't match");
      }

      if (passwordForm.newPassword.length < 6) {
        throw new Error("New password must be at least 6 characters long");
      }

      // If changing superadmin's own password
      if (selectedUser.is_superadmin) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: selectedUser.email,
          password: passwordForm.currentPassword,
        });

        if (signInError) {
          throw new Error("Current password is incorrect");
        }

        const { error: updateError } = await supabase.auth.updateUser({
          password: passwordForm.newPassword,
        });

        if (updateError) throw updateError;
      } else {
        // For non-superadmin users, use admin API function
        const { error: functionError } = await supabase.rpc(
          "admin_update_user_password",
          {
            user_id: selectedUser.id,
            new_password: passwordForm.newPassword,
          }
        );

        if (functionError) throw functionError;
      }

      // Clear form
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      alert("Password updated successfully");
    } catch (error) {
      console.error("Password change error:", error);
      setPasswordError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }

      setCurrentUser(null);

      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error.message);
      alert("Error signing out. Please try again.");
    }
  };

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
            profile_photo_url,
            is_superadmin
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
  // useEffect(() => {
  //   let filtered = users;

  //   if (searchQuery) {
  //     filtered = filtered.filter(
  //       (user) =>
  //         user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         user.email.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //   }

  //   if (roleFilter !== "all-roles") {
  //     filtered = filtered.filter(
  //       (user) => user.role.toLowerCase() === roleFilter.toLowerCase()
  //     );
  //   }

  //   setFilteredUsers(filtered);
  // }, [searchQuery, roleFilter, users]);

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
  // const [eventSearchQuery, setEventSearchQuery] = useState("");
  // const [eventStatusFilter, setEventStatusFilter] = useState("all-status");

  //  fetching event stats
  useEffect(() => {
    const fetchEventStats = async () => {
      try {
        const { data: eventData, error } = await supabase
          .from("events")
          .select(
            "id, status,location,time_slot_start,title,banner_image_url, event_date,description"
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
  // useEffect(() => {
  //   let filtered = events;

  //   if (eventSearchQuery) {
  //     filtered = filtered.filter(
  //       (event) =>
  //         event.title.toLowerCase().includes(eventSearchQuery.toLowerCase()) ||
  //         event.location.toLowerCase().includes(eventSearchQuery.toLowerCase())
  //     );
  //   }

  //   if (eventStatusFilter !== "all-status") {
  //     filtered = filtered.filter(
  //       (event) =>
  //         event.status.toLowerCase() === eventStatusFilter.toLowerCase()
  //     );
  //   }

  //   setFilteredEvents(filtered);
  // }, [eventSearchQuery, eventStatusFilter, events]);

  const [jobStats, setJobStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    applicationsReceived: 0,
    jobsFilledRate: 0,
  });

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  // const [jobSearchQuery, setJobSearchQuery] = useState("");
  // const [jobStatusFilter, setJobStatusFilter] = useState("all");

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
  // useEffect(() => {
  //   let filtered = jobs;

  //   if (jobSearchQuery) {
  //     filtered = filtered.filter(
  //       (job) =>
  //         job.title.toLowerCase().includes(jobSearchQuery.toLowerCase()) ||
  //         job.company.toLowerCase().includes(jobSearchQuery.toLowerCase())
  //     );
  //   }

  //   if (jobStatusFilter !== "all") {
  //     filtered = filtered.filter((job) =>
  //       jobStatusFilter === "active" ? job.is_active : !job.is_active
  //     );
  //   }

  //   setFilteredJobs(filtered);
  // }, [jobSearchQuery, jobStatusFilter, jobs]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const [jobForm, setJobForm] = useState({
    job_title: "",
    company_name: "",
    location: "",
    job_type: "",
    salary_range_min: "",
    salary_range_max: "",
    qualification_requirements: "",
    description: "",
    key_skills: "",
    reference_email: "",
    application_deadline: "",
    industry: [],
  });

  const handleJobFormChange = (e, field = null) => {
    setIsJobFormChanged(true);

    if (field === "industry") {
      setJobForm((prev) => ({
        ...prev,
        industry: e,
      }));
      return;
    }

    const { id, value } = e.target;
    setJobForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  useEffect(() => {
    if (selectedJob) {
      setJobForm({
        job_title: selectedJob.job_title || "",
        company_name: selectedJob.company_name || "",
        location: selectedJob.location || "",
        job_type: selectedJob.job_type || "",
        salary_range_min: selectedJob.salary_range_min || "",
        salary_range_max: selectedJob.salary_range_max || "",
        qualification_requirements:
          selectedJob.qualification_requirements || "",
        description: selectedJob.description || "",
        // Convert array back to comma-separated string for display
        key_skills: Array.isArray(selectedJob.key_skills)
          ? selectedJob.key_skills.join(", ")
          : selectedJob.key_skills || "",
        reference_email: selectedJob.reference_email || "",
        application_deadline: selectedJob.application_deadline || "",
        industry: selectedJob.industry || [],
      });
    }
  }, [selectedJob]);

  const handleEditJob = async (e) => {
    e.preventDefault();

    try {
      // Convert comma-separated key_skills string to array
      const keySkillsArray = jobForm.key_skills
        .split(",")
        .map((skill) => skill.trim());

      const { error: updateError } = await supabase
        .from("jobs")
        .update({
          job_title: jobForm.job_title,
          company_name: jobForm.company_name,
          location: jobForm.location,
          job_type: jobForm.job_type,
          salary_range_min: jobForm.salary_range_min,
          salary_range_max: jobForm.salary_range_max,
          qualification_requirements: jobForm.qualification_requirements,
          description: jobForm.description,
          key_skills: keySkillsArray,
          reference_email: jobForm.reference_email,
          application_deadline: jobForm.application_deadline,
          industry: jobForm.industry,

          updated_at: new Date().toISOString(),
        })
        .eq("id", selectedJob.id);

      if (updateError) throw updateError;

      // Refresh jobs data
      const { data: refreshedJobs, error: refreshError } = await supabase
        .from("jobs")
        .select("*, job_applications(*)")
        .order("created_at", { ascending: false });

      if (refreshError) throw refreshError;

      setJobs(refreshedJobs);
      setFilteredJobs(refreshedJobs);
      setEditJobDialog(false);
      setIsJobFormChanged(false);
      alert("Job updated successfully");
    } catch (error) {
      console.error("Error updating job:", error);
      alert(`Failed to update job: ${error.message}`);
    }
  };

  const [addUserDialog, setAddUserDialog] = useState(false);
  const [addEventDialog, setAddEventDialog] = useState(false);
  const [addJobDialog, setAddJobDialog] = useState(false);

  const [editEventDialog, setEditEventDialog] = useState(false);
  const [isEventFormChanged, setIsEventFormChanged] = useState(false);

  const handleEditEvent = async (e) => {
    e.preventDefault();
    try {
      let bannerUrl = selectedEvent.banner_image_url;

      // Handle banner upload if a new file is selected
      if (editEventForm.banner instanceof File) {
        const fileExt = editEventForm.banner.name.split(".").pop();
        const fileName = `${selectedEvent.id}-${Date.now()}.${fileExt}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("event-banners")
          .upload(fileName, editEventForm.banner, {
            cacheControl: "3600",
            upsert: true,
            contentType: editEventForm.banner.type,
          });

        if (uploadError) {
          console.error("Banner upload error:", uploadError);
          throw new Error("Failed to upload banner");
        }

        // Get the public URL
        const {
          data: { publicUrl },
        } = supabase.storage.from("event-banners").getPublicUrl(fileName);

        bannerUrl = publicUrl;
      }

      // Update event data
      const { error: updateError } = await supabase
        .from("events")
        .update({
          title: editEventForm.title || selectedEvent.title,
          event_date: editEventForm.date || selectedEvent.event_date,
          time_slot_start: editEventForm.time || selectedEvent.time_slot_start,
          location: editEventForm.location || selectedEvent.location,
          organizer: editEventForm.organizer || selectedEvent.organizer,
          description: editEventForm.description || selectedEvent.description,
          banner_image_url: bannerUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", selectedEvent.id);

      if (updateError) throw updateError;

      // Refresh events data
      const { data: refreshedEvents, error: refreshError } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: false });

      if (refreshError) throw refreshError;

      setEvents(refreshedEvents);
      setFilteredEvents(refreshedEvents);
      setEditEventDialog(false);
      setIsEventFormChanged(false);
      alert("Event updated successfully");
    } catch (error) {
      console.error("Error updating event:", error);
      alert(`Failed to update event: ${error.message}`);
    }
  };

  const [activeViewTab, setActiveViewTab] = useState("profile");

  const [newUserForm, setNewUserForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  // Handle user creation

  const handleAddUser = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // First create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newUserForm.email,
        password: newUserForm.password,
        options: {
          data: {
            role: newUserForm.role,
          },
        },
      });

      if (authError) throw authError;

      // Then create profile
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: authData.user.id,
          full_name: newUserForm.name,
          email: newUserForm.email,
          role: newUserForm.role.toLowerCase(),
        },
      ]);

      if (profileError) throw profileError;

      // Refresh users list
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setUsers(data);
      setFilteredUsers(data);
      // Reset form and close dialog
      setNewUserForm({
        name: "",
        email: "",
        password: "",
        role: "",
      });
      setAddUserDialog(false);

      alert("User created successfully!");
    } catch (error) {
      console.error("Error creating user:", error);
      alert(`Failed to create user: ${error.message}`);
    }
  };

  const [newEventForm, setNewEventForm] = useState({
    title: "",
    event_date: "",
    time_slot_start: "",
    location: "",
    description: "",
    organizer: "",
    bannerFile: null,
    status: "upcoming",
  });

  const handleAddEvent = async (e) => {
    e.preventDefault();

    try {
      // Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      let banner_image_url = null;

      if (newEventForm.bannerFile) {
        const file = newEventForm.bannerFile;
        const fileName = `banners/${Date.now()}_${file.name.replace(
          /\s+/g,
          "_"
        )}`;

        if (file.size > 5000000) {
          throw new Error(
            "File size too large. Please upload a file smaller than 5MB."
          );
        }

        // Upload the file
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("event-banners")
          .upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) throw uploadError;

        // Get the public URL
        const { data: publicUrlData } = supabase.storage
          .from("event-banners")
          .getPublicUrl(uploadData.path);

        banner_image_url = publicUrlData.publicUrl;
      }

      const { data: newEvent, error: insertError } = await supabase
        .from("events")
        .insert([
          {
            title: newEventForm.title,
            event_date: newEventForm.event_date,
            time_slot_start: newEventForm.time_slot_start,
            location: newEventForm.location,
            description: newEventForm.description,
            organizer: newEventForm.organizer,
            banner_image_url: banner_image_url,
            status: "upcoming",
            created_at: new Date().toISOString(),
            created_by_user_id: user.id, // Add this line
          },
        ])
        .select()
        .single();

      if (insertError) throw insertError;

      // Refresh events list
      const { data: refreshedEvents, error: refreshError } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: false });

      if (refreshError) throw refreshError;

      setEvents(refreshedEvents);
      setFilteredEvents(refreshedEvents);
      setAddEventDialog(false);

      // Reset form
      setNewEventForm({
        title: "",
        event_date: "",
        time_slot_start: "",
        location: "",
        description: "",
        organizer: "",
        bannerFile: null,
        status: "upcoming",
      });

      alert("Event created successfully!");
    } catch (error) {
      console.error("Error creating event:", error);
      alert(`Failed to create event: ${error.message}`);
    }
  };

  const handleNewEventFormChange = (e) => {
    const { id, value, files, type } = e.target;
    if (type === "file") {
      setNewEventForm((prev) => ({ ...prev, bannerFile: files[0] }));
    } else {
      setNewEventForm((prev) => ({
        ...prev,
        [id.replace("event-", "")]: value,
      }));
    }
  };

  const handleEventFormChange = (e) => {
    const { name, value, type, files } = e.target;
    setIsEventFormChanged(true);
    setEditEventForm((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const [newJobForm, setNewJobForm] = useState({
    job_title: "",
    company_name: "",
    location: "",
    job_type: "",
    salary_range_min: "",
    salary_range_max: "",
    qualification_requirements: "",
    description: "",
    key_skills: "",
    reference_email: "",
    application_deadline: "",
    industry: [],
    is_active: true,
  });

  const handleNewJobFormChange = (e) => {
    const { id, value } = e.target;
    setNewJobForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleAddJob = async (e) => {
    e.preventDefault();

    try {
      // Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) throw userError;

      // Convert key_skills string to array
      const keySkillsArray = newJobForm.key_skills
        .split(",")
        .map((skill) => skill.trim());

      // Create new job
      const { data: newJob, error: insertError } = await supabase
        .from("jobs")
        .insert([
          {
            job_title: newJobForm.job_title,
            company_name: newJobForm.company_name,
            location: newJobForm.location,
            job_type: newJobForm.job_type,
            salary_range_min: parseInt(newJobForm.salary_range_min),
            salary_range_max: parseInt(newJobForm.salary_range_max),
            qualification_requirements: newJobForm.qualification_requirements,
            description: newJobForm.description,
            key_skills: keySkillsArray,
            reference_email: newJobForm.reference_email,
            application_deadline: newJobForm.application_deadline,
            industry: newJobForm.industry,
            is_active: true,
            created_at: new Date().toISOString(),
            posted_by_user_id: user.id,
          },
        ])
        .select()
        .single();

      if (insertError) throw insertError;

      // Refresh jobs list
      const { data: refreshedJobs, error: refreshError } = await supabase
        .from("jobs")
        .select("*, job_applications(*)")
        .order("created_at", { ascending: false });

      if (refreshError) throw refreshError;

      setJobs(refreshedJobs);
      setFilteredJobs(refreshedJobs);
      setAddJobDialog(false);

      // Reset form
      setNewJobForm({
        job_title: "",
        company_name: "",
        location: "",
        job_type: "",
        salary_range_min: "",
        salary_range_max: "",
        qualification_requirements: "",
        description: "",
        key_skills: "",
        reference_email: "",
        application_deadline: "",
        industry: [],
        is_active: true,
      });

      alert("Job created successfully!");
    } catch (error) {
      console.error("Error creating job:", error);
      alert(`Failed to create job: ${error.message}`);
    }
  };

  const handlenewindustryChange = (selectedOptions) => {
    setIsJobFormChanged(true);
    const selectedValues = selectedOptions.map((option) => option.value);
    setNewJobForm((prev) => ({
      ...prev,
      industry: selectedValues,
    }));
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

  const confirmDeleteUser = async () => {
    try {
      // Get current logged-in user
      const {
        data: { user: currentUser },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) throw userError;

      // Get current user's profile to check if they are superadmin
      const { data: currentUserProfile, error: profileError } = await supabase
        .from("profiles")
        .select("id, is_superadmin")
        .eq("id", currentUser.id)
        .single();

      if (profileError) throw profileError;

      // Check if user is superadmin
      if (!currentUserProfile.is_superadmin) {
        alert("Only superadmin can delete users");
        setDeleteDialog(false);
        return;
      }

      // Check if trying to delete own account
      if (currentUserProfile.id === selectedUser.id) {
        alert("You cannot delete your own superadmin account");
        setDeleteDialog(false);
        return;
      }

      // Call the database function to delete user
      const { error: deleteError } = await supabase.rpc(
        "delete_user_completely",
        {
          target_user_id: selectedUser.id,
        }
      );

      if (deleteError) throw deleteError;

      // Refresh users list
      const { data: refreshedUsers, error: refreshError } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (refreshError) throw refreshError;

      setUsers(refreshedUsers);
      setFilteredUsers(refreshedUsers);
      setDeleteDialog(false);

      alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert(`Failed to delete user: ${error.message}`);
    }
  };

  const confirmDeleteEvent = async () => {
    try {
      // Get current user's profile to check if they are superadmin
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) throw userError;

      const { data: adminCheck, error: adminError } = await supabase
        .from("profiles")
        .select("is_superadmin")
        .eq("id", user.id)
        .single();

      if (adminError) throw adminError;

      // Verify superadmin status
      if (!adminCheck.is_superadmin) {
        alert("Only superadmin can delete events");
        setDeleteEventDialog(false);
        return;
      }

      // Delete event
      const { error: deleteError } = await supabase
        .from("events")
        .delete()
        .eq("id", selectedEvent.id);

      if (deleteError) throw deleteError;

      // Delete event banner from storage if exists
      if (selectedEvent.banner_image_url) {
        const fileName = selectedEvent.banner_image_url.split("/").pop();
        const { error: storageError } = await supabase.storage
          .from("event-banners")
          .remove([fileName]);

        if (storageError) console.error("Error deleting banner:", storageError);
      }

      // Refresh events list
      const { data: refreshedEvents, error: refreshError } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: false });

      if (refreshError) throw refreshError;

      // Update state
      setEvents(refreshedEvents);
      setFilteredEvents(refreshedEvents);
      setDeleteEventDialog(false);
      setSelectedEvent(null);

      alert("Event deleted successfully");
    } catch (error) {
      console.error("Error deleting event:", error);
      alert(`Failed to delete event: ${error.message}`);
    }
  };

  const confirmDeleteJob = async () => {
    try {
      // Get current user's profile to check if they are superadmin
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) throw userError;

      const { data: adminCheck, error: adminError } = await supabase
        .from("profiles")
        .select("is_superadmin")
        .eq("id", user.id)
        .single();

      if (adminError) throw adminError;

      // Verify superadmin status
      if (!adminCheck.is_superadmin) {
        alert("Only superadmin can delete jobs");
        setDeleteJobDialog(false);
        return;
      }

      // Delete the job
      const { error: deleteError } = await supabase
        .from("jobs")
        .delete()
        .eq("id", selectedJob.id);

      if (deleteError) throw deleteError;

      // Refresh jobs list
      const { data: refreshedJobs, error: refreshError } = await supabase
        .from("jobs")
        .select("*, job_applications(*)")
        .order("created_at", { ascending: false });

      if (refreshError) throw refreshError;

      // Update state
      setJobs(refreshedJobs);
      setFilteredJobs(refreshedJobs);
      setDeleteJobDialog(false);
      setSelectedJob(null);

      alert("Job deleted successfully");
    } catch (error) {
      console.error("Error deleting job:", error);
      alert(`Failed to delete job: ${error.message}`);
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

  const [profileData, setProfileData] = useState(null);
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
    is_superadmin: false,
  });

  // fetch profile data when user is selected
  useEffect(() => {
    const fetchProfileData = async () => {
      if (selectedUser?.id) {
        const data = await fetchUserProfileDetails(selectedUser.id);
        if (data) {
          setProfileData(data);
          console.log("datar", data);

          setFormData({
            profile_summary: data.profile_summary || "",
            skillsExpertise: data.skills_expertise || [],
            industries_of_interest: data.industries_of_interest || [],
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
            is_superadmin: data.is_superadmin || false,
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
            is_superadmin: formData.is_superadmin,
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

      // Create base update object
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
  const handleskillsExpertiseChange = (selectedOptions) => {
    setIsJobFormChanged(true);
    const selectedValues = selectedOptions.map((option) => option.value);
    setFormData((prev) => ({
      ...prev,
      skillsExpertise: selectedValues,
    }));
  };
  const handleindustryChange = (selectedOptions) => {
    setIsJobFormChanged(true);
    const selectedValues = selectedOptions.map((option) => option.value);
    setJobForm((prev) => ({
      ...prev,
      industry: selectedValues,
    }));
  };

  const handleIndustriesChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFormData((prev) => ({
      ...prev,
      industries_of_interest: selectedValues,
    }));
  };

  const [editEventForm, setEditEventForm] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    organizer: "",
    description: "",
    banner: null,
  });

  useEffect(() => {
    if (selectedEvent) {
      setEditEventForm({
        title: selectedEvent.title || "",
        date: selectedEvent.event_date || "",
        time: selectedEvent.time_slot_start || "",
        location: selectedEvent.location || "",
        organizer: selectedEvent.organizer || "",
        description: selectedEvent.description || "",
        banner: null,
      });
    }
  }, [selectedEvent]);

  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const CurrentUser = async () => {
      try {
        // Get current logged-in user
        const {
          data: { user: currentUser },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError) throw userError;

        // Get current user's profile to check if they are superadmin
        const { data: currentUserProfile, error: profileError } = await supabase
          .from("profiles")
          .select("id, full_name, email, role, is_superadmin,profile_photo_url")
          .eq("id", currentUser.id)
          .single();

        if (profileError) throw profileError;

        setCurrentUser(currentUserProfile);
      } catch (error) {
        console.log(error);
      }
    };

    CurrentUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src={logo} alt="AlumniWave Logo" className="h-20 w-auto" />
          </div>
          <div className="flex items-center">
            <span className="mr-4 text-md text-gray-600">
              Welcome,{" "}
              {currentUser?.full_name
                ? currentUser.full_name.split(" ")[0]
                : ""}
            </span>

            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer size-10">
                    <AvatarImage
                      src={currentUser.profile_photo_url || dp}
                      alt="Admin"
                    />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                      handleLogout();
                    }}
                  >
                    Log out
                  </DropdownMenuItem>
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
            <div className="flex justify-end items-center mb-4">
              {/* <div className="flex items-center space-x-4 w-2/3">
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
              </div> */}

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
                              user.is_superadmin === true
                                ? "destructive"
                                : user.role === "alumni"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {user.is_superadmin === true
                              ? "superadmin"
                              : user.role}
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
                                  is_superadmin: user.is_superadmin,
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

            <div className="flex justify-end items-center mb-4">
              {/* <div className="flex items-center space-x-4 w-2/3">
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
              </div> */}
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
            <div className="flex justify-end items-center mb-4">
              {/* <div className="flex items-center space-x-4 w-2/3">
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
              </div> */}
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
                                              <div>
                                                <label>Is Superadmin</label>
                                                <select
                                                  name="is_superadmin"
                                                  value={formData.is_superadmin}
                                                  onChange={(e) =>
                                                    setFormData({
                                                      ...formData,
                                                      is_superadmin:
                                                        e.target.value ===
                                                        "true",
                                                    })
                                                  }
                                                  className="border p-2 w-full text-sm mt-2 text-gray-600 border-gray-400"
                                                >
                                                  <option value="false">
                                                    False
                                                  </option>
                                                  <option value="true">
                                                    True
                                                  </option>
                                                </select>
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
                            <form onSubmit={handlePasswordChange}>
                              <div className="border-2 border-dashed w-full border-gray-300 rounded-lg p-4 space-y-2.5">
                                {passwordError && (
                                  <div className="text-red-500 text-sm mb-4 p-2 bg-red-50 rounded">
                                    {passwordError}
                                  </div>
                                )}

                                <div className="flex flex-col space-y-1.5">
                                  <Label
                                    className="text-md mb-1"
                                    htmlFor="email"
                                  >
                                    Email
                                  </Label>
                                  <Input
                                    id="email"
                                    type="email"
                                    value={selectedUser?.email}
                                    className="h-10 w-1/2"
                                    disabled
                                  />
                                </div>

                                {selectedUser?.is_superadmin && (
                                  <div className="flex flex-col space-y-1.5">
                                    <Label
                                      className="text-md mb-1"
                                      htmlFor="currentpass"
                                    >
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
                                      required={selectedUser.is_superadmin}
                                    />
                                  </div>
                                )}

                                <div className="flex flex-col space-y-1.5">
                                  <Label
                                    className="text-md mb-1"
                                    htmlFor="newpass"
                                  >
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
                                    required
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
                                    required
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
                                    {isSubmitting
                                      ? "Updating..."
                                      : "Reset Password"}
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
                required
                value={newUserForm.name}
                onChange={(e) => {
                  setNewUserForm((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }));
                }}
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
                required
                value={newUserForm.email}
                onChange={(e) => {
                  setNewUserForm((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }));
                }}
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
                required
                value={newUserForm.password}
                onChange={(e) => {
                  setNewUserForm((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                }}
                placeholder="Enter password"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="user-role" className="text-sm font-medium">
                Role
              </label>
              <Select
                name="role"
                onValueChange={(value) => {
                  setNewUserForm((prev) => ({
                    ...prev,
                    role: value,
                  }));
                }}
                value={newUserForm.role}
              >
                <SelectTrigger
                  id="user-role"
                  className="w-full !rounded-button"
                >
                  <SelectValue placeholder="Select user role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alumni">Alumni</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectContent>
              </Select>
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
              disabled={
                !newUserForm.name ||
                !newUserForm.email ||
                !newUserForm.password ||
                !newUserForm.role
              }
            >
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Add Event Dialog */}
      <Dialog open={addEventDialog} onOpenChange={setAddEventDialog}>
        <DialogContent className="top-[93%]">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
            <DialogDescription>
              Fill in the event details below
            </DialogDescription>
          </DialogHeader>
          <form
            id="add-event-form"
            onSubmit={handleAddEvent}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label htmlFor="event-title" className="text-sm font-medium">
                Event Title
              </label>
              <Input
                id="event-title"
                value={newEventForm.title}
                onChange={handleNewEventFormChange}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="event-date" className="text-sm font-medium">
                Event Date
              </label>
              <Input
                id="event-date"
                type="date"
                value={newEventForm.event_date}
                onChange={(e) => {
                  setNewEventForm({
                    ...newEventForm,
                    event_date: e.target.value,
                  });
                }}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="event-time_slot_start"
                className="text-sm font-medium"
              >
                Time Slot
              </label>
              <Input
                id="event-time_slot_start"
                type="time"
                value={newEventForm.time_slot_start}
                onChange={handleNewEventFormChange}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="event-location" className="text-sm font-medium">
                Location
              </label>
              <Input
                id="event-location"
                value={newEventForm.location}
                onChange={handleNewEventFormChange}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="event-organizer" className="text-sm font-medium">
                Organizer
              </label>
              <Input
                id="event-organizer"
                value={newEventForm.organizer}
                onChange={handleNewEventFormChange}
                required
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
                id="event-description"
                value={newEventForm.description}
                onChange={handleNewEventFormChange}
                required
                placeholder="Type your message here."
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="event-banner" className="text-sm font-medium">
                Event Banner
              </label>
              <Input
                id="event-banner"
                type="file"
                accept="image/*"
                onChange={handleNewEventFormChange}
                className="w-full"
              />
            </div>
          </form>
          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              className="!rounded-button whitespace-nowrap"
              onClick={() => setAddEventDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="add-event-form"
              className="!rounded-button whitespace-nowrap bg-[#269EB2] text-white"
              disabled={
                !newEventForm.title ||
                !newEventForm.event_date ||
                !newEventForm.location
              }
            >
              Add Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Add Job Dialog */}
      <Dialog open={addJobDialog} onOpenChange={setAddJobDialog}>
        <DialogContent className="max-w-[50rem] min-w-[43rem] top-[95%] left-[70%] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Job</DialogTitle>
            <DialogDescription>Fill in the Job details below</DialogDescription>
          </DialogHeader>
          <form id="add-job-form" onSubmit={handleAddJob}>
            <div className="grid w-full items-center gap-3">
              <div className="flex flex-col space-y-1.5">
                <Label className="text-lg mb-1" htmlFor="job_title">
                  Job Title
                </Label>
                <Input
                  id="job_title"
                  className="h-10"
                  placeholder="Job Position"
                  value={newJobForm.job_title}
                  onChange={handleNewJobFormChange}
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
                    value={newJobForm.company_name}
                    onChange={handleNewJobFormChange}
                    required
                  />

                  <Input
                    id="location"
                    type="text"
                    className="h-10"
                    placeholder="Location"
                    value={newJobForm.location}
                    onChange={handleNewJobFormChange}
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
                  value={newJobForm.job_type}
                  onChange={handleNewJobFormChange}
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
                    value={newJobForm.salary_range_min}
                    onChange={handleNewJobFormChange}
                    placeholder="Minimum Salary"
                    required
                  />
                  <Input
                    id="salary_range_max"
                    type="number"
                    className="h-10"
                    value={newJobForm.salary_range_max}
                    onChange={handleNewJobFormChange}
                    placeholder="Maximum Salary"
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
                  value={newJobForm.qualification_requirements}
                  onChange={handleNewJobFormChange}
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
                  value={newJobForm.description}
                  onChange={handleNewJobFormChange}
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
                  value={newJobForm.key_skills}
                  onChange={handleNewJobFormChange}
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
                  value={newJobForm.reference_email}
                  onChange={handleNewJobFormChange}
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label className="text-lg mb-1" htmlFor="application_deadline">
                  Application Deadline
                </Label>
                <Input
                  id="application_deadline"
                  type="date"
                  className="h-10"
                  value={newJobForm.application_deadline}
                  onChange={handleNewJobFormChange}
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label className="text-lg mb-1" htmlFor="industry">
                  Industry
                </Label>
                <MultiSelect
                  options={industrySelectOptions}
                  selectedOptions={newJobForm.industry}
                  onChange={handlenewindustryChange}
                />
              </div>
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
              form="add-job-form"
              className="!rounded-button whitespace-nowrap bg-[#269EB2] text-white"
              disabled={!newJobForm.job_title || !newJobForm.company_name}
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
              <span className="font-medium">{selectedUser?.full_name}</span>?
              This action cannot be undone.
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
              onClick={confirmDeleteEvent}
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
              onClick={confirmDeleteJob}
            >
              Delete Job
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Edit Event Dialog */}
      <Dialog open={editEventDialog} onOpenChange={setEditEventDialog}>
        <DialogContent className="max-w-2xl top-[90%]">
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
                  defaultValue={selectedEvent?.event_date}
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
                  defaultValue={selectedEvent?.time_slot_start}
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
                defaultValue="Organizer"
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
        <DialogContent className="max-w-[50rem] min-w-[43rem] top-[95%] left-[70%] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Job Posting</DialogTitle>
            <DialogDescription>Modify the job details below</DialogDescription>
          </DialogHeader>

          {/* --------------------------- */}
          <form id="edit-job-form" onSubmit={handleEditJob}>
            <div className="grid w-full items-center gap-3">
              <div className="flex flex-col space-y-1.5">
                <Label className="text-lg mb-1" htmlFor="job_title">
                  Job Title
                </Label>
                <Input
                  id="job_title"
                  className="h-10"
                  placeholder="Job Position"
                  value={jobForm?.job_title}
                  onChange={handleJobFormChange}
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
                    value={jobForm.company_name}
                    onChange={handleJobFormChange}
                    required
                  />
                  <Input
                    id="location"
                    type="text"
                    className="h-10"
                    placeholder="Location"
                    value={jobForm.location}
                    onChange={handleJobFormChange}
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
                  value={jobForm.job_type}
                  onChange={handleJobFormChange}
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
                    value={jobForm.salary_range_min}
                    onChange={handleJobFormChange}
                    required
                  />
                  <Input
                    id="salary_range_max"
                    type="number"
                    className="h-10"
                    placeholder="Maximum Salary"
                    value={jobForm.salary_range_max}
                    onChange={handleJobFormChange}
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
                  value={jobForm.qualification_requirements}
                  onChange={handleJobFormChange}
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
                  value={jobForm.description}
                  onChange={handleJobFormChange}
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
                  value={jobForm.key_skills}
                  onChange={handleJobFormChange}
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
                  value={jobForm.reference_email}
                  onChange={handleJobFormChange}
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label className="text-lg mb-1" htmlFor="application_deadline">
                  Application Deadline
                </Label>
                <Input
                  id="application_deadline"
                  type="date"
                  className="h-10"
                  value={jobForm.application_deadline}
                  onChange={handleJobFormChange}
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label className="text-lg mb-1" htmlFor="industry">
                  Industry
                </Label>
                <MultiSelect
                  options={industrySelectOptions}
                  selectedOptions={jobForm.industry}
                  onChange={handleindustryChange}
                />
              </div>
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
