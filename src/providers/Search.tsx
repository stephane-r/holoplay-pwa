import { createContext, useContext, useMemo, useState } from "react";
import { Search, SearchTypes } from "../types/interfaces/Search";

const SearchValueContext = createContext<Search>({
  query: "",
  type: "video",
});
const SetSearchValueContext = createContext<null | React.Dispatch<
  React.SetStateAction<Search>
>>(null);
const SearchLoadingContext = createContext<{
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}>({ loading: false, setLoading: () => {} });

interface SearchProviderrProps {
  children: React.ReactNode;
}

const getSearchParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    query: (urlParams.get("query") as string) ?? "",
    type: (urlParams.get("type") as SearchTypes) ?? "video",
  };
};

export const SearchProvider: React.FC<SearchProviderrProps> = ({
  children,
}) => {
  const [value, setValue] = useState<Search>(getSearchParams());
  const [loading, setLoading] = useState<boolean>(false);

  const params = useMemo(
    () => ({
      value,
      setValue,
    }),
    [value]
  );

  const loadingState = useMemo(
    () => ({
      loading,
      setLoading,
    }),
    [loading]
  );

  return (
    <SearchValueContext.Provider value={params.value}>
      <SetSearchValueContext.Provider value={params.setValue}>
        <SearchLoadingContext.Provider value={loadingState}>
          {children}
        </SearchLoadingContext.Provider>
      </SetSearchValueContext.Provider>
    </SearchValueContext.Provider>
  );
};

export const useSearchValues = () => useContext(SearchValueContext);

export const useSetSearchValues = () =>
  useContext(SetSearchValueContext) as React.Dispatch<
    React.SetStateAction<Search>
  >;
