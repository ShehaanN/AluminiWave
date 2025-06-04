import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import MultiSelect from "../Events/MultiSelect";
import { getUserData } from "../../services/dataService";

const Settings = () => {
  const [activeViewTab, setActiveViewTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [formData, setFormData] = useState({
    profile_summary: "",

    skillsExpertise: [],
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
  });

  const [passwordForm, setPasswordForm] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        setLoading(true);
        const userData = await getUserData();

        if (!userData || !userData.profile) {
          throw new Error("Could not load profile data");
        }

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError) throw userError;

        setPasswordForm((prev) => ({
          ...prev,
          email: user.email,
        }));

        setSelectedUser(userData.profile);
        setFormData({
          profile_summary: userData.profile.profile_summary || "",
          skillsExpertise: userData.profile.skills_expertise || [],
          fullName: userData.profile.full_name || "",
          gender: userData.profile.gender || "",
          dob: userData.profile.date_of_birth || "",
          city: userData.profile.location_city || "",
          country: userData.profile.location_country || "",
          passoutYear: userData.profile.graduation_year || "",
          jobPosition: userData.profile.current_job_title || "",
          company: userData.profile.current_company || "",
          course: userData.profile.course || "",
          institute: userData.profile.institute || "",
        });
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    };

    const loadData = async () => {
      try {
        const userData = await getUserData();
        if (userData) {
          setUserType(userData.profile.role);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
    loadUserProfile();
  }, []);

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setIsSubmitting(true);

    try {
      if (
        !passwordForm.currentPassword ||
        !passwordForm.newPassword ||
        !passwordForm.confirmPassword
      ) {
        throw new Error("All fields are required");
      }

      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        throw new Error("New passwords don't match");
      }

      if (passwordForm.newPassword.length < 6) {
        throw new Error("New password must be at least 6 characters long");
      }

      // Verify current password by trying to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: passwordForm.email,
        password: passwordForm.currentPassword,
      });

      if (signInError) {
        throw new Error("Current password is incorrect");
      }

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: passwordForm.newPassword,
      });

      if (updateError) throw updateError;

      // Clear form and show success
      setPasswordForm((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));

      alert("Password updated successfully!");
    } catch (error) {
      console.error("Password change error:", error);
      setPasswordError(error.message);
    } finally {
      setIsSubmitting(false);
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

  const handleskillsExpertiseChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFormData((prev) => ({
      ...prev,
      skillsExpertise: selectedValues,
    }));
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

  if (loading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div>
      <div className="min-h-screen flex">
        <main className="flex-1 ml-0 bg-gray-50">
          <div className="p-6 mt-9">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between">
                <h1 className="font-semibold text-3xl mb-8 text-gray-700">
                  Settings
                </h1>

                <Link to="/dashboard">
                  <button className="px-6 py-2 bg-[#7a999e] text-white rounded-lg w-full md:w-auto min-h-[44px]">
                    <i class="fa-solid fa-xmark mr-2"></i>
                    Cancel
                  </button>
                </Link>
              </div>

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
                                selectedOptions={formData.skillsExpertise}
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
                                              jobPosition: e.target.value,
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
                                  if (file && file.type.startsWith("image/")) {
                                    setFormData((prev) => ({
                                      ...prev,
                                      photo: file,
                                    }));
                                  } else {
                                    alert("Please select an image file");
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
                    <form onSubmit={handleChangePasswordSubmit}>
                      <div className="border-2 border-dashed w-full border-gray-300 rounded-lg p-4 space-y-2.5">
                        {passwordError && (
                          <div className="text-red-500 text-sm mb-4 p-2 bg-red-50 rounded">
                            {passwordError}
                          </div>
                        )}

                        <div className="flex flex-col space-y-1.5">
                          <Label className="text-md mb-1" htmlFor="email">
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={passwordForm.email}
                            className="h-10 w-1/2"
                            disabled
                          />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                          <Label className="text-md mb-1" htmlFor="currentpass">
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
                          />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                          <Label className="text-md mb-1" htmlFor="newpass">
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
                          />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                          <Label className="text-md mb-1" htmlFor="confirmpass">
                            Confirm new Password
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
                            {isSubmitting ? "Updating..." : "Reset Password"}
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
    </div>
  );
};

export default Settings;
