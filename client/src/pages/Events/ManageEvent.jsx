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

const ManageEvent = () => {
  const events = [
    {
      id: 1,
      title: "Event 1",
      date: "2024-06-15",
      time: "10:00 AM - 12:00 PM",
      location: "San Francisco, CA",
      description: "Description of Event 1",
    },
    {
      id: 2,
      title: "Event 2",
      date: "2024-07-20",
      time: "2:00 PM - 4:00 PM",
      location: "New York, NY",
      description: "Description of Event 2",
    },
    {
      id: 3,
      title: "Event 3",
      date: "2024-08-10",
      time: "1:00 PM - 3:00 PM",
      location: "Los Angeles, CA",
      description: "Description of Event 3",
    },
  ];

  return (
    <div className="min-h-screen flex ">
      <main className="flex-1  px-32 py-4 bg-purple-50">
        <div className="p-6">
          {/* -------------------- */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Manage Events</h1>
            <div className="flex flex-wrap md:flex-nowrap space-x-0 md:space-x-4 space-y-2 md:space-y-0 w-full md:w-auto">
              <Link to="/events">
                <button className="px-6 py-2 bg-[#269EB2] text-white rounded-lg w-full md:w-auto min-h-[44px]">
                  <i class="fa-solid fa-backward mr-2"></i>Back
                </button>
              </Link>
            </div>
          </div>
          {/* ---------------- */}
          <div className="grid md:grid-cols-1 grid-cols-1 gap-6">
            <div className="bg-white min-h-screen rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Event List</h2>
              </div>
              <div className="p-8 px-10">
                <div className="overflow-x-auto ">
                  <Table className="w-full ">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-bold text-[17px]">
                          # Banner
                        </TableHead>
                        <TableHead className="font-bold text-[17px]">
                          Event Title
                        </TableHead>
                        <TableHead className="font-bold text-[17px]">
                          Date
                        </TableHead>
                        <TableHead className="font-bold text-[17px]">
                          Time Slot
                        </TableHead>
                        <TableHead className="font-bold text-[17px]">
                          Location
                        </TableHead>
                        <TableHead className="font-bold text-[17px]">
                          Description
                        </TableHead>
                        <TableHead className="flex items-center justify-end mr-24 text-[17px] ">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {events.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell>
                            <img
                              src={dp}
                              alt="Poster"
                              width={80}
                              height={160}
                              className="w-20 h-auto aspect-auto brightness-90 transition-transform duration-300 hover:brightness-105 hover:scale-105 hover:shadow-lg"
                              priority
                            />
                          </TableCell>
                          <TableCell>{event.title} </TableCell>
                          <TableCell>{event.date} </TableCell>
                          <TableCell>{event.time} </TableCell>
                          <TableCell>{event.location} </TableCell>
                          <TableCell className="w-[320px]">
                            {event.description}
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-end gap-3">
                              <div>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      size="sm"
                                      className="min-w-[65px] bg-blue-400 text-black"
                                    >
                                      Edit
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className=" max-w-[455px] min-w-[600px]">
                                    <DialogHeader>
                                      <DialogTitle>Edit Event</DialogTitle>
                                      <DialogDescription>
                                        Click save when you're done.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                          htmlFor="name"
                                          className="text-right"
                                        >
                                          Event Banner
                                        </Label>
                                        <Input
                                          id="name"
                                          type="file"
                                          value=""
                                          className="col-span-3"
                                        />
                                      </div>
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                          htmlFor="name"
                                          className="text-right"
                                        >
                                          Event Title
                                        </Label>
                                        <Input
                                          id="name"
                                          value=""
                                          className="col-span-3"
                                        />
                                      </div>
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                          htmlFor="name"
                                          className="text-right"
                                        >
                                          Event Date
                                        </Label>
                                        <Input
                                          id="name"
                                          type="date"
                                          value=""
                                          className="col-span-3"
                                        />
                                      </div>
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                          htmlFor="name"
                                          className="text-right"
                                        >
                                          Time Slot
                                        </Label>
                                        <Input
                                          id="name"
                                          type="time"
                                          value=""
                                          className="col-span-3"
                                        />
                                      </div>
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                          htmlFor="contactno"
                                          className="text-right"
                                        >
                                          Location
                                        </Label>
                                        <Input
                                          id="contactno"
                                          value=""
                                          className="col-span-3"
                                        />
                                      </div>
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                          className="text-right"
                                          htmlFor="description"
                                        >
                                          Description
                                        </Label>
                                        <Textarea
                                          placeholder="Type your message here."
                                          id="description"
                                          className="col-span-3"
                                        />
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <Button
                                        className="bg-[#269EB2] text-white"
                                        type="submit"
                                      >
                                        Save
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </div>
                              <Button
                                size="sm"
                                className="min-w-[65px] bg-red-400 text-black"
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
        </div>
      </main>
    </div>
  );
};

export default ManageEvent;
