import { url, commonFetch } from './utils';

export const getInfo = async () => {
  return commonFetch(`${url}/get-reg`, { method: 'GET' });
};

export const addItem = async (data) => {
  return commonFetch(`${url}/add-reg`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

export const deleteItem = async (data) => {
  return commonFetch(`${url}/delete-reg/${data.id}`, {
    method: 'DELETE',
  });
};

export const updateItem = async (data) => {
  return commonFetch(`${url}/update-reg`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};
