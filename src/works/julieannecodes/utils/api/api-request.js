import { url, commonFetch } from './utils';

export const getDates = async () => {
  return commonFetch(`${url}/get-dates`, { method: 'GET' });
};

export const addRequest = async (request) => {
  return commonFetch(`${url}/add-request`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
};

export const deleteRequest = async (request) => {
  return commonFetch(`${url}/delete-request/${request.id}`, {
    method: 'DELETE',
  });
};

export const getRequests = async () => {
  return commonFetch(`${url}/get-requests`, { method: 'GET' });
};

export const orderBy = async (request) => {
  return commonFetch(`${url}/order-by?orderType=${request.orderType}&order=${request.orderAsc}`, {
    method: 'POST',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    body: `orderType=${request.orderType}&order=${request.order}`,
  });
};
