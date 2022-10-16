import Home from "./pages/UnRestricted/Home";
import Login from "./pages/UnRestricted/Login";
import Signup from "./pages/UnRestricted/Signup";
import Profile from "./pages/Restricted/Profile";
import Dashboard from "./pages/Restricted/Dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/:username",
    element: <Profile />,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
