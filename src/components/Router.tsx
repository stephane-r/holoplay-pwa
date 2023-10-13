import {
  RouterProvider as RRProvider,
  createBrowserRouter,
} from "react-router-dom";

import { AboutPage } from "../pages/About";
import { ChannelDetailPage } from "../pages/ChannelDetail";
import { DashboardPage } from "../pages/Dashboard";
import { FavoritesPage } from "../pages/Favorites";
import { HistoryPage } from "../pages/History";
import { PlaylistDetailPage } from "../pages/PlaylistDetail";
import { PlaylistsPage } from "../pages/Playlists";
import { PopularPage } from "../pages/Popular";
import { SearchPage } from "../pages/Search";
import { SettingsPage } from "../pages/Settings";
import { TrendingPage } from "../pages/Trending";
import { App } from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <DashboardPage />,
        index: true,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "trending",
        element: <TrendingPage />,
      },
      {
        path: "most-popular",
        element: <PopularPage />,
      },
      {
        path: "favorites",
        element: <FavoritesPage />,
      },
      {
        path: "playlists",
        element: <PlaylistsPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "history",
        element: <HistoryPage />,
      },
      {
        path: "playlists/:playlistId",
        element: <PlaylistDetailPage />,
      },
      {
        path: "channels/:authorId",
        element: <ChannelDetailPage />,
      },
    ],
  },
]);

export const RouterProvider = () => {
  return <RRProvider router={router} />;
};
