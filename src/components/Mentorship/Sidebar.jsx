import { Home, Calendar, Users, Briefcase, MessageSquare, User, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const navItems = [
  { label: 'Dashboard', icon: <Home size={18} />, path: '/dashboard' },
  { label: 'Events', icon: <Calendar size={18} />, path: '/events' },
  { label: 'Mentorship', icon: <Users size={18} />, path: '/mentorship' },
  { label: 'Job Portal', icon: <Briefcase size={18} />, path: '/job-portal' },
  { label: 'Networking', icon: <MessageSquare size={18} />, path: '/networking' },
];

const accountItems = [
  { label: 'Profile', icon: <User size={18} />, path: '/profile' },
  { label: 'Settings', icon: <Settings size={18} />, path: '/settings' },
];

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <h1 className="sidebar-title">AluminiWave</h1>

      <div className="sidebar-section">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`sidebar-link ${isActive(item.path) ? 'active' : ''}`}
          >
            {item.icon}
            <span className="link-text">{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="account-title">MY ACCOUNT</div>

      <div className="sidebar-section">
        {accountItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`sidebar-link ${isActive(item.path) ? 'active' : ''}`}
          >
            {item.icon}
            <span className="link-text">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
