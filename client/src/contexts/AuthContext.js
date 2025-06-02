import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export const useAuthProfile = () => {
  const [user, setUser] = useState({});
  const [session, setSession] = useState({});
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
      // console.log(data);

      if (error) throw error;

      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error.message);
      setProfile(null);
    }
  };

  useEffect(() => {
    const init = async () => {
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();

      const currentUser = currentSession?.user ?? null;
      setSession(currentSession);
      setUser(currentUser);

      if (currentUser) {
        await fetchUserProfile(currentUser.id);
      }

      setLoading(false);
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        const currentUser = newSession?.user ?? null;
        setSession(newSession);
        setUser(currentUser);

        if (currentUser) {
          await fetchUserProfile(currentUser.id);
        } else {
          setProfile(null);
        }
      }
    );

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  return { user, session, profile, loading };
};
