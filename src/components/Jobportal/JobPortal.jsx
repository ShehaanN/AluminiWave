 
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
          <Sidebar type="Alumini" />
      
      {/* Main Content */}

      <div className="flex-1 ml-64">
        <div className="max-w-7xl mx-auto px-8 py-8 flex justify-between">
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