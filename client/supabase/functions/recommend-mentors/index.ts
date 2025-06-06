import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const getSupabaseClient = () => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false },
  });
};

interface StudentProfile {
  id: string;
  skills_expertise?: string[];
  industries_of_interest?: string[];
}

interface AlumniProfile {
  id: string;
  full_name?: string;
  profile_photo_url?: string;
  skills_expertise?: string[];
  industries_of_interest?: string[];
  current_job_title?: string;
  current_company?: string;
}

interface Recommendation extends AlumniProfile {
  match_score: number;
  match_reasons: string[];
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    const supabase = getSupabaseClient();
    const { student_user_id } = await req.json();

    if (!student_user_id) {
      return new Response(
        JSON.stringify({ error: "Student user ID is required." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 1. Fetch student profile
    const { data: studentProfileData, error: studentError } = await supabase
      .from("profiles")
      .select("id, skills_expertise, industries_of_interest")
      .eq("id", student_user_id)
      .single();

    if (studentError || !studentProfileData) {
      console.error("Student profile fetch error:", studentError);
      return new Response(
        JSON.stringify({ error: "Student profile not found." }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const student = studentProfileData as StudentProfile;

    // 2. Fetch alumni profiles
    const { data: alumniProfilesData, error: alumniError } = await supabase
      .from("profiles")
      .select(
        "id, full_name, profile_photo_url, skills_expertise, industries_of_interest, current_job_title, current_company,profile_summary"
      )
      .eq("role", "alumni")
      .eq("is_superadmin", false)
      .neq("id", student_user_id);

    if (alumniError || !alumniProfilesData) {
      console.error("Alumni profiles fetch error:", alumniError);
      return new Response(
        JSON.stringify({ error: "Could not fetch alumni profiles." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const alumniList = alumniProfilesData as AlumniProfile[];

    // 3. Calculate Match Scores and Reasons
    const recommendations: Recommendation[] = [];
    for (const alumni of alumniList) {
      let score = 0;
      const reasons: string[] = [];

      // Calculate maximum possible score
      const maxScore = {
        skills: student.skills_expertise
          ? student.skills_expertise.length * 3
          : 0,
        industries: student.industries_of_interest
          ? student.industries_of_interest.length * 2
          : 0,
      };
      const totalMaxScore = maxScore.skills + maxScore.industries;

      // Match skills (case-insensitive for robustness)
      const studentSkillsLower = (student.skills_expertise || []).map((s) =>
        s.toLowerCase()
      );
      (alumni.skills_expertise || []).forEach((skill) => {
        if (studentSkillsLower.includes(skill.toLowerCase())) {
          score += 3; // Higher weight for skills
          reasons.push(`Shared skill: ${skill}`);
        }
      });

      // Match industries
      const studentIndustriesLower = (student.industries_of_interest || []).map(
        (i) => i.toLowerCase()
      );
      (alumni.industries_of_interest || []).forEach((industry) => {
        if (studentIndustriesLower.includes(industry.toLowerCase())) {
          score += 2;
          reasons.push(`Shared industry interest: ${industry}`);
        }
      });

      // Calculate percentage score (0-100)
      const percentageScore =
        totalMaxScore > 0
          ? Math.min(100, Math.round((score / totalMaxScore) * 100))
          : 0;

      // Only include matches with some similarity
      if (percentageScore > 0) {
        recommendations.push({
          ...alumni,
          match_score: percentageScore,
          match_reasons: reasons,
        });
      }
    }

    // 4. Sort and return top recommendations
    const sortedRecommendations = recommendations
      .sort((a, b) => b.match_score - a.match_score)
      .slice(0, 10);

    return new Response(
      JSON.stringify({ recommendations: sortedRecommendations }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("Error in recommend-mentors function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
});
