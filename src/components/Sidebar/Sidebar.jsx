import React from 'react';
import { User, Settings, BarChart, Calendar, Users, Briefcase, Network } from 'lucide-react';

function Sidebar() {
    return (
        <div className="w-64 bg-white border-r border-gray-200">

            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center">
                    <Logo />
                </div>
            </div>

            <nav>
                <NavItem icon={<BarChart size={20} />} label="Dashboard" active />
                <NavItem icon={<Calendar size={20} />} label="Events" />
                <NavItem icon={<Users size={20} />} label="Mentorship" />
                <NavItem icon={<Briefcase size={20} />} label="Job Portal" />
                <NavItem icon={<Network size={20} />} label="Network" active />
            </nav>

            <div className="mt-8 px-4">
                <div className="text-xs font-medium text-gray-400 mb-2">MY ACCOUNT</div>
                <NavItem icon={<User size={20} />} label="Profile" textColor="text-teal-500" />
                <NavItem icon={<Settings size={20} />} label="Settings" />
            </div>

        </div>
    );
}

function NavItem({ icon, label, active = false, textColor = 'text-gray-600' }) {
    return (
        <div className={`flex items-center px-4 py-2 my-1 ${active ? 'bg-gray-100' : ''} rounded-md`}>
            <div className={textColor}>{icon}</div>
            <span className={`ml-3 ${textColor}`}>{label}</span>
        </div>
    );
}

function Logo() {
    return (
    <div className="text-xl font-semibold">
      <span className="text-gray-700">(</span>
      <span className="text-gray-700">Alumini</span>
      <span className="text-teal-500">Wave</span>
      <span className="text-gray-700">)</span>
    </div>
    );
}

export default Sidebar;