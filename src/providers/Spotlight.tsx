import { Spotlight, type SpotlightActionData } from "@mantine/spotlight";
import {
  IconHeart,
  IconHistory,
  IconHome2,
  IconMusic,
  IconSearch,
  IconTrendingUp,
  IconUsers,
} from "@tabler/icons-react";
import {
  type FC,
  type PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";

import { useStableNavigate } from "./Navigate";
import { useSearchValues, useSetSearchValues } from "./Search";

type SpotlightTriggerType =
  | "Dashboard"
  | "Search"
  | "Trending"
  | "Most popular"
  | "Favorites"
  | "Playlist"
  | "History";

export const SpotlightProvider: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useStableNavigate();
  const setSearchValues = useSetSearchValues();
  const searchValues = useSearchValues();
  const [searchQuery, setSearchQuery] = useState<null | string>(null);

  const onTrigger = useCallback(
    (action: SpotlightActionData) => {
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

  const actions: SpotlightActionData[] = useMemo(
    () => [
      {
        id: "dashboard",
        title: "Dashboard",
        description: "Your dashboard with somes stats",
        onTrigger,
        icon: <IconHome2 size={18} />,
      },
      {
        id: "search",
        title: "Search",
        description: "Search an artist, alb um or playlist (ex. Search:Eminem)",
        onTrigger,
        icon: <IconSearch size={18} />,
      },
      {
        id: "trending",
        title: "Trending",
        description: "Trending videos",
        onTrigger,
        icon: <IconTrendingUp size={18} />,
      },
      {
        id: "most-popular",
        title: "Most popular",
        description: "Most popular videos",
        onTrigger,
        icon: <IconUsers size={18} />,
      },
      {
        id: "favorites",
        title: "Favorites",
        description: "Your favorite videos",
        onTrigger,
        icon: <IconHeart size={18} />,
      },
      {
        id: "playlist",
        title: "Playlist",
        description: "Your playlists",
        onTrigger,
        icon: <IconMusic size={18} />,
      },
      {
        id: "history",
        title: "History",
        description: "Your history played videos",
        onTrigger,
        icon: <IconHistory size={18} />,
      },
    ],
    [onTrigger],
  );

  const handleFilter = (query: string, actions: SpotlightActionData[]) => {
    if (query.includes("search:") || query.includes("Search:")) {
      setSearchQuery(query.replace("search:", "").replace("Search:", "")); // ahah
      return actions.filter((action) => action.title === "Search");
    }
    return actions.filter(
      (action) =>
        (action.label as string)?.toLowerCase().includes(query.toLowerCase()),
    );
  };

  return (
    <Spotlight
      actions={actions}
      highlightQuery
      searchProps={{
        leftSection: <IconSearch size={18} />,
        placeholder: "Search...",
      }}
      shortcut="mod + k"
      nothingFound="Nothing found"
      filter={(query, actions) =>
        handleFilter(query, actions as SpotlightActionData[])
      }
    >
      {children}
    </Spotlight>
  );
};
