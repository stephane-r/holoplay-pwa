import {
  SpotlightProvider as MSpotlightProvider,
  SpotlightAction,
} from "@mantine/spotlight";
import {
  IconHeart,
  IconHistory,
  IconHome2,
  IconMusic,
  IconSearch,
  IconTrendingUp,
  IconUsers,
} from "@tabler/icons-react";
import { useCallback, useMemo, useState } from "react";

import { useStableNavigate } from "./Navigate";
import { useSearchValues, useSetSearchValues } from "./Search";

interface SpotlightProviderProps {
  children: React.ReactNode;
}

type SpotlightTriggerType =
  | "Dashboard"
  | "Search"
  | "Trending"
  | "Most popular"
  | "Favorites"
  | "Playlist"
  | "History";

export const SpotlightProvider: React.FC<SpotlightProviderProps> = ({
  children,
}) => {
  const navigate = useStableNavigate();
  const setSearchValues = useSetSearchValues();
  const searchValues = useSearchValues();
  const [searchQuery, setSearchQuery] = useState<null | string>(null);

  const onTrigger = useCallback(
    (action: SpotlightAction) => {
      switch (action.title as SpotlightTriggerType) {
        case "Dashboard":
          navigate("/");
          break;
        case "Search":
          if (searchQuery && searchQuery.length > 0) {
            setSearchValues({ ...searchValues, q: searchQuery as string });
          } else {
            navigate(`/search`);
          }
          break;
        case "Trending":
          navigate("/trending");
          break;
        case "Most popular":
          navigate("/most-popular");
          break;
        case "Favorites":
          navigate("/favorites");
          break;
        case "Playlist":
          navigate("/playlists");
          break;
        case "History":
          navigate("/history");
          break;
        default:
          break;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [navigate, searchQuery, setSearchValues],
  );

  const actions: SpotlightAction[] = useMemo(
    () => [
      {
        title: "Dashboard",
        description: "Your dashboard with somes stats",
        onTrigger,
        icon: <IconHome2 size={18} />,
      },
      {
        title: "Search",
        description: "Search an artist, album or playlist (ex. Search:Eminem)",
        onTrigger,
        icon: <IconSearch size={18} />,
      },
      {
        title: "Trending",
        description: "Trending videos",
        onTrigger,
        icon: <IconTrendingUp size={18} />,
      },
      {
        title: "Most popular",
        description: "Most popular videos",
        onTrigger,
        icon: <IconUsers size={18} />,
      },
      {
        title: "Favorites",
        description: "Your favorite videos",
        onTrigger,
        icon: <IconHeart size={18} />,
      },
      {
        title: "Playlist",
        description: "Your playlists",
        onTrigger,
        icon: <IconMusic size={18} />,
      },
      {
        title: "History",
        description: "Your history played videos",
        onTrigger,
        icon: <IconHistory size={18} />,
      },
    ],
    [onTrigger],
  );

  const handleFilter = (query: string, actions: SpotlightAction[]) => {
    if (query.includes("search:") || query.includes("Search:")) {
      setSearchQuery(query.replace("search:", "").replace("Search:", "")); // ahah
      return actions.filter((action) => action.title === "Search");
    }
    return actions.filter((action) =>
      action.title.toLowerCase().includes(query.toLowerCase()),
    );
  };

  return (
    <MSpotlightProvider
      actions={actions}
      highlightQuery
      searchIcon={<IconSearch size={18} />}
      searchPlaceholder="Search..."
      shortcut="mod + k"
      nothingFoundMessage="Nothing found"
      filter={handleFilter}
    >
      {children}
    </MSpotlightProvider>
  );
};
