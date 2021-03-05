import axios from 'axios';
import logger from '../config/log.config';

const axiosWrap = (
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  requestData: any,
  isServer: boolean,
) => {
  let axiosRequest;
  switch (method) {
    case 'get':
      axiosRequest = axios.get(url, getConfigParams(method, requestData));
      break;
    case 'post':
      axiosRequest = axios.post(url, getConfigParams(method, requestData));
      break;
    case 'put':
      axiosRequest = axios.put(url, getConfigParams(method, requestData));
      break;
    case 'delete':
      axiosRequest = axios.delete(url, getConfigParams(method, requestData));
      break;
    default:
  }

  if (!axiosRequest) return new Error('axiosRequest is undefined');

  axiosRequest.then((response) => {
    const { data } = response;
    console.log(data);
  }).catch((response) => {
    if (isServer) logger.error(response);
  });
};

const getConfigParams = (method: 'get' | 'post' | 'put' | 'delete', data: any) => {
  if (method === 'get' || method === 'delete') {
    return { params: data };
  }
  return data;
};

export default axiosWrap;
