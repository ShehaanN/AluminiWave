import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const getSupabaseClient = () => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false },
  });
};

interface AlumniProfile {
  id: string;
  skills_expertise?: string[];
  industries_of_interest?: string[];
}

interface JobPosting {
  id: string;
  job_title: string;
  company_name: string;
  location: string;

  key_skills: string[];
  industry: string;
  description: string;
  salary_range_min: number;
  salary_range_max: number;
  job_type: string;
  created_at: string;
  is_active: boolean;
}

interface JobRecommendation extends JobPosting {
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
    const { alumni_user_id } = await req.json();

    if (!alumni_user_id) {
      return new Response(
        JSON.stringify({ error: "Alumni user ID is required." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 1. Fetch alumni profile
    const { data: alumniData, error: alumniError } = await supabase
      .from("profiles")
      .select("id, skills_expertise, industries_of_interest")
      .eq("id", alumni_user_id)
      .single();

    if (alumniError || !alumniData) {
      console.error("Alumni profile fetch error:", alumniError);
      return new Response(
        JSON.stringify({ error: "Alumni profile not found." }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const alumni = alumniData as AlumniProfile;

    // 2. Fetch active job postings
    const { data: jobsData, error: jobsError } = await supabase
      .from("jobs")
      .select("*, created_at")
      .eq("is_active", true);

    if (jobsError || !jobsData) {
      console.error("Jobs fetch error:", jobsError);
      return new Response(
        JSON.stringify({ error: "Could not fetch job postings." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const jobList = jobsData as JobPosting[];

    // 3. Calculate Match Scores
    const recommendations: JobRecommendation[] = [];
    for (const job of jobList) {
      let earnedPoints = 0;
      const reasons: string[] = [];

      // Calculate total possible points
      const maxPoints = {
        skills: (alumni.skills_expertise?.length || 0) * 3,
        industry: 2,
      };

      const totalPossiblePoints = maxPoints.skills + maxPoints.industry;

      // Match skills
      const alumniSkills = new Set(
        (alumni.skills_expertise || []).map((s) => s.toLowerCase())
      );
      (job.key_skills || []).forEach((skill) => {
        if (alumniSkills.has(skill.toLowerCase())) {
          earnedPoints += 3;
          reasons.push(`Matching skill: ${skill}`);
        }
      });

      // Match industry
      if (alumni.industries_of_interest?.includes(job.industry)) {
        earnedPoints += 2;
        reasons.push(`Matching industry: ${job.industry}`);
      }

      // Calculate percentage score (0-100)
      const percentageScore =
        totalPossiblePoints > 0
          ? Math.min(
              100,
              Math.round((earnedPoints / totalPossiblePoints) * 100)
            )
          : 0;

      if (percentageScore > 0) {
        recommendations.push({
          ...job,
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
    console.error("Error in recommend-jobs function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
});
