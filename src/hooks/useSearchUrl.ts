import qs from "qs";

import { useSearchValues } from "../providers/Search";

export const useSearchUrl = () => {
  const searchValues = useSearchValues();
  let searchUrl = "/search";

  if (searchValues.q.length > 0) {
    searchUrl = `/search?q=${qs.stringify(searchValues)}`;
  }

  return searchUrl;
};
