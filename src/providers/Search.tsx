import qs from "qs";
import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  SearchDate,
  SearchDuration,
  SearchService,
  SearchSortBy,
  SearchTypes,
} from "../types/interfaces/Search";

const initialState: Search = {
  q: "",
  type: "video",
  sortBy: "relevance",
  time: "all",
  duration: "all",
  service: "invidious",
};

const SearchValueContext = createContext<Search>(initialState);
const SetSearchValueContext = createContext<any>(null);

interface SearchProviderrProps {
  children: React.ReactNode;
}

const getSearchParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    q: (urlParams.get("q") as string) ?? "",
    type: (urlParams.get("type") as SearchTypes) ?? initialState.type,
    sortBy: (urlParams.get("sortBy") as SearchSortBy) ?? initialState.sortBy,
    time: (urlParams.get("time") as SearchDate) ?? initialState.time,
    duration:
      (urlParams.get("duration") as SearchDuration) ?? initialState.duration,
    service: (urlParams.get("service") as SearchService) ?? "invidious",
  };
};

export const SearchProvider: React.FC<SearchProviderrProps> = ({
  children,
}) => {
  const [value, setValue] = useState<Search>(getSearchParams());

  const params = useMemo(
    () => ({
      value,
      setValue,
    }),
    [value]
  );

  return (
    <SearchValueContext.Provider value={params.value}>
      <SetSearchValueContext.Provider value={params.setValue}>
        {children}
      </SetSearchValueContext.Provider>
    </SearchValueContext.Provider>
  );
};

export const useSearchValues = () => useContext(SearchValueContext);

export const useSetSearchValues = () => {
  const setValue = useContext(SetSearchValueContext);
  const navigate = useNavigate();

  const handleSetValue = (updatedValues: Search) => {
    setValue(updatedValues);
    navigate(`/search?${qs.stringify(updatedValues)}`);
  };

  return handleSetValue;
};
