import React, { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from "@/app/routes/dashboard.jsx";
import LoginPage from "@/app/routes/login";
import Team from "@/app/routes/team";
import Player from "@/app/routes/player";
import Favourites from "@/app/routes/favourites";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute.jsx";
import NotFound from "@/app/routes/not-found";

const createAppRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/team",
      element: (
        <ProtectedRoute>
          <Team />
        </ProtectedRoute>
      ),
    },
    {
      path: "/player",
      element: (
        <ProtectedRoute>
          <Player />
        </ProtectedRoute>
      ),
    },
    {
      path: "/favourites",
      element: (
        <ProtectedRoute>
          <Favourites />
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

export const AppRouter = () => {
  const router = useMemo(() => createAppRouter(), []);

  return <RouterProvider router={router} />;
};
