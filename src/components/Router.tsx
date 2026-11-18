import { lazy } from "react";
import {
  RouterProvider as RRProvider,
  createBrowserRouter,
} from "react-router-dom";

import { App } from "./App";

// Each page is its own chunk, fetched only when its route is visited,
// instead of every page's code (and its dependencies) living in the one
// bundle loaded up front regardless of which page the user lands on.
const AboutPage = lazy(() =>
  import("../pages/About").then((m) => ({ default: m.AboutPage })),
);
const ChannelDetailPage = lazy(() =>
  import("../pages/ChannelDetail").then((m) => ({
    default: m.ChannelDetailPage,
  })),
);
const DashboardPage = lazy(() =>
  import("../pages/Dashboard").then((m) => ({ default: m.DashboardPage })),
);
const FavoritesPage = lazy(() =>
  import("../pages/Favorites").then((m) => ({ default: m.FavoritesPage })),
);
const HistoryPage = lazy(() =>
  import("../pages/History").then((m) => ({ default: m.HistoryPage })),
);
const PlaylistDetailPage = lazy(() =>
  import("../pages/PlaylistDetail").then((m) => ({
    default: m.PlaylistDetailPage,
  })),
);
const PlaylistsPage = lazy(() =>
  import("../pages/Playlists").then((m) => ({ default: m.PlaylistsPage })),
);
const PopularPage = lazy(() =>
  import("../pages/Popular").then((m) => ({ default: m.PopularPage })),
);
const SearchPage = lazy(() =>
  import("../pages/Search").then((m) => ({ default: m.SearchPage })),
);
const SettingsPage = lazy(() =>
  import("../pages/Settings").then((m) => ({ default: m.SettingsPage })),
);
const TrendingPage = lazy(() =>
  import("../pages/Trending").then((m) => ({ default: m.TrendingPage })),
);

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
