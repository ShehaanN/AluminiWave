import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// page components
import App from "./App.jsx";
import Nav from "./pages/LandingPage/Navigation/Nav.jsx";
import Content from "./pages/LandingPage/content/Content.jsx";
import Content2 from "./pages/LandingPage/content/Content2.jsx";
import Login from "./pages/Login/Login.jsx";
import Dashboard from "./pages/Dashboard/Dashboard";
import Settings from "./pages/Settings/Settings.jsx";
import Events from "./pages/Events/Events.jsx";
import EventUnit from "./pages/Events/EventUnit.jsx";
import CreateEvent from "./pages/Events/CreateEvent.jsx";
import Mentorship from "./pages/Mentorship/Mentorship.jsx";
import Register from "./pages/Register/Register.jsx";
import JobPortal from "./pages/Jobportal/JobPortal.jsx";
import Mentors from "./pages/Mentorship/Mentors.jsx";
import StuRequests from "./pages/Mentorship/StuRequests.jsx";
import ActiveMentorships from "./pages/Mentorship/ActiveMentorships.jsx";
import PostJob from "./pages/Jobportal/PostJob.jsx";
import Profile from "./pages/Profiles/Profile.jsx";
import ManageEvent from "./pages/Events/ManageEvent.jsx";
import SuperDashboard from "./pages/Dashboard/SuperDashboard.jsx";
import SuperSettings from "./pages/Settings/SuperSettings.jsx";
import ManageJob from "./pages/Jobportal/ManageJob.jsx";
import Chat from "./pages/Chat/Chat.jsx";

// Import ProtectedRoute and UnauthorizedPage
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import UnauthorizedPage from "./pages/UnauthorizedPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Nav />
        <Content />
        <Content2 />
      </>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },

  // --- Protected Routes (General Authentication Needed) ---
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },

      {
        path: "/settings",
        element: <Settings />,
      },

      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/events/:id",
        element: <EventUnit />,
      },

      {
        path: "/mentorship",
        element: <Mentorship />,
      },
      {
        path: "/mentors",
        element: <Mentors />,
      },

      {
        path: "/activementorships",
        element: <ActiveMentorships />,
      },

      {
        path: "/profile",

        element: <Profile />,
      },
      {
        path: "/chat",

        element: <Chat />,
      },
    ],
  },

  {
    element: <ProtectedRoute allowedRoles={["alumni"]} />,
    children: [
      {
        path: "/createevent",
        element: <CreateEvent />,
      },
      {
        path: "/manageevent",
        element: <ManageEvent />,
      },
      {
        path: "/jobportal",
        element: <JobPortal />,
      },
      {
        path: "/postjob",
        element: <PostJob />,
      },
      {
        path: "/managejob",
        element: <ManageJob />,
      },
      {
        path: "/sturequest",
        element: <StuRequests />,
      },
    ],
  },

  {
    element: <ProtectedRoute requireSuperAdmin={true} />,
    children: [
      {
        path: "/superdashboard",
        element: <SuperDashboard />,
      },
      {
        path: "/supersettings",
        element: <SuperSettings />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
