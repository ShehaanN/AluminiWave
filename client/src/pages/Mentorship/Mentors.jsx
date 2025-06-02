import { Link } from "react-router-dom";
import sara from "../../assets/sara.png";
import mdp from "../../assets/mdp.jpg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { fetchAlumniMentors } from "../../services/dataService";

const Mentors = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewProfileDialog, setViewProfileDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    loadMentors();
  }, []);

  const loadMentors = async () => {
    try {
      setLoading(true);
      const data = await fetchAlumniMentors();
      console.log("Fetched mentors:", data);
      setMentors(data);
    } catch (err) {
      console.error("Error loading mentors:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex ">
      <main className="flex-1  px-32 py-4 bg-purple-50">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Mentors</h1>
            <div className="flex flex-wrap md:flex-nowrap space-x-0 md:space-x-4 space-y-2 md:space-y-0 w-full md:w-auto">
              <Link to="/mentorship">
                <button className="px-6 py-2 bg-[#269EB2] text-white rounded-lg w-full md:w-auto min-h-[44px]">
                  <i class="fa-solid fa-backward mr-2"></i>Back
                </button>
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-1 grid-cols-1 gap-6">
            <div className="bg-gray-50 min-h-screen rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Mentor List</h2>
              </div>

              {/* User Table */}
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[60px]">Avatar</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Skills</TableHead>

                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-4">
                            Loading mentors...
                          </TableCell>
                        </TableRow>
                      ) : error ? (
                        <TableRow>
                          <TableCell
                            colSpan={6}
                            className="text-center py-4 text-red-500"
                          >
                            {error}
                          </TableCell>
                        </TableRow>
                      ) : mentors.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-4">
                            No mentors found
                          </TableCell>
                        </TableRow>
                      ) : (
                        mentors.map((mentor) => (
                          <TableRow key={mentor.id}>
                            <TableCell>
                              <Avatar>
                                <AvatarImage
                                  src={mentor.profile_photo_url || mdp}
                                  alt={mentor.full_name}
                                />
                                <AvatarFallback>
                                  {mentor.full_name?.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                            </TableCell>
                            <TableCell className="font-medium">
                              {mentor.full_name}
                            </TableCell>
                            <TableCell>{mentor.current_job_title}</TableCell>
                            <TableCell>{mentor.current_company}</TableCell>
                            <TableCell>
                              {mentor.skills_expertise &&
                                mentor.skills_expertise.map((skill) => (
                                  <Badge
                                    variant="outline"
                                    key={skill}
                                    className="mr-2"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="!rounded-button whitespace-nowrap cursor-pointer text-blue-600 border-blue-600 hover:bg-blue-50"
                                  onClick={() => {
                                    setSelectedUser(mentor);
                                    setViewProfileDialog(true);
                                  }}
                                >
                                  <i className="fas fa-eye"></i>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* View Profile Dialog */}
      <Dialog open={viewProfileDialog} onOpenChange={setViewProfileDialog}>
        <DialogContent className="min-w-5xl top-[85%] left-[77%]">
          <DialogHeader>
            <DialogTitle>Mentor Profile</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-start space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={selectedUser.profile_photo_url || mdp}
                    alt={selectedUser.full_name}
                  />
                  <AvatarFallback>
                    {selectedUser.full_name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="text-2xl font-semibold">
                    {selectedUser.full_name}
                  </h3>
                  <p className="text-gray-500">
                    {selectedUser.current_job_title} at{" "}
                    {selectedUser.current_company}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Professional Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-gray-600 leading-relaxed">
                      {selectedUser.profile_summary}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Skills & Expertise
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedUser.skills_expertise?.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-purple-100 text-[#415B68] rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Experience Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex  space-x-4">
                      <i className="fas fa-briefcase text-green-500 mt-1.5"></i>
                      <div>
                        <div className="flex">
                          <div>
                            <h3 className="font-semibold">
                              {selectedUser.current_company}{" "}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {selectedUser.current_job_title}
                            </p>
                            <p className="text-sm text-gray-500">2017 - 2020</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              className="!rounded-button whitespace-nowrap"
              onClick={() => setViewProfileDialog(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Mentors;
