import { observable } from 'mobx';

import Axios from '@utilities/axios';
import * as T from '@types';

export interface AlertStore {
  list: T.Alert[];
  isLoading: boolean;
  getAlertList(size?: number): void;
  readAlert(id: number): void;
}

const alertStore: AlertStore = {
  list: [],
  isLoading: true,
  getAlertList(size = 10) {
    this.isLoading = true;
    Axios({
      method: T.RequestMethod.GET,
      data: {
        size,
      },
      url: '/api/user/alert',
      success: (response) => {
        const { result } = response.data;
        this.list = result;
        this.isLoading = false;
      },
    });
  },
  readAlert(id) {
    Axios({
      method: T.RequestMethod.PUT,
      data: {
        id,
      },
      url: '/api/user/alert',
    });
  },
};

export default observable(alertStore);
