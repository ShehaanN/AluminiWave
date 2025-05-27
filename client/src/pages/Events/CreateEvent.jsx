// CreateEvent.jsx
import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { getUserData, createEvent } from "../../services/dataService";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    event_date: "",
    time_slot_start: "",
    location: "",
    description: "",
    bannerFile: null,
    status: "upcoming",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const userData = await getUserData();
        if (!userData?.session?.user?.id) {
          throw new Error("No user session found");
        }

        setUser({
          ...userData,
          userId: userData.session.user.id,
        });

        if (!userData || userData.profile?.role !== "alumni") {
          navigate("/events");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        navigate("/events");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);
  const handleChange = (e) => {
    const { id, value, files, type } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, bannerFile: files ? files[0] : null }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.userId) {
      setError("You must be logged in to create an event.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      let banner_image_url = null;
      if (formData.bannerFile) {
        const file = formData.bannerFile;

        const fileName = `banners/${
          user.userId
        }/${Date.now()}_${file.name.replace(/\s+/g, "_")}`;

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

        if (uploadError) {
          console.error("Upload error:", uploadError);
          throw new Error("Failed to upload image");
        }

        // Get the public URL
        const { data: publicUrlData } = supabase.storage
          .from("event-banners")
          .getPublicUrl(uploadData.path);

        banner_image_url = publicUrlData.publicUrl;
      }

      const eventToInsert = {
        title: formData.title,
        event_date: formData.event_date,
        time_slot_start: formData.time_slot_start || null,
        location: formData.location,
        description: formData.description,
        banner_image_url: banner_image_url,
        created_by_user_id: user.userId,
        status: formData.status,
      };

      const insertedEvent = await createEvent(eventToInsert);

      if (!insertedEvent) {
        throw new Error("Failed to create event");
      }

      setMessage("Event created successfully!");
      setFormData({
        title: "",
        event_date: "",
        time_slot_start: "",
        location: "",
        description: "",
        bannerFile: null,
        status: "upcoming",
      });

      setTimeout(() => navigate(`/events/${insertedEvent.id}`), 1500);
    } catch (error) {
      console.error("Error:", error);
      setError(`Failed to create event: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex justify-center items-start pt-10 bg-gray-50">
      <Card className="w-full max-w-2xl p-6 md:p-8">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-semibold">
            Create New Event
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <p className="mb-4 text-red-600 bg-red-100 p-3 rounded-md">
              {error}
            </p>
          )}
          {message && (
            <p className="mb-4 text-green-600 bg-green-100 p-3 rounded-md">
              {message}
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label className="text-base mb-1" htmlFor="title">
                  Event Title
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="h-10"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label className="text-base mb-1" htmlFor="event_date">
                  Event Date
                </Label>
                <Input
                  id="event_date"
                  type="date"
                  value={formData.event_date}
                  onChange={handleChange}
                  required
                  className="h-10"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label className="text-base mb-1" htmlFor="time_slot_start">
                  Start Time
                </Label>
                <Input
                  id="time_slot_start"
                  type="time"
                  value={formData.time_slot_start}
                  onChange={handleChange}
                  required
                  className="h-10"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label className="text-base mb-1" htmlFor="location">
                  Location
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="h-10"
                  placeholder="e.g., Main Hall or Virtual"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label className="text-base mb-1" htmlFor="description">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  placeholder="Detailed information about the event..."
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label className="text-base mb-1" htmlFor="bannerFile">
                  Event Banner (Optional)
                </Label>
                <Input
                  id="bannerFile"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="h-auto p-2"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label className="text-base mb-1" htmlFor="status">
                  Status
                </Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="border p-2 w-full text-sm h-10 rounded-md text-gray-600 border-gray-300"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
            <CardFooter className="flex flex-col sm:flex-row justify-end mt-6 gap-3 p-0 pt-6">
              <Link to="/events" className="w-full sm:w-auto">
                <Button type="button" className="w-full" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                className="w-full sm:w-auto bg-[#269EB2] text-white hover:bg-[#1e7a8a]"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Creating..." : "Create Event"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateEvent;
