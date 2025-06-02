import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  fetchMentorshipRequests,
  scheduleSession,
} from "../../services/dataService";
import { supabase } from "../../supabaseClient";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import mdp from "../../assets/mdp.jpg";

const StuRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sessionForm, setSessionForm] = useState({
    date: "",
    time: "",
    platform: "Zoom",
    session_url: "",
    agenda_notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      setLoading(true);
      const data = await fetchMentorshipRequests();
      console.log("Fetched requests:", data);
      setRequests(data);
    } catch (err) {
      console.error("Error in fetchPendingRequests:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAction = async (requestId, status) => {
    try {
      const { error } = await supabase
        .from("mentorship_requests")
        .update({ status })
        .eq("id", requestId);

      if (error) throw error;

      setRequests((prev) => prev.filter((req) => req.id !== requestId));
      alert(`Request ${status} successfully`);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSessionFormSubmit = async (e, request) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setError(null);

      // Validate form
      if (
        !sessionForm.date ||
        !sessionForm.time ||
        !sessionForm.platform ||
        !sessionForm.session_url
      ) {
        throw new Error("Please fill in all required fields");
      }

      await scheduleSession(request.id, {
        ...sessionForm,
        student_user_id: request.student_user_id,
      });

      setRequests((prev) => prev.filter((req) => req.id !== request.id));
      alert("Session scheduled successfully!");
    } catch (err) {
      setError(err.message);
      console.error("Error scheduling session:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <main className="flex-1 px-32 py-4 bg-purple-50">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Requests for Mentorship</h1>
            <div className="flex flex-wrap md:flex-nowrap space-x-0 md:space-x-4 space-y-2 md:space-y-0 w-full md:w-auto">
              <Link to="/mentorship">
                <button className="px-6 py-2 bg-[#269EB2] text-white rounded-lg w-full md:w-auto min-h-[44px]">
                  <i className="fa-solid fa-backward mr-2"></i>Back
                </button>
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-1 grid-cols-1 gap-6">
            <div className="col-span-2">
              <div className="bg-white min-h-screen rounded-lg shadow p-6">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">
                      Available Requests
                    </h2>
                  </div>

                  {loading ? (
                    <div className="text-center py-4">Loading requests...</div>
                  ) : error ? (
                    <div className="text-red-500 text-center py-4">{error}</div>
                  ) : requests.length === 0 ? (
                    <div className="text-center py-4">
                      No pending mentorship requests
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      {requests.map((request) => (
                        <div
                          key={request.id}
                          className="bg-white p-6 rounded-lg border border-gray-200 shadow"
                        >
                          <div className="flex items-center mb-4">
                            <img
                              src={mdp}
                              className="w-10 h-10 rounded-full"
                              alt={request.student.full_name}
                            />
                            <div className="ml-3">
                              <h4 className="font-medium text-gray-900">
                                {request.student.full_name}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {request.student.course}
                              </p>
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 mb-4">
                            {request.request_message}
                          </p>

                          {request.areas_of_interest?.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {request.areas_of_interest.map((area, index) => (
                                <span
                                  key={index}
                                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                                >
                                  {area}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="flex gap-3">
                            {/* ----------------- */}
                            <Dialog>
                              <DialogTrigger asChild>
                                <button className="rounded-lg flex-1 bg-[#269EB2] text-white py-2 text-sm font-medium">
                                  Accept
                                </button>
                              </DialogTrigger>
                              <DialogContent className="max-w-[455px] min-w-[600px]">
                                <DialogHeader>
                                  <DialogTitle>Session Scheduling</DialogTitle>
                                  <DialogDescription>
                                    Session Details
                                  </DialogDescription>
                                </DialogHeader>

                                <form
                                  onSubmit={(e) =>
                                    handleSessionFormSubmit(e, request)
                                  }
                                >
                                  <div className="grid w-full items-center gap-3">
                                    <div className="flex flex-col space-y-1.5">
                                      <Label htmlFor="date">
                                        Available Date
                                      </Label>
                                      <Input
                                        id="date"
                                        type="date"
                                        className="h-10"
                                        value={sessionForm.date}
                                        onChange={(e) =>
                                          setSessionForm((prev) => ({
                                            ...prev,
                                            date: e.target.value,
                                          }))
                                        }
                                        required
                                      />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                      <Label htmlFor="time">Time Slot</Label>
                                      <Input
                                        id="time"
                                        type="time"
                                        className="h-10"
                                        value={sessionForm.time}
                                        onChange={(e) =>
                                          setSessionForm((prev) => ({
                                            ...prev,
                                            time: e.target.value,
                                          }))
                                        }
                                        required
                                      />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                      <Label htmlFor="platform">
                                        Select Platform
                                      </Label>
                                      <select
                                        id="platform"
                                        name="platform"
                                        className="border p-2 w-full h-10 rounded-md text-sm mt-2 text-gray-700 border-gray-400"
                                        value={sessionForm.platform}
                                        onChange={(e) =>
                                          setSessionForm((prev) => ({
                                            ...prev,
                                            platform: e.target.value,
                                          }))
                                        }
                                        required
                                      >
                                        <option value="Zoom">Zoom</option>
                                        <option value="MS Teams">
                                          MS Teams
                                        </option>
                                      </select>
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                      <Label htmlFor="session_url">
                                        Session URL
                                      </Label>
                                      <Input
                                        id="session_url"
                                        className="h-10"
                                        placeholder="Enter the session URL"
                                        value={sessionForm.session_url}
                                        onChange={(e) =>
                                          setSessionForm((prev) => ({
                                            ...prev,
                                            session_url: e.target.value,
                                          }))
                                        }
                                        required
                                      />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                      <Label htmlFor="agenda_notes">
                                        Session Agenda
                                      </Label>
                                      <Textarea
                                        placeholder="Type your agenda here..."
                                        id="agenda_notes"
                                        className="outline-none"
                                        value={sessionForm.agenda_notes}
                                        onChange={(e) =>
                                          setSessionForm((prev) => ({
                                            ...prev,
                                            agenda_notes: e.target.value,
                                          }))
                                        }
                                        required
                                      />
                                    </div>
                                  </div>

                                  {error && (
                                    <div className="text-red-500 text-sm mt-2">
                                      {error}
                                    </div>
                                  )}

                                  <DialogFooter className="mt-10">
                                    <Button
                                      type="submit"
                                      disabled={isSubmitting}
                                      className="bg-[#269EB2] text-white"
                                    >
                                      {isSubmitting
                                        ? "Scheduling..."
                                        : "Schedule Session"}
                                    </Button>
                                  </DialogFooter>
                                </form>
                              </DialogContent>
                            </Dialog>
                            {/* ----------------- */}
                            <button
                              onClick={() =>
                                handleRequestAction(request.id, "declined")
                              }
                              className="rounded-lg flex-1 border border-gray-200 text-gray-700 py-2 text-sm font-medium"
                            >
                              Decline
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StuRequests;
