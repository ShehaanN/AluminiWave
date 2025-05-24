import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Nav from "./pages/LandingPage/Navigation/Nav.jsx";
import Content from "./pages/LandingPage/content/Content.jsx";
import Content2 from "./pages/LandingPage/content/Content2.jsx";
import Login from "./pages/Login/Login.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/superdashboard",
    element: <SuperDashboard />,
  },
  {
    path: "/jobportal",
    element: <JobPortal />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/supersettings",
    element: <SuperSettings />,
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
    path: "/createevent",
    element: <CreateEvent />,
  },
  {
    path: "/manageevent",
    element: <ManageEvent />,
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
    path: "/sturequest",
    element: <StuRequests />,
  },
  {
    path: "/activementorships",
    element: <ActiveMentorships />,
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
    path: "/profile",

    element: <Profile />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <Nav /> */}
    {/* <Content></Content>
    <Content2></Content2>  */}
    {/* <Login /> */}
    {/* {<SignupStep2></SignupStep2> } */}
    {/* { <SignupStep3></SignupStep3> } */}
    {/* <SignupComplete></SignupComplete> */}
    <RouterProvider router={router} />
  </StrictMode>
);
