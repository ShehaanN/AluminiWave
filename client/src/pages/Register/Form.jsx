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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export function Personal() {
  return (
    <Card className="w-[650px] p-8 border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">Account Creation</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-3 ">
            <div className="flex flex-col space-y-1.5">
              <Label className="text-lg mb-1" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                className="h-10"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="text-lg mb-1" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                className="h-10"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="text-lg mb-1" htmlFor="confirmpassword">
                Confirm Password
              </Label>
              <Input
                id="confirmpassword"
                type="password"
                placeholder="Confirm Password"
                className="h-10"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <label for="type">I am a</label>
              <select
                id="type"
                name="type"
                className="border p-2 w-full text-sm mt-2 h-10 rounded-md text-gray-600  border-gray-400"
              >
                <option value="Alumini">Alumini</option>
                <option value="Student">Student</option>
              </select>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox id="terms" className="border-2 border-gray-400" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
              >
                Accept terms and conditions
              </label>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

//----------------------------------------------------------

export function Signup() {
  return (
    <Card className="w-[650px] p-8 border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">Basic Profile Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-3 ">
            <div className="flex flex-col space-y-1.5">
              <Label className="text-lg mb-1" htmlFor="picture">
                Upload a profile photo
              </Label>
              <Input
                id="picture"
                className="h-10 border-gray-500"
                type="file"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="text-lg mb-1" htmlFor="name">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Enter your name"
                type="text"
                className="h-10"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <label for="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                className="border p-2 w-full text-sm mt-2 rounded-md text-gray-600  border-gray-400"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <label>Date of Birth</label>
              <input
                type="date"
                className="border p-2 w-full text-sm mt-2 text-gray-600  border-gray-400"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label className="text-lg mb-1" htmlFor="graduationyear">
                Graduation Year
              </Label>
              <Input
                id="graduationyear"
                placeholder="Graduation Year"
                type="number"
                className="h-10"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="text-lg mb-1" htmlFor="institute">
                Course
              </Label>
              <Input
                id="institute"
                placeholder="e.g.BSc in Biology"
                type="text"
                className="h-10"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="text-lg mb-1" htmlFor="course">
                Institute
              </Label>
              <Input
                id="institute"
                placeholder="e.g.University of Kelaniya"
                type="text"
                className="h-10"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label className="text-lg mb-1" htmlFor="time">
                Current Position
              </Label>

              <div className="flex flex-row justify-between gap-4">
                <Input
                  id="jobtitle"
                  type="text"
                  className="h-10"
                  placeholder="Job Title"
                />
                <Input
                  id="company"
                  type="text"
                  className="h-10"
                  placeholder="Company"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="text-lg mb-1" htmlFor="location">
                Location
              </Label>
              <Input
                id="location"
                className="h-10"
                placeholder="City, Country"
              />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

//--------------------------------------------------
export function Sociallinks() {
  return (
    <Card className="w-[650px] p-8 border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">Career Interests & Expertise</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-3 ">
            <div className="flex flex-col space-y-1.5">
              <Label className="text-lg mb-1" htmlFor="interestIndustries">
                Select Your Industries of Interest (Multiple)
              </Label>
              <MultiSelect />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="text-lg mb-1" htmlFor="skills">
                Skills & Expertise
              </Label>
              <Input
                id="skills"
                placeholder="Type a skill (e.g., Leadership, Marketing, Data Analysis...)"
                type="text"
                className="h-10"
              />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
