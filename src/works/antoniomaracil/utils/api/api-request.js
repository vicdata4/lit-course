import { url, commonFetch } from './utils';

export const getInfo = async () => {
  return commonFetch(`${url}/get-data`, { method: 'GET' });
};

export const updateItem = async (data) => {
  return commonFetch(`${url}/update-data`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};
