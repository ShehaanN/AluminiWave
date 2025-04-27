// import dp from "..//../assets/mdp.jpg";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import Sidebar from "../Sidebar/Sidebar";
// import { Link } from "react-router-dom";

// const JobPortal = () => {
//   return (
//     <div className="min-h-screen flex">
//       <Sidebar type="Alumini" />

//       <main className="flex-1 ml-64">
//         <div className="max-w-7xl mx-auto px-8 py-8">
//           <div className="mb-8 flex flex-row w-full justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">
//                 Welcome back, Alex!
//               </h1>
//               <p className="text-gray-600 mt-1">Your alumni dashboard</p>
//             </div>
//             <div>
//               <div>
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Avatar className="size-12">
//                       <AvatarImage src="https://github.com/shadcn.png" />
//                       <AvatarFallback>CN</AvatarFallback>
//                     </Avatar>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent className="w-40">
//                     <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                     <DropdownMenuSeparator />
//                     <Link to="/settings">
//                       <DropdownMenuItem>Update Profile</DropdownMenuItem>
//                     </Link>
//                     <DropdownMenuItem>Change Password</DropdownMenuItem>

//                     <Link to="/">
//                       <DropdownMenuItem>Log out</DropdownMenuItem>
//                     </Link>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </div>
//             </div>
//           </div>
//           <div className="grid grid-cols-3 gap-6 mb-8">
//             <div className="bg-white p-6 rounded-lg border border-gray-200">
//               <div className="">
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
//                     <i
//                       className="fas fa-calendar text-[#269EB2] fill-current"
//                       style={{ color: "var(--color-aluwave)" }}
//                     ></i>
//                   </div>
//                 </div>
//                 <h3 className="font-semibold text-gray-900">UPCOMING EVENTS</h3>
//               </div>
//               <div className="mt-4 flex  gap-3">
//                 <button className="!rounded-button rounded-lg bg-[#269EB2] w-30 text-white px-4 py-2 text-sm font-medium">
//                   More Events
//                 </button>
//               </div>
//             </div>

//             <div className="bg-white p-6 rounded-lg border border-gray-200">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
//                   <i
//                     className="fas fa-users "
//                     style={{ color: "var(--color-aluwave)" }}
//                   ></i>
//                 </div>
//               </div>
//               <h3 className="font-semibold text-gray-900">MENTORSHIPS</h3>

//               <div className="mt-4 flex gap-3">
//                 <button className="!rounded-button rounded-lg bg-[#269EB2] w-30 text-white px-4 py-2 text-sm font-medium">
//                   Review
//                 </button>
//               </div>
//             </div>

//             <div className="bg-white p-6 rounded-lg border border-gray-200">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
//                   <i className="fas fa-briefcase text-[#269EB2]"></i>
//                 </div>
//               </div>
//               <h3 className="font-semibold text-gray-900">JOB OPPOTUNITIES</h3>

//               <div className="mt-4 flex gap-3">
//                 <button className="!rounded-button rounded-lg bg-[#269EB2] w-30 text-white px-4 py-2 text-sm font-medium">
//                   Explore
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-lg border border-gray-200 mb-8">
//             <div className="p-6">
//               <h2 className="text-xl font-bold text-gray-900 mb-6">
//                 Upcoming Events
//               </h2>
//               <div className="flex gap-4 border-b border-gray-200">
//                 <button className="px-4 py-2  text-[#269EB2] border-b-2 border-[#269EB2] font-medium">
//                   Events
//                 </button>
//               </div>
//               <div className="divide-y divide-gray-200">
//                 <div className="py-4 flex items-center justify-between">
//                   <div className="flex items-center">
//                     <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
//                       <i className="fas fa-users text-[#269EB2]"></i>
//                     </div>
//                     <div className="ml-4">
//                       <h4 className="font-medium text-gray-900">
//                         Tech Career Fair
//                       </h4>
//                       <p className="text-sm text-gray-500">
//                         May 15, 2023 • Virtual Event
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="py-4 flex items-center justify-between">
//                   <div className="flex items-center">
//                     <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
//                       <i className="fas fa-users text-[#269EB2]"></i>
//                     </div>
//                     <div className="ml-4">
//                       <h4 className="font-medium text-gray-900">
//                         Alumni Networking Mixer
//                       </h4>
//                       <p className="text-sm text-gray-500">
//                         June 2, 2023 • Campus Center
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="py-4 flex items-center justify-between">
//                   <div className="flex items-center">
//                     <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
//                       <i className="fas fa-users text-[#269EB2]"></i>
//                     </div>
//                     <div className="ml-4">
//                       <h4 className="font-medium text-gray-900">
//                         Resume Workshop
//                       </h4>
//                       <p className="text-sm text-gray-500">
//                         June 10, 2023 • Online
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-6">
//                 <button className="!rounded-button rounded-lg w-full bg-[#269EB2] text-white py-2 font-medium">
//                   View All Events
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="mb-8">
//             <h2 className="text-xl font-bold text-gray-900 mb-6">
//               Mentorship Activity
//             </h2>
//             <div className="grid grid-cols-3 gap-6">
//               <div className="bg-white p-6 rounded-lg border border-gray-200">
//                 <div className="flex items-center mb-4">
//                   <img
//                     src={dp}
//                     className="w-10 h-10 rounded-full"
//                     alt="Sarah Chen"
//                   />
//                   <div className="ml-3">
//                     <h4 className="font-medium text-gray-900">Sarah Chen</h4>
//                     <p className="text-sm text-gray-500">
//                       Software Engineering Student
//                     </p>
//                   </div>
//                 </div>
//                 <p className="text-sm text-gray-600 mb-4">
//                   Seeking guidance in software engineering career paths
//                 </p>
//                 <div className="flex gap-3">
//                   <button className="!rounded-button rounded-lg flex-1 bg-[#269EB2] text-white py-2 text-sm font-medium">
//                     Accept
//                   </button>
//                   <button className="!rounded-button rounded-lg flex-1 border border-gray-200 text-gray-700 py-2 text-sm font-medium">
//                     View Profile
//                   </button>
//                 </div>
//               </div>

//               <div className="bg-white p-6 rounded-lg border border-gray-200">
//                 <div className="flex items-center mb-4">
//                   <img
//                     src={dp}
//                     className="w-10 h-10 rounded-full"
//                     alt="Michael Rodriguez"
//                   />
//                   <div className="ml-3">
//                     <h4 className="font-medium text-gray-900">
//                       Michael Rodriguez
//                     </h4>
//                     <p className="text-sm text-gray-500">
//                       Data Science Student
//                     </p>
//                   </div>
//                 </div>
//                 <p className="text-sm text-gray-600 mb-4">
//                   Looking for advice on data science internships
//                 </p>
//                 <div className="flex gap-3">
//                   <button className="!rounded-button rounded-lg flex-1 bg-[#269EB2] text-white py-2 text-sm font-medium">
//                     Accept
//                   </button>
//                   <button className="!rounded-button rounded-lg flex-1 border border-gray-200 text-gray-700 py-2 text-sm font-medium">
//                     View Profile
//                   </button>
//                 </div>
//               </div>

//               <div className="bg-white p-6 rounded-lg border className-gray-200">
//                 <div className="flex items-center mb-4">
//                   <img
//                     src={dp}
//                     className="w-10 h-10 rounded-full"
//                     alt="Jamie Wilson"
//                   />
//                   <div className="ml-3">
//                     <h4 className="font-medium text-gray-900">Jamie Wilson</h4>
//                     <p className="text-sm text-gray-500">
//                       UX/UI Design Student
//                     </p>
//                   </div>
//                 </div>
//                 <p className="text-sm text-gray-600 mb-4">
//                   Interested in discussing UX/UI design industry trends
//                 </p>
//                 <div className="flex gap-3">
//                   <button className="!rounded-button rounded-lg flex-1 bg-[#269EB2] text-white py-2 text-sm font-medium">
//                     Accept
//                   </button>
//                   <button className="!rounded-button rounded-lg flex-1 border border-gray-200 text-gray-700 py-2 text-sm font-medium">
//                     View Profile
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-lg border border-gray-200 mb-8">
//             <div className="p-6">
//               <h2 className="text-xl font-bold text-gray-900 mb-6">
//                 Career Resources
//               </h2>
//               <div className="divide-y divide-gray-200">
//                 <div className="py-4 flex items-center justify-between">
//                   <div className="flex items-center">
//                     <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
//                       <i className="fas fa-briefcase text-[#269EB2]"></i>
//                     </div>
//                     <div className="ml-4">
//                       <h4 className="font-medium text-gray-900">
//                         Senior Software Engineer
//                       </h4>
//                       <p className="text-sm text-gray-500">TechCorp • Remote</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-4">
//                     <span className="text-sm text-gray-500">
//                       Posted 2 days ago
//                     </span>
//                   </div>
//                 </div>

//                 <div className="py-4 flex items-center justify-between">
//                   <div className="flex items-center">
//                     <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
//                       <i className="fas fa-briefcase text-[#269EB2]"></i>
//                     </div>
//                     <div className="ml-4">
//                       <h4 className="font-medium text-gray-900">
//                         Data Scientist
//                       </h4>
//                       <p className="text-sm text-gray-500">
//                         Analytics Inc. • New York, NY
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-4">
//                     <span className="text-sm text-gray-500">
//                       Posted 3 days ago
//                     </span>
//                   </div>
//                 </div>

//                 <div className="py-4 flex items-center justify-between">
//                   <div className="flex items-center">
//                     <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
//                       <i className="fas fa-briefcase text-[#269EB2]"></i>
//                     </div>
//                     <div className="ml-4">
//                       <h4 className="font-medium text-gray-900">
//                         UX/UI Designer
//                       </h4>
//                       <p className="text-sm text-gray-500">
//                         Creative Solutions • San Francisco, CA
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-4">
//                     <span className="text-sm text-gray-500">
//                       Posted 5 days ago
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-6">
//                 <button className="!rounded-button rounded-lg w-full bg-[#269EB2] text-white py-2 font-medium">
//                   View All Jobs
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default JobPortal;
import { useState } from 'react';
import { Search, Upload, ChevronDown, Bookmark, Edit, Bell, Trash2, User, Settings, BarChart2, Users, Briefcase, Calendar, Share2 } from 'lucide-react';
import Sidebar from '../Sidebar/Sidebar';

export default function JobPortal() {
  const [activeTab, setActiveTab] = useState('job-portal');
  const [timeFilter, setTimeFilter] = useState('Last 30 days');
  
  // Sample chart data
  const chartData = [
    { name: 'Week 1', applications: 3 },
    { name: 'Week 2', applications: 5 },
    { name: 'Week 3', applications: 2 },
    { name: 'Week 4', applications: 4 },
  ];
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* <div className="min-h-screen flex"> */}
         <Sidebar type="Alumini" />
      {/* Sidebar */}
      {/* <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <img src="/api/placeholder/150/40" alt="AlumniWave Logo" className="h-8" />
        </div>
        
        <nav className="mt-6">
          <div className="px-4 mb-4">
            <button 
              className={`flex items-center w-full px-4 py-2 text-left rounded-lg ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <BarChart2 className="w-5 h-5 mr-3" />
              Dashboard
            </button>
            
            <button 
              className={`flex items-center w-full px-4 py-2 text-left rounded-lg ${activeTab === 'events' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setActiveTab('events')}
            >
              <Calendar className="w-5 h-5 mr-3" />
              Events
            </button>
            
            <button 
              className={`flex items-center w-full px-4 py-2 text-left rounded-lg ${activeTab === 'mentorship' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setActiveTab('mentorship')}
            >
              <Users className="w-5 h-5 mr-3" />
              Mentorship
            </button>
            
            <button 
              className={`flex items-center w-full px-4 py-2 text-left rounded-lg ${activeTab === 'job-portal' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setActiveTab('job-portal')}
            >
              <Briefcase className="w-5 h-5 mr-3" />
              Job Portal
            </button>
            
            <button 
              className={`flex items-center w-full px-4 py-2 text-left rounded-lg ${activeTab === 'networking' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setActiveTab('networking')}
            >
              <Share2 className="w-5 h-5 mr-3" />
              Networking
            </button>
          </div>
          
          <div className="px-4 pt-4 border-t border-gray-200">
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase">My Account</p>
            <div className="mt-4">
              <button 
                className={`flex items-center w-full px-4 py-2 text-left rounded-lg ${activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('profile')}
              >
                <User className="w-5 h-5 mr-3" />
                Profile
              </button>
              
              <button 
                className={`flex items-center w-full px-4 py-2 text-left rounded-lg ${activeTab === 'settings' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('settings')}
              >
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </button>
            </div>
          </div>
        </nav>
      </div> */}

      
      {/* Main Content */}

      <div className="flex-1 ml-64">
        <div className="max-w-7xl mx-auto px-8 py-8 flex justify-between">
{/* //           <div className="mb-8 flex flex-row w-full justify-between"> */}
      {/* <div className="flex-1">
         <div className="flex items-center justify-between p-6 bg-white border-b border-gray-200"> */}
          <h1 className="text-2xl font-bold text-gray-800">Job Portal</h1>
          <div className="flex space-x-2">
            <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-[#269EB2] rounded-lg hover:bg-teal-700">
              <Search className="w-4 h-4 mr-2" />
              Advanced Search
            </button>
            <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <ChevronDown className="w-4 h-4 mr-2" />
              Sort
            </button>
            <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-700">
              <Edit className="w-4 h-4 mr-2" />
              Post a Job
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* Application Tracking */}
          <div className="mb-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">Application Tracking</h2>
            <div className="grid grid-cols-5 gap-4">
              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                <span className="text-3xl font-bold text-gray-800">12</span>
                <span className="mt-1 text-sm text-gray-500">Applied</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                <span className="text-3xl font-bold text-yellow-500">5</span>
                <span className="mt-1 text-sm text-gray-500">In Review</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                <span className="text-3xl font-bold text-blue-500">3</span>
                <span className="mt-1 text-sm text-gray-500">Interviewing</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                <span className="text-3xl font-bold text-green-500">2</span>
                <span className="mt-1 text-sm text-gray-500">Offers</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                <span className="text-3xl font-bold text-red-500">4</span>
                <span className="mt-1 text-sm text-gray-500">Rejected</span>
              </div>
            </div>
          </div>
          
          {/* Upcoming Interviews */}
          <div className="p-5 mb-6 bg-white rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Upcoming Interviews</h2>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Google - Technical Interview</p>
                <p className="text-sm text-gray-500">Tomorrow at 2:00 PM</p>
              </div>
              <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
                Join Call
              </button>
            </div>
          </div>
          
          {/* Document Repository */}
          <div className="p-5 mb-6 bg-white rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Document Repository</h2>
              <button className="flex items-center px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </button>
            </div>
            <div className="flex space-x-2">
              <span className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">resume_v2.pdf</span>
              <span className="px-3 py-1 text-xs font-medium text-green-600 bg-green-100 rounded-full">portfolio.pdf</span>
            </div>
          </div>
          
          {/* Application Analytics */}
          <div className="p-5 mb-6 bg-white rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Application Analytics</h2>
              <div className="relative">
                <select 
                  className="pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                >
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
                <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
            <div className="flex justify-center items-center h-64 bg-gray-50 rounded-lg">
              <p className="text-gray-500">Chart Placeholder</p>
            </div>
          </div>
          
          {/* Job Listings */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {/* Job Card 1 */}
            <div className="p-5 bg-white rounded-lg shadow-sm">
              <div className="flex justify-between mb-3">
                <h3 className="font-bold text-gray-800">Senior Software Engineer</h3>
                <button className="text-blue-500 hover:text-blue-600">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
              <p className="mb-3 text-sm text-gray-600">Google • San Francisco, CA</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2 py-1 text-xs bg-gray-100 rounded-md">Full-time</span>
                <span className="px-2 py-1 text-xs bg-gray-100 rounded-md">Remote</span>
                <span className="px-2 py-1 text-xs bg-gray-100 rounded-md">$120k-$180k</span>
              </div>
              <p className="mb-4 text-sm text-gray-700">We're looking for an experienced software engineer to join our team and help build the next generation of cloud infrastructure...</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Posted 2 days ago</span>
                <button className="px-3 py-1 text-sm font-medium text-white bg-[#269EB2] rounded-md hover:bg-teal-700">
                  Quick Apply
                </button>
              </div>
            </div>
            
            {/* Job Card 2 */}
            <div className="p-5 bg-white rounded-lg shadow-sm">
              <div className="flex justify-between mb-3">
                <h3 className="font-bold text-gray-800">Product Manager</h3>
                <button className="text-blue-500 hover:text-blue-600">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
              <p className="mb-3 text-sm text-gray-600">Microsoft • Seattle, WA</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2 py-1 text-xs bg-gray-100 rounded-md">Full-time</span>
                <span className="px-2 py-1 text-xs bg-gray-100 rounded-md">On-site</span>
                <span className="px-2 py-1 text-xs bg-gray-100 rounded-md">$140k-$200k</span>
              </div>
              <p className="mb-4 text-sm text-gray-700">Join our product team to drive innovation and shape the future of enterprise software solutions...</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Posted 3 days ago</span>
                <button className="px-3 py-1 text-sm font-medium text-white bg-[#269EB2] rounded-md hover:bg-teal-700">
                  Quick Apply
                </button>
              </div>
            </div>
            
            {/* Job Card 3 */}
            <div className="p-5 bg-white rounded-lg shadow-sm">
              <div className="flex justify-between mb-3">
                <h3 className="font-bold text-gray-800">Data Scientist</h3>
                <button className="text-blue-500 hover:text-blue-600">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
              <p className="mb-3 text-sm text-gray-600">Amazon • New York, NY</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2 py-1 text-xs bg-gray-100 rounded-md">Full-time</span>
                <span className="px-2 py-1 text-xs bg-gray-100 rounded-md">Hybrid</span>
                <span className="px-2 py-1 text-xs bg-gray-100 rounded-md">$130k-$190k</span>
              </div>
              <p className="mb-4 text-sm text-gray-700">Looking for a talented data scientist to help us leverage big data and machine learning to drive business decisions...</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Posted 1 week ago</span>
                <button className="px-3 py-1 text-sm font-medium text-white bg-[#269EB2] rounded-md hover:bg-teal-700">
                  Quick Apply
                </button>
              </div>
            </div>
          </div>
          
          {/* Job Search Filters */}
          <div className="p-5 mb-6 bg-white rounded-lg shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">Job Search Filters</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Industry</label>
                <div className="relative">
                  <select className="w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All Industries</option>
                    <option>Technology</option>
                    <option>Finance</option>
                    <option>Healthcare</option>
                    <option>Education</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Location</label>
                <div className="relative">
                  <select className="w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All Locations</option>
                    <option>San Francisco, CA</option>
                    <option>New York, NY</option>
                    <option>Seattle, WA</option>
                    <option>Remote</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Experience Level</label>
                <div className="relative">
                  <select className="w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All Levels</option>
                    <option>Entry Level</option>
                    <option>Mid Level</option>
                    <option>Senior</option>
                    <option>Executive</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Job Alerts */}
          <div className="p-5 bg-white rounded-lg shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">Job Alerts</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-800">Software Engineering Roles</h3>
                  <p className="text-sm text-gray-500">Daily alerts for tech positions in San Francisco</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-1 text-gray-500 hover:text-gray-700">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="p-1 text-gray-500 hover:text-gray-700">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-800">Product Management</h3>
                  <p className="text-sm text-gray-500">Weekly alerts for remote PM positions</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-1 text-gray-500 hover:text-gray-700">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="p-1 text-gray-500 hover:text-gray-700">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}