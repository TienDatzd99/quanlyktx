import React from "react";
import { useRoutes } from "react-router-dom";
import HomeTemplate from "../templates/HomeTemplate/HomeTemplate";
import Home from "../pages/Home";
import ManageTemplate from "../templates/ManageTemplate/ManageTemplate";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminRoute from "../components/AdminRoute"; // Import AdminRoute
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import StudentManagement from "../pages/Manage/StudentManagement";
import RoomManagement from "../pages/Manage/RoomManagement";
import DashboardManagement from "../pages/Manage/DashboardManagement";
import RoomDetail from "../pages/Manage/RoomDetail";
import UserDetails from "../pages/UserDetails";

function useRoutesCustom() {
  let element = useRoutes([
    {
      path: "/",
      element: <HomeTemplate />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "profile",
          element: <ProtectedRoute><UserDetails /></ProtectedRoute>,
        },
        {
          path: "rooms/:id",
          element: <RoomDetail />,
        },
      ],
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
      path: "/manage",
      element: (
        <AdminRoute> {/* Thay ProtectedRoute bằng AdminRoute */}
          <ManageTemplate />
        </AdminRoute>
      ),
      children: [
        {
          path: "",
          element: <DashboardManagement />,
        },
        {
          path: "students",
          element: <StudentManagement />,
        },
        {
          path: "rooms",
          element: <RoomManagement />,
        },
        {
          path: "rooms/:id",
          element: <RoomDetail />,
        },
      ],
    },
  ]);

  return element;
}

export default useRoutesCustom;