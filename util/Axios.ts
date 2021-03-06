import axios, { AxiosResponse } from 'axios';

interface AxiosType {
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: any,
  success?: (response: AxiosResponse) => void,
  fail?: (response: AxiosResponse) => void,
  complete?: (response: AxiosResponse) => void,
}

const Axios = async ({
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

  await axiosRequest(url, getConfigParams(method, data)).then((response) => {
    if (response.data.success) {
      if (success) success(response);
    } else if (fail) fail(response);
    if (complete) complete(response);
    // eslint-disable-next-line no-console
  }).catch((response) => console.error(response));
};

const getConfigParams = (method: AxiosType['method'], data: AxiosType['data']) => {
  if (method === 'get' || method === 'delete') {
    return { params: data };
  }
  return data;
};

export default Axios;
