import dp from "./../../assets/mdp.jpg";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
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
import { useEffect, useState } from "react";
import {
  fetchEvents,
  deleteEvent,
  updateEvent,
} from "../../services/dataService";

const ManageEvent = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: "",
    event_date: "",
    time_slot_start: "",
    location: "",
    description: "",
  });

  const [error, setError] = useState(null);

  // Fetch events
  useEffect(() => {
    const loadEvents = async () => {
      const eventData = await fetchEvents();
      setEvents(eventData);
    };
    loadEvents();
  }, []);

  // Handle edit event
  const handleEditClick = (event) => {
    setSelectedEvent(event);
    setEditFormData({
      title: event.title,
      event_date: event.event_date,
      time_slot_start: event.time_slot_start,
      location: event.location,
      description: event.description,
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle delete event
  const handleDelete = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      const success = await deleteEvent(eventId);
      if (success) {
        setEvents(events.filter((event) => event.id !== eventId));
      }
    }
  };

  // Handle edit form submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Format the data before sending
      const updatedEventData = {
        ...editFormData,
        updated_at: new Date().toISOString(),
      };

      const updatedEvent = await updateEvent(
        selectedEvent.id,
        updatedEventData
      );

      if (updatedEvent) {
        // Update the local events state with the new data
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === selectedEvent.id ? updatedEvent : event
          )
        );

        // Show success message (if you have a toast/notification system)
        alert("Event updated successfully!");

        // Close the dialog
        setSelectedEvent(null);
      } else {
        throw new Error("Failed to update event");
      }
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update event: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex">
      <main className="flex-1 px-32 py-4 bg-purple-50">
        {/* ...existing header code... */}

        <div className="grid md:grid-cols-1 grid-cols-1 gap-6">
          <div className="bg-white min-h-screen rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Event List</h2>
              <Link to="/events">
                <button className="px-6 py-2 bg-[#269EB2] text-white rounded-lg w-full md:w-auto min-h-[44px]">
                  <i class="fa-solid fa-backward mr-2"></i>Back
                </button>
              </Link>
            </div>
            <div className="p-8 px-10">
              <div className="overflow-x-auto">
                <Table className="w-full">
                  {/* ...existing table header... */}

                  {error && (
                    <div className="text-red-500 text-sm mt-2">{error}</div>
                  )}
                  <TableBody>
                    {events.map((event) => (
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
                        <TableCell>{event.title}</TableCell>
                        <TableCell>{event.event_date}</TableCell>
                        <TableCell>{event.time_slot_start}</TableCell>
                        <TableCell>{event.location}</TableCell>
                        <TableCell className="w-[320px]">
                          {event.description}
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-3">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  className="min-w-[65px] bg-blue-400 text-black"
                                  onClick={() => handleEditClick(event)}
                                >
                                  Edit
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-[455px] min-w-[600px]">
                                <DialogHeader>
                                  <DialogTitle>Edit Event</DialogTitle>
                                  <DialogDescription>
                                    Make changes to your event here.
                                  </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleEditSubmit}>
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label
                                        htmlFor="title"
                                        className="text-right"
                                      >
                                        Title
                                      </Label>
                                      <Input
                                        id="title"
                                        value={editFormData.title || ""}
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                        required
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label
                                        htmlFor="event_date"
                                        className="text-right"
                                      >
                                        Event Date
                                      </Label>
                                      <Input
                                        id="event_date"
                                        type="date"
                                        value={editFormData.event_date}
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label
                                        htmlFor="time_slot_start"
                                        className="text-right"
                                      >
                                        Time Slot
                                      </Label>
                                      <Input
                                        id="time_slot_start"
                                        type="time"
                                        value={editFormData.time_slot_start}
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label
                                        htmlFor="location"
                                        className="text-right"
                                      >
                                        Location
                                      </Label>
                                      <Input
                                        id="location"
                                        value={editFormData.location}
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label
                                        htmlFor="description"
                                        className="text-right"
                                      >
                                        Description
                                      </Label>
                                      <Textarea
                                        id="description"
                                        value={editFormData.description}
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                      />
                                    </div>
                                    {/* Add similar updates for other fields */}
                                  </div>
                                  <DialogFooter>
                                    <Button
                                      type="submit"
                                      disabled={loading}
                                      className="bg-[#269EB2] text-white"
                                    >
                                      {loading ? "Saving..." : "Save changes"}
                                    </Button>
                                  </DialogFooter>
                                </form>
                              </DialogContent>
                            </Dialog>
                            <Button
                              size="sm"
                              className="min-w-[65px] bg-red-400 text-black"
                              onClick={() => handleDelete(event.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManageEvent;
