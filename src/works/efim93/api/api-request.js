import { url, commonFetch } from './utils';

export const getInfo = async () => {
  return commonFetch(`${url}/get-reg`, { method: 'GET' });
};
export const getInfoDetail = async () => {
  return commonFetch(`${url}/get-reg-detail`, { method: 'GET' });
};

export const updateItem = async (data) => {
  return commonFetch(`${url}/update-reg/id`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};
