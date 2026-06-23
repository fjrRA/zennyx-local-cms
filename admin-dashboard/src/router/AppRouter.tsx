// src/router/AppRouter.tsx
import {
  Navigate,
  Route,
  Routes,
} from "react-router";

import AdminLayout from "../layouts/AdminLayout";

import CreateGamePage from "../pages/CreateGamePage";
import DashboardPage from "../pages/DashboardPage";
import DevlogsPage from "../pages/DevlogsPage";
import GamesPage from "../pages/GamesPage";
import NotFoundPage from "../pages/NotFoundPage";
import SitePage from "../pages/SitePage";
import SocialsPage from "../pages/SocialsPage";
import TeamPage from "../pages/TeamPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route
        element={<AdminLayout />}
      >
        <Route
          index
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        <Route
          path="dashboard"
          element={<DashboardPage />}
        />

        <Route
          path="games"
          element={<GamesPage />}
        />

        <Route
          path="games/new"
          element={<CreateGamePage />}
        />

        <Route
          path="devlogs"
          element={<DevlogsPage />}
        />

        <Route
          path="site"
          element={<SitePage />}
        />

        <Route
          path="team"
          element={<TeamPage />}
        />

        <Route
          path="socials"
          element={<SocialsPage />}
        />

        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Route>
    </Routes>
  );
}