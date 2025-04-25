import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Nav from "./components/Navigation/Nav.jsx";
import Content from "./components/content/Content.jsx";
import Content2 from "./components/content/Content2.jsx";
import Login from "./components/Login/Login.jsx";
import Loginstep from "./components/Login/Loginstep.jsx";
import SignupStep2 from "./components/Login/SignupStep2.jsx";
import SignupStep3 from "./components/Login/SignupStep3";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Settings from "./components/Settings/Settings.jsx";
import Events from "./components/Events/Events.jsx";
import EventUnit from "./components/Events/EventUnit.jsx";

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
