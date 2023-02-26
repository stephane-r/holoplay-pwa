import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import { useUrlParams } from "../hooks/useUrlParams";
import { search } from "../services/search";
import { Search, SearchTypes } from "../types/interfaces/Search";
import { Video } from "../types/interfaces/Video";

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
const SearchResultContext = createContext<Video[]>([]);
const SetSearchResultContext = createContext<null | React.Dispatch<
  React.SetStateAction<Video[]>
>>(null);

interface SearchProviderrProps {
  children: React.ReactNode;
}

export const SearchProvider: React.FC<SearchProviderrProps> = ({
  children,
}) => {
  const [value, setValue] = useState<Search>({
    query: "",
    type: "video",
  });
  const [result, setResult] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const params = useMemo(
    () => ({
      value,
      setValue,
    }),
    [value]
  );

  const results = useMemo(
    () => ({
      result,
      setResult: setResult as React.Dispatch<React.SetStateAction<Video[]>>,
    }),
    [result]
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
        <SearchResultContext.Provider value={results.result}>
          <SetSearchResultContext.Provider value={results.setResult}>
            <SearchLoadingContext.Provider value={loadingState}>
              <SearchUrlQuery />
              {children}
            </SearchLoadingContext.Provider>
          </SetSearchResultContext.Provider>
        </SearchResultContext.Provider>
      </SetSearchValueContext.Provider>
    </SearchValueContext.Provider>
  );
};

const SearchUrlQuery = () => {
  useSearchUrlQuery();
  return null;
};

const useSearchUrlQuery = () => {
  // Can not use react-router-dom useUrlParams hook
  // because it create a few re-render in this case
  const searchParams = useUrlParams();
  const setSearchValues = useSetSearchValues();
  const { search } = useSearchData();

  useEffect(() => {
    if (searchParams.get("query") && searchParams.get("type")) {
      const params = {
        query: searchParams.get("query") as string,
        type: searchParams.get("type") as SearchTypes,
      };
      setSearchValues(params);
      search(params);
    }
  }, []);
};

export const useSearchValues = () => useContext(SearchValueContext);

export const useSetSearchValues = () =>
  useContext(SetSearchValueContext) as React.Dispatch<
    React.SetStateAction<Search>
  >;

export const useSearchData = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchValues() as Search;
  const setSearchResult = useSetSearchResult();
  const { setLoading } = useSearchLoading();

  const searchData = async (params?: Search) => {
    setLoading(true);
    const queryParams = params ?? searchParams;

    try {
      const result = await queryClient.fetchQuery("search", () =>
        search(queryParams)
      );
      setSearchResult(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { search: searchData };
};

export const useSearchResult = (): Video[] =>
  useContext(SearchResultContext) as Video[];

export const useSetSearchResult = () =>
  useContext(SetSearchResultContext) as React.Dispatch<
    React.SetStateAction<Video[]>
  >;

export const useSearchLoading = () => useContext(SearchLoadingContext);
