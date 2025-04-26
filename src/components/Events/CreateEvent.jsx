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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import MultiSelect from "./MultiSelect";

const CreateEvent = () => {
  return (
    <div>
      <div className=" min-h-screen flex">
        <div className="flex-1  ml-0 bg-gray-50">
          <div className="p-10">
            <div className="flex justify-center mx-auto p-5">
              <Card className="w-[650px] p-8">
                <CardHeader>
                  <CardTitle className="text-2xl">Create New Event</CardTitle>
                  {/* <CardDescription>
                    Deploy your new project in one-click.
                  </CardDescription> */}
                </CardHeader>
                <CardContent>
                  <form>
                    <div className="grid w-full items-center gap-3 ">
                      <div className="flex flex-col space-y-1.5">
                        <Label className="text-lg mb-1" htmlFor="title">
                          Event Title
                        </Label>
                        <Input
                          id="title"
                          className="h-10"
                          placeholder="Title of your event"
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label className="text-lg mb-1" htmlFor="date">
                          Event Date
                        </Label>
                        <Input id="date" type="date" className="h-10" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label className="text-lg mb-1" htmlFor="time">
                          Time Slot
                        </Label>
                        <Input
                          id="time"
                          type="time"
                          className="h-10"
                          placeholder="Name of your project"
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label className="text-lg mb-1" htmlFor="location">
                          Location
                        </Label>
                        <Input
                          id="location"
                          className="h-10"
                          placeholder="Name of your project"
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label className="text-lg mb-1" htmlFor="description">
                          Description
                        </Label>
                        <Textarea
                          placeholder="Type your message here."
                          id="description"
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label className="text-lg mb-1" htmlFor="speakers">
                          Featured Speakers
                        </Label>
                        <MultiSelect />
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button className="bg-custom text-white px-7 py-5">
                    Submit
                  </Button>
                  <Button className="  px-7 py-5" variant="outline">
                    Cancel
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
