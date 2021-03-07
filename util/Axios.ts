import axios, { AxiosResponse } from 'axios';

const Axios = (
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data: any,
  isServer: boolean,
  callback: (response: AxiosResponse<any>) => void,
) => {
  let axiosRequest;
  switch (method) {
    case 'get':
      axiosRequest = axios.get(url, getConfigParams(method, data));
      break;
    case 'post':
      axiosRequest = axios.post(url, getConfigParams(method, data));
      break;
    case 'put':
      axiosRequest = axios.put(url, getConfigParams(method, data));
      break;
    case 'delete':
      axiosRequest = axios.delete(url, getConfigParams(method, data));
      break;
    default:
  }

  if (!axiosRequest) throw new Error('axiosRequest is undefined');

  axiosRequest.then((response) => callback(response)).catch((response) => console.error(response));
};

const getConfigParams = (method: 'get' | 'post' | 'put' | 'delete', data: any) => {
  if (method === 'get' || method === 'delete') {
    return { params: data };
  }
  return data;
};

export default Axios;
