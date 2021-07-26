import axios from 'axios';

import * as T from '@types';

const Axios = async ({
  method, url, data, success, fail, complete,
}: T.AxiosType) => {
  let axiosRequest;
  switch (method) {
    case T.RequestMethod.GET:
      axiosRequest = axios.get;
      break;
    case T.RequestMethod.POST:
      axiosRequest = axios.post;
      break;
    case T.RequestMethod.PUT:
      axiosRequest = axios.put;
      break;
    case T.RequestMethod.DELETE:
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

const getConfigParams = (method: T.AxiosType['method'], data: T.AxiosType['data']) => {
  const { GET, DELETE } = T.RequestMethod;
  if ([GET, DELETE].includes(method)) {
    return { params: data };
  }
  return data;
};

export default Axios;
