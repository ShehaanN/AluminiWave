import { useState } from "react";
import "../Register/Register.css";
import Progress from "./Progress";
import { Personal, Signup, Sociallinks } from "./Form";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

// const Register = () => {
//   return (
//     <div>
//       <Multi />
//     </div>
//   );
// };

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [createdUser, setCreatedUser] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Step 1
    email: "",
    password: "",
    confirmPassword: "",
    role: "alumni",
    acceptTerms: false,
    // Step 2

    fullName: "",
    gender: "Male",
    dateOfBirth: "",
    graduationYear: "",
    course: "",
    institute: "",
    currentJobTitle: "",
    currentCompany: "",
    locationCityCountry: "",
    // Step 3
    industriesOfInterest: [],

    skillsExpertise: [],
  });
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const parseLocation = (locationStr) => {
    if (!locationStr) return { city: null, country: null };
    const parts = locationStr.split(",").map((part) => part.trim());
    return {
      city: parts[0] || null,
      country: parts[1] || null,
    };
  };

  console.log(supabase.auth.getUser());

  function handlePrev() {
    if (step > 1) setStep((step) => step - 1);
  }
  //

  const handleNextOrSubmit = async () => {
    setError("");
    setMessage("");

    if (step === 1) {
      // --- Step 1 Submission: Account Creation & Initial Profile Insert ---
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (!formData.acceptTerms) {
        setError("You must accept the terms and conditions.");
        return;
      }
      setLoading(true);

      // 1. Sign up the user with Supabase Auth
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,

          options: { data: { role: formData.role } },
        });

      if (signUpError) {
        setError(`Registration Error: ${signUpError.message}`);
        setLoading(false);
        return;
      }

      // Check if user object exists after sign up
      if (!signUpData.user) {
        setMessage(
          "Account created! Please check your email to confirm your registration. " +
            "Once confirmed, you may need to log in to complete your profile."
        );
        setLoading(false);

        if (!signUpData.user && !signUpData.session) {
          setMessage(
            "Account created! Please check your email to confirm your registration and then complete your profile by logging in."
          );
          setLoading(false);
          // Potentially clear form or navigate to login.
          return;
        }
      }

      setCreatedUser(signUpData.user); // Store the user object

      // 2. Manually insert into the 'profiles' table

      const initialProfileData = {
        id: signUpData.user.id,
        email: signUpData.user.email,
        role: formData.role,
        full_name: formData.fullName,
      };

      const { error: profileInsertError } = await supabase
        .from("profiles")
        .insert([initialProfileData]); // insert takes an array of objects

      if (profileInsertError) {
        setError(
          `Profile Creation Error: ${profileInsertError.message}. ` +
            `Your account was created, but profile setup failed. Please contact support or try logging in to complete.`
        );

        setLoading(false);
        return;
      }

      // If both signUp and profileInsert are successful:
      setLoading(false);
      setMessage("Account created! Please complete your profile.");
      setStep(2); // Proceed to the next step of your form
    } else if (step === 2) {
      // --- Step 2 Submission: Basic Profile Information (UPDATE) ---
      if (!createdUser || !createdUser.id) {
        // Ensure createdUser and its id are available
        setError(
          "User session not found or invalid. Please start over from Step 1."
        );
        setStep(1);
        return;
      }
      setLoading(true);

      const location = parseLocation(formData.locationCityCountry);
      const profileUpdates = {
        full_name: formData.fullName,
        gender: formData.gender,
        date_of_birth: formData.dateOfBirth || null,
        graduation_year: formData.graduationYear
          ? parseInt(formData.graduationYear)
          : null,
        course: formData.course,
        institute: formData.institute,
        current_job_title: formData.currentJobTitle,
        current_company: formData.currentCompany,
        location_city: location.city,
        location_country: location.country,
      };

      const { error: profileUpdateError } = await supabase
        .from("profiles")
        .update(profileUpdates)
        .eq("id", createdUser.id); // Use the ID from the signed-up user
      setLoading(false);

      if (profileUpdateError) {
        setError(`Profile Update Error: ${profileUpdateError.message}`);
      } else {
        setMessage("Basic information saved.");
        setStep(3);
      }
    } // In the handleNextOrSubmit function, modify the step 3 submission:
    else if (step === 3) {
      if (!createdUser || !createdUser.id) {
        setError(
          "User session not found or invalid. Please start over from Step 1."
        );
        setStep(1);
        return;
      }

      try {
        setLoading(true);

        const finalProfileUpdates = {
          industries_of_interest: formData.industriesOfInterest,
          skills_expertise: formData.skillsExpertise,
          onboarded: true,
        };

        // console.log("User ID:", createdUser.id);
        // console.log("Updating profile with:", finalProfileUpdates);

        // Update the profile
        const { error: updateError } = await supabase
          .from("profiles")
          .update(finalProfileUpdates)
          .eq("id", createdUser.id)
          .single();

        if (updateError) {
          console.error("Profile update error:", updateError);
          throw updateError;
        }

        // Verify the update
        const { data: verifyData, error: verifyError } = await supabase
          .from("profiles")
          .select("industries_of_interest, skills_expertise, onboarded")
          .eq("id", createdUser.id)
          .single();

        if (verifyError) {
          console.error("Verification error:", verifyError);
          throw verifyError;
        }

        console.log("Updated profile:", verifyData);

        setMessage("Registration complete! Welcome to AluminiWave.");

        // Navigate after successful update
        navigate("/dashboard");
      } catch (error) {
        console.error("Error in step 3:", error);
        setError(`Registration Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const RenderSteps = () => {
    console.log(formData);

    switch (step) {
      case 1:
        return <Personal formData={formData} setFormData={setFormData} />;
      case 2:
        return <Signup formData={formData} setFormData={setFormData} />;
      case 3:
        return <Sociallinks formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };
  // -----------------------------------

  //---------------------------------------

  return (
    <div className="bg-gray-100 min-h-screen font-['Inter'] ">
      <div className="bg-cyan-700">
        <div className="max-w-8xl mx-auto px-4 py-8 ">
          <img src={logo} alt="AluminiWave" className="h-18 " />
          <div className="text-white mt-8 text-center">
            <h1 className="text-4xl font-bold">Join Our Alumni Network</h1>
            <p className="mt-4 mb-2 text-lg opacity-90">
              Connect, Share, and Grow with Fellow Graduates
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 -mt-6 container ">
        <div className="flex justify-center  ">
          <div className="progress_container">
            <Progress totalSteps={totalSteps} step={step} />
            <div className={`${step >= 1 ? "circle active" : "circle"}`}>1</div>
            <div className={`${step >= 2 ? "circle active" : "circle"}`}>2</div>
            <div className={`${step >= 3 ? "circle active" : "circle"}`}>3</div>
          </div>
        </div>
        {/* Display Messages/Errors */}
        {message && !error && (
          <div className="text-center text-green-600 my-4">{message}</div>
        )}
        {error && <div className="text-center text-red-600 my-4">{error}</div>}
        <div className="content flex justify-center">{RenderSteps()}</div>
        // Replace the buttons div near the bottom of the file:
        <div className="btns">
          <button
            onClick={handlePrev}
            disabled={step <= 1 || loading}
            className={`${step <= 1 ? "btn disabled" : "btn"}`}
          >
            Prev
          </button>
          <button
            onClick={handleNextOrSubmit}
            disabled={loading}
            className="btn"
          >
            {loading
              ? "Processing..."
              : step === totalSteps
              ? "Save & Register"
              : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
