import { url, commonFetch } from '../utils';

export const getHours = async () => {
  return commonFetch(`${url}/get-hours`, {
    method: 'GET',
    mode: 'no-cors',
  });
};

export const getRequests = async () => {
  return commonFetch(`${url}/get-requests`, {
    method: 'GET',
    mode: 'no-cors',
  });
};
