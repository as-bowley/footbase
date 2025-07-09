import { useMemo } from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import Dashboard from "@/app/routes/dashboard.js";
import LoginPage from "@/app/routes/login";
import Team from "@/app/routes/team";
import Player from "@/app/routes/player";
import Favourites from "@/app/routes/favourites";
import { ProtectedRoute } from "@/lib/auth";
import NotFound from "@/app/routes/not-found";

const createAppRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />,
        </ProtectedRoute>
      ),
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
      path: "/player/:playerId?",
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
