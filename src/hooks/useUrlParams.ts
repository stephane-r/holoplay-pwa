export const useUrlParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams;
};
