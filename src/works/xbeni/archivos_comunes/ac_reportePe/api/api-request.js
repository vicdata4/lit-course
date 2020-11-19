import { url, commonFetch } from '../../ac_reportePe/api/utils';

export const getEmployesPe = async () => {
  return commonFetch(`${url}/get-employes-pe`, { method: 'GET' });
};

export const getRegistersPe = async () => {
  return commonFetch(`${url}/get-registers-pe`, { method: 'GET' });
};
