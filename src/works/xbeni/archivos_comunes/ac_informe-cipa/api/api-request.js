import { url, commonFetch } from '../../ac_informe-cipa/api/utils';

export const getInfoCipa = async () => {
  return commonFetch(`${url}/get-users-cipa`, { method: 'GET' });
};
