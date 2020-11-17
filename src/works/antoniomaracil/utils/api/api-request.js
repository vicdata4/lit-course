import { url, commonFetch } from './utils';

export const getVacations = async () => {
  return commonFetch(`${url}/get-vacations`, { method: 'GET' });
};
export const updateVacation = async (data) => {
  return commonFetch(`${url}/update-vacation`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};
export const getFiles = async () => {
  return commonFetch(`${url}/get-files`, { method: 'GET' });
};
export const deleteFile = async (data) => {
  return commonFetch(`${url}/delete-file/${data.id}`, {
    method: 'DELETE',
  });
};
