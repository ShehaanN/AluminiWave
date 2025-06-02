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

  // const [searchQuery, setSearchQuery] = useState("");
  // const [roleFilter, setRoleFilter] = useState("all-roles");

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

      // Show success message
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

      // Handle banner image upload if exists
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
  const handleindustryChange = (selectedOptions) => {
    setIsJobFormChanged(true);
    const selectedValues = selectedOptions.map((option) => option.value);
    setJobForm((prev) => ({
      ...prev,
      industry: selectedValues,
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

  const industryOptions = [
    {
      value: "Information Technology (IT) & Software Development",
      label: "Information Technology (IT) & Software Development",
    },
    {
      value: "Healthcare & Life Sciences",
      label: "Healthcare & Life Sciences",
    },
    {
      value: "Education & Academia",
      label: "Education & Academia",
    },
    { value: "Finance & Banking", label: "Finance & Banking" },
    {
      value: "Engineering & Manufacturing",
      label: "Engineering & Manufacturing",
    },
    {
      value: "Marketing & Advertising",
      label: "Marketing & Advertising",
    },
    { value: "Sales & Retail", label: "Sales & Retail" },
    {
      value: "Human Resources (HR) & Recruitment",
      label: "Human Resources (HR) & Recruitment",
    },
    {
      value: "Legal & Compliance",
      label: "Legal & Compliance",
    },
    {
      value: "Consulting & Business Services",
      label: "Consulting & Business Services",
    },
    {
      value: "Government & Public Administration",
      label: "Government & Public Administration",
    },
    { value: "Non-Profit & NGOs", label: "Non-Profit & NGOs" },
    {
      value: "Media & Communications",
      label: "Media & Communications",
    },
    {
      value: "Design & Creative Arts",
      label: "Design & Creative Arts",
    },
    {
      value: "Architecture & Urban Planning",
      label: "Architecture & Urban Planning",
    },
    {
      value: "Agriculture & Environmental Science",
      label: "Agriculture & Environmental Science",
    },
    {
      value: "Aerospace & Defense",
      label: "Aerospace & Defense",
    },
    {
      value: "Hospitality & Tourism",
      label: "Hospitality & Tourism",
    },
    {
      value: "Transportation & Logistics",
      label: "Transportation & Logistics",
    },
    {
      value: "Real Estate & Property Management",
      label: "Real Estate & Property Management",
    },
    {
      value: "Telecommunications",
      label: "Telecommunications",
    },
    {
      value: "Energy & Utilities",
      label: "Energy & Utilities",
    },
    {
      value: "Sports & Recreation",
      label: "Sports & Recreation",
    },
    { value: "Fashion & Apparel", label: "Fashion & Apparel" },
    { value: "Automotive", label: "Automotive" },
    {
      value: "Pharmaceuticals & Biotech",
      label: "Pharmaceuticals & Biotech",
    },
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
    {
      value: "Publishing & Journalism",
      label: "Publishing & Journalism",
    },
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
    {
      value: "Supply Chain Management",
      label: "Supply Chain Management",
    },
    {
      value: "Gaming & Game Development",
      label: "Gaming & Game Development",
    },
    { value: "Insurance", label: "Insurance" },
  ];

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
                  options={industryOptions}
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
                  options={industryOptions} // Array of {value, label} objects
                  selectedOptions={jobForm.industry} // Array of {value, label} objects
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
