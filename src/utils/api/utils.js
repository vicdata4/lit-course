export const url = 'http://localhost:3000';

const errorHandler = (response) => {
  if (!response.ok) {
    return { error: response.statusText, errorCode: response.status };
  }
  return response.json();
};

export const commonFetch = async (url, options) => {
  return fetch(url, options)
    .then(errorHandler)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return { error };
    });
};
