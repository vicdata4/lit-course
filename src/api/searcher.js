const url = 'https://hn.algolia.com/api/v1/search?query=';

const errorHandler = (response) => {
  if (!response.ok) {
    return { error: response.statusText, errorCode: response.status };
  }
  return response.json();
};

export async function getDataFromApi(query) {
  return fetch(`${url}${query}`, { method: 'GET' })
    .then(errorHandler)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return { error };
    });
}
