export const getUrlParams = param => {
  return new URLSearchParams(window.location.search).get(param);
};
