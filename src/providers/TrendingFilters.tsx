import qs from "qs";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import { getName, getCode } from "country-list";
import { TrendingFilterType } from "../components/TrendingFilters";
export interface TrendingFilters {
  type: TrendingFilterType;
  region: string;
}

const initialState: TrendingFilters = {
  type: "music",
  region: getCode(
    getName(navigator.language.split("-")[0]?.toUpperCase() ?? "US")
  ),
};

const TrendingFiltersValuesContext =
  createContext<TrendingFilters>(initialState);
const SetTrendingFiltersValuesContext = createContext<any>(null);

interface ProviderProps {
  children: React.ReactNode;
}

const getInitialParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    type: (urlParams.get("type") as TrendingFilterType) ?? initialState.type,
    region: (urlParams.get("region") as string) ?? initialState.region,
  };
};

export const TrendingFiltersProvider: React.FC<ProviderProps> = ({
  children,
}) => {
  const [value, setValue] = useState<TrendingFilters>(getInitialParams());
  const navigate = useNavigate();

  const handleSetValue = useCallback(
    (updatedValues: TrendingFilters) => {
      setValue(updatedValues);
      navigate(`/trending?${qs.stringify(updatedValues)}`);
    },
    [navigate]
  );

  const params = useMemo(
    () => ({
      value,
      setValue: handleSetValue,
    }),
    [value, handleSetValue]
  );

  return (
    <TrendingFiltersValuesContext.Provider value={params.value}>
      <SetTrendingFiltersValuesContext.Provider value={params.setValue}>
        {children}
      </SetTrendingFiltersValuesContext.Provider>
    </TrendingFiltersValuesContext.Provider>
  );
};

export const useTrendingFiltersValues = () =>
  useContext(TrendingFiltersValuesContext);
export const useSetTrendingFiltersValues = () =>
  useContext(SetTrendingFiltersValuesContext);
export const useTrendingUrl = () => {
  const params = useTrendingFiltersValues();
  return `/trending?${qs.stringify(params)}`;
};
