import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";
import MultiSelect from "../Events/MultiSelect";
import { Link } from "react-router-dom";

const PostJob = () => {
  return (
    <div>
      <div className=" min-h-screen flex">
        <div className="flex-1  ml-0 bg-gray-50">
          <div className="p-10">
            <div className="flex justify-center mx-auto p-5">
              <Card className="w-[650px] p-8">
                <CardHeader>
                  <CardTitle className="text-2xl">Job Posting</CardTitle>
                  {/* <CardDescription>
                        Deploy your new project in one-click.
                      </CardDescription> */}
                </CardHeader>
                <CardContent>
                  <form>
                    <div className="grid w-full items-center gap-3 ">
                      <div className="flex flex-col space-y-1.5">
                        <Label className="text-lg mb-1" htmlFor="title">
                          Job Title
                        </Label>
                        <Input
                          id="title"
                          className="h-10"
                          placeholder="Job Position"
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label className="text-lg mb-1" htmlFor="time">
                          Company
                        </Label>

                        <div className="flex flex-row justify-between gap-4">
                          <Input
                            id="jobtitle"
                            type="text"
                            className="h-10"
                            placeholder="Company"
                          />
                          <Input
                            id="company"
                            type="text"
                            className="h-10"
                            placeholder="Location"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <Label className="text-lg mb-1" htmlFor="qualification">
                          Qualification
                        </Label>
                        <Input
                          id="qualification"
                          type="text"
                          className="h-10"
                          placeholder="Qualification"
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label className="text-lg mb-1" htmlFor="salary">
                          Salary
                        </Label>
                        <Input
                          id="salary"
                          type="text"
                          className="h-10"
                          placeholder="salary"
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label className="text-lg mb-1" htmlFor="description">
                          Description
                        </Label>
                        <Textarea placeholder="Description" id="description" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label className="text-lg mb-1" htmlFor="keyskills">
                          Key Skills
                        </Label>
                        <Input
                          id="keyskills"
                          type="text"
                          className="h-10"
                          placeholder="Key skills"
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label className="text-lg mb-1" htmlFor="refemail">
                          Reference Email
                        </Label>
                        <Input
                          id="refemail"
                          type="email"
                          className="h-10"
                          placeholder="Reference Email"
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label
                          className="text-lg mb-1"
                          htmlFor="lastdaytoapply"
                        >
                          Last Date to Apply
                        </Label>
                        <Input
                          id="lastdaytoapply"
                          type="text"
                          className="h-10"
                          placeholder="Due Date"
                        />
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <Label className="text-lg mb-1" htmlFor="industry">
                          Industry
                        </Label>
                        <MultiSelect />
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Link to="/jobPortal">
                    <Button className="bg-[#269EB2] text-white px-7 py-5">
                      Post
                    </Button>
                  </Link>
                  <Link to="/jobPortal">
                    <Button className="  px-7 py-5" variant="outline">
                      Cancel
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
