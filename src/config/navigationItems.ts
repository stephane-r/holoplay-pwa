import type { ComponentType } from "react";
import {
  IconHeart,
  IconHistory,
  IconHome2,
  IconInfoCircle,
  IconMusic,
  IconSearch,
  IconSettings,
  IconTrendingUp,
  IconUsers,
} from "@tabler/icons-react";

import type { RoutePath } from "../components/NavbarLink";

export type NavigationSurface = "desktop" | "mobileBar" | "mobileDrawer";

export interface NavigationItem {
  id: string;
  icon: ComponentType<{ stroke?: number }>;
  translationKey: string;
  activePath: RoutePath;
  // "primary" items appear above the divider (desktop's main section,
  // mobile's bottom bar / top of the "More" drawer); "secondary" ones
  // appear below it (desktop's footer, the bottom of the drawer).
  section: "primary" | "secondary";
  surfaces: NavigationSurface[];
}

// Single source of truth for every nav entry and which surface(s) it
// appears on. Desktop shows everything in one list; mobile splits the
// same set across the bottom bar (a handful of primary items) and the
// "More" drawer (everything else) — before this, each surface hardcoded
// its own list, so adding a route meant remembering to update up to 3
// files, and they had already drifted (e.g. the drawer's Trending link
// didn't preserve the current filters the way the desktop one did).
export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: "dashboard",
    icon: IconHome2,
    translationKey: "navigation.dashboard",
    activePath: "/",
    section: "primary",
    surfaces: ["desktop", "mobileBar"],
  },
  {
    id: "search",
    icon: IconSearch,
    translationKey: "navigation.search",
    activePath: "/search",
    section: "primary",
    surfaces: ["desktop", "mobileBar"],
  },
  {
    id: "trending",
    icon: IconTrendingUp,
    translationKey: "navigation.trending",
    activePath: "/trending",
    section: "primary",
    surfaces: ["desktop", "mobileDrawer"],
  },
  {
    id: "most-popular",
    icon: IconUsers,
    translationKey: "navigation.most-popular",
    activePath: "/most-popular",
    section: "primary",
    surfaces: ["desktop", "mobileDrawer"],
  },
  {
    id: "favorites",
    icon: IconHeart,
    translationKey: "navigation.favorites",
    activePath: "/favorites",
    section: "primary",
    surfaces: ["desktop", "mobileBar"],
  },
  {
    id: "playlists",
    icon: IconMusic,
    translationKey: "navigation.playlists",
    activePath: "/playlists",
    section: "primary",
    surfaces: ["desktop", "mobileBar"],
  },
  {
    id: "history",
    icon: IconHistory,
    translationKey: "navigation.history",
    activePath: "/history",
    section: "primary",
    surfaces: ["desktop", "mobileDrawer"],
  },
  {
    id: "about",
    icon: IconInfoCircle,
    translationKey: "navigation.about",
    activePath: "/about",
    section: "secondary",
    surfaces: ["desktop", "mobileDrawer"],
  },
  {
    id: "settings",
    icon: IconSettings,
    translationKey: "navigation.settings",
    activePath: "/settings",
    section: "secondary",
    surfaces: ["desktop", "mobileDrawer"],
  },
];

export const getNavigationItemsForSurface = (surface: NavigationSurface) =>
  NAVIGATION_ITEMS.filter((item) => item.surfaces.includes(surface));
