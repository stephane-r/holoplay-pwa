import { useSearchValues } from "../providers/Search";

export const useSearchUrl = () => {
  const searchValues = useSearchValues();
  let searchUrl = "/search";

  if (searchValues.query.length > 0) {
    searchUrl = `/search?query=${searchValues.query}&type=${searchValues.type}`;
  }

  return searchUrl;
};
