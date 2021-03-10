import axios, { AxiosResponse } from 'axios';

interface AxiosType {
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: any,
  success: (response: AxiosResponse) => void,
  fail?: (response: AxiosResponse) => void,
  complete?: (response: AxiosResponse) => void,
}

const Axios = ({
  method, url, data, success, fail, complete,
}: AxiosType) => {
  let axiosRequest;
  switch (method) {
    case 'get':
      axiosRequest = axios.get;
      break;
    case 'post':
      axiosRequest = axios.post;
      break;
    case 'put':
      axiosRequest = axios.put;
      break;
    case 'delete':
      axiosRequest = axios.delete;
      break;
    default:
  }

  if (!axiosRequest) throw new Error('axiosRequest is undefined');

  axiosRequest(url, getConfigParams(method, data)).then((response) => {
    if (response.data.success) success(response);
    else if (fail) fail(response);
    if (complete) complete(response);
  }).catch((response) => console.error(response));
};

const getConfigParams = (method: 'get' | 'post' | 'put' | 'delete', data: any) => {
  if (method === 'get' || method === 'delete') {
    return { params: data };
  }
  return data;
};

export default Axios;
