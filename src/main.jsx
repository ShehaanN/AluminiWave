import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Nav from "./components/LandingPage/Navigation/Nav.jsx";
import Content from "./components/LandingPage/content/Content.jsx";
import Content2 from "./components/LandingPage/content/Content2.jsx";
import Login from "./components/Register/Login.jsx";
import Loginstep from "./components/Register/Loginstep.jsx";
import SignupStep2 from "./components/Register/SignupStep2.jsx";
import SignupStep3 from "./components/Register/SignupStep3.jsx";
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
    path: "/signupStep2",
    element: <SignupStep2 />,
  },
  {
    path: "/signupStep3",
    element: <SignupStep3 />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
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
