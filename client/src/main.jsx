import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Nav from "./components/LandingPage/Navigation/Nav.jsx";
import Content from "./components/LandingPage/content/Content.jsx";
import Content2 from "./components/LandingPage/content/Content2.jsx";
import Login from "./components/Login/Login.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Settings from "./components/Settings/Settings.jsx";
import Events from "./components/Events/Events.jsx";
import EventUnit from "./components/Events/EventUnit.jsx";
import CreateEvent from "./components/Events/CreateEvent.jsx";
import Mentorship from "./components/Mentorship/Mentorship.jsx";
import Register from "./components/Register/Register.jsx";
import JobPortal from "./components/Jobportal/JobPortal.jsx";
import Mentors from "./components/Mentorship/Mentors.jsx";
import StuRequests from "./components/Mentorship/StuRequests.jsx";
import ActiveMentorships from "./components/Mentorship/ActiveMentorships.jsx";
import PostJob from "./components/Jobportal/PostJob.jsx";
import Profile from "./components/Profiles/Profile.jsx";
import ManageEvent from "./components/Events/ManageEvent.jsx";
import SuperDashboard from "./components/Dashboard/SuperDashboard.jsx";
import SuperSettings from "./components/Settings/SuperSettings.jsx";

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
