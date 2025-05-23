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
