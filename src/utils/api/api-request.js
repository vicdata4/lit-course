import { url, errorHandler } from './utils';

export const getInfo = async () => {
  return fetch(`${url}/get-items`, { method: 'GET' })
    .then(errorHandler)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return { error };
    });
};

export const addItem = async (data) => {
  return fetch(`${url}/add-item`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then(errorHandler)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return { error };
    });
};

export const deleteItem = async (data) => {
  return fetch(`${url}/delete-item/${data.id}`, {
    method: 'DELETE',
  })
    .then(errorHandler)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return { error };
    });
};

export const updateItem = async (data) => {
  return fetch(`${url}/update-item`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then(errorHandler)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return { error };
    });
};
