import { supabase } from "../supabaseClient";

export const fetchUserProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    return null;
  }
};

export const fetchEvents = async () => {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching events:", error.message);
    return [];
  }
};

export const getCurrentSession = async () => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  } catch (error) {
    console.error("Error getting session:", error.message);
    return null;
  }
};

export const getUserData = async () => {
  try {
    const session = await getCurrentSession();
    if (!session) return null;

    const userId = session.user.id;
    const userRole = session.user.user_metadata?.role;

    const profile = await fetchUserProfile(userId);

    return {
      session,
      profile,
      userRole,
      userId,
    };
  } catch (error) {
    console.error("Error getting user data:", error.message);
    return null;
  }
};

export const createEvent = async (eventData) => {
  try {
    const { data, error } = await supabase
      .from("events")
      .insert([eventData])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating event:", error.message);
    return null;
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const { error } = await supabase.from("events").delete().eq("id", eventId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting event:", error.message);
    return false;
  }
};

export const updateEvent = async (eventId, eventData) => {
  try {
    const cleanEventData = Object.fromEntries(
      Object.entries(eventData).filter(([, v]) => v != null && v !== "")
    );

    const { data, error } = await supabase
      .from("events")
      .update(cleanEventData)
      .eq("id", eventId)
      .select("*")
      .single();

    if (error) {
      console.error("Update error:", error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error updating event:", error.message);
    return null;
  }
};

export const fetchEventById = async (eventId) => {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", eventId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching event details:", error.message);
    return null;
  }
};

export const createJob = async (jobData) => {
  try {
    // Validate required fields
    if (!jobData.job_title || !jobData.company_name) {
      throw new Error("Missing required fields");
    }

    // Format the data before insertion
    const jobToInsert = {
      job_title: jobData.job_title,
      company_name: jobData.company_name,
      location: jobData.location,
      job_type: jobData.job_type,
      description: jobData.description,
      qualification_requirements: jobData.qualification_requirements,
      salary_range_min: parseInt(jobData.salary_range_min) || 0,
      salary_range_max: parseInt(jobData.salary_range_max) || 0,
      key_skills: Array.isArray(jobData.key_skills)
        ? jobData.key_skills
        : jobData.key_skills.split(",").map((skill) => skill.trim()),
      reference_email: jobData.reference_email,
      application_deadline: jobData.application_deadline,
      industry: jobData.industry,
      is_active: true,
      application_url: jobData.application_url || null,
      posted_by_user_id: jobData.posted_by_user_id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Log the data being sent
    console.log("Attempting to create job with data:", jobToInsert);

    const { data, error } = await supabase
      .from("jobs")
      .insert([jobToInsert])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error("No data returned from insert operation");
    }

    return data;
  } catch (error) {
    console.error("Error creating job:", error);
    throw error;
  }
};

export const fetchJobs = async () => {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false })
      .eq("is_active", true);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching jobs:", error.message);
    return [];
  }
};

export const createJobApplication = async (applicationData) => {
  try {
    if (!applicationData.job_id || !applicationData.applicant_user_id) {
      throw new Error("Missing required fields");
    }

    const { data, error } = await supabase
      .from("job_applications")
      .insert([
        {
          job_id: applicationData.job_id,
          applicant_user_id: applicationData.applicant_user_id,
          cover_letter_text: applicationData.cover_letter_text,
          resume_url: applicationData.resume_url,
          status: "pending",
          applied_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Application error:", error);
      if (error.code === "42501") {
        throw new Error("You don't have permission to apply for this job");
      }
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error creating job application:", error);
    throw error;
  }
};

export const updateJob = async (jobId, jobData) => {
  try {
    // Format the data before updating
    const formattedData = {
      job_title: jobData.job_title,
      company_name: jobData.company_name,
      location: jobData.location,
      job_type: jobData.job_type,
      qualification_requirements: jobData.qualification_requirements,
      salary_range_min: parseInt(jobData.salary_range_min),
      salary_range_max: parseInt(jobData.salary_range_max),
      description: jobData.description,
      key_skills: jobData.key_skills.split(",").map((skill) => skill.trim()),
      reference_email: jobData.reference_email,
      application_deadline: jobData.application_deadline,
      industry: jobData.industry,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("jobs")
      .update(formattedData)
      .eq("id", jobId)
      .select()
      .single();

    if (error) {
      console.error("Update error:", error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error updating job:", error);
    throw error;
  }
};

export const deleteJob = async (jobId) => {
  try {
    const { error } = await supabase.from("jobs").delete().eq("id", jobId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting job:", error.message);
    throw error;
  }
};

export const createMentorshipRequest = async (requestData) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    // Check for existing pending request
    const { data: existingRequest, error: checkError } = await supabase
      .from("mentorship_requests")
      .select("id")
      .eq("student_user_id", user.id)
      .eq("alumni_user_id", requestData.mentorId)
      .eq("status", "pending")
      .maybeSingle();

    if (checkError) throw checkError;

    if (existingRequest) {
      throw new Error("You already have a pending request with this mentor.");
    }

    // Create new request
    const { data, error } = await supabase
      .from("mentorship_requests")
      .insert([
        {
          student_user_id: user.id,
          alumni_user_id: requestData.mentorId,
          request_message: requestData.message,
          areas_of_interest: requestData.areas,
          status: "pending",
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating mentorship request:", error.message);
    throw error;
  }
};

export const fetchMentorshipRequests = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("mentorship_requests")
      .select(
        `
        *,
        student:profiles!student_user_id (
          id,
          full_name,
          
          course
        )
      `
      )
      .eq("alumni_user_id", user.id)
      .eq("status", "pending")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching mentorship requests:", error.message);
    throw error;
  }
};

export const scheduleSession = async (requestId, formData) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    // First insert the session
    const { data: newSession, error: sessionError } = await supabase
      .from("mentorship_sessions")
      .insert([
        {
          mentorship_request_id: requestId,
          student_user_id: formData.student_user_id,
          alumni_user_id: user.id,
          session_datetime: new Date(
            formData.date + "T" + formData.time
          ).toISOString(),
          duration_minutes: 60, // Default duration
          platform: formData.platform,
          session_url: formData.session_url,
          agenda_notes: formData.agenda_notes,
          status: "scheduled",
        },
      ])
      .select()
      .single();

    if (sessionError) throw sessionError;

    // Then update the request status
    const { error: requestError } = await supabase
      .from("mentorship_requests")
      .update({ status: "scheduled" })
      .eq("id", requestId);

    if (requestError) throw requestError;

    return newSession;
  } catch (error) {
    console.error("Error scheduling session:", error.message);
    throw error;
  }
};

export const fetchScheduledSessions = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    console.log("Current user:", user.id);

    const { data, error } = await supabase
      .from("mentorship_sessions")
      .select(
        `
        *,
        alumni:profiles!alumni_user_id (
          id,
          full_name,
          current_job_title,
          current_company
        )
      `
      )
      .eq("student_user_id", user.id)
      .eq("status", "scheduled")
      .order("session_datetime", { ascending: true });

    console.log("Fetched sessions:", data);
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching scheduled sessions:", error.message);
    throw error;
  }
};

export const fetchAlumniMentors = async () => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select(
        `
        id,
        full_name,
        current_job_title,
        current_company,
        profile_photo_url,
        skills_expertise,
        profile_summary,
        industries_of_interest
      `
      )
      .eq("role", "alumni")
      .eq("is_superadmin", false)
      .order("full_name");

    if (error) {
      console.error("Error fetching mentors:", error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching alumni mentors:", error.message);
    throw error;
  }
};

export const fetchUserProfileDetails = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select(
        `
        *
      `
      )
      .eq("id", userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching user profile details:", error);
    return null;
  }
};
