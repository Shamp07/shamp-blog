import { observable } from 'mobx';

import Axios from '@utilities/axios';
import * as T from '@types';

export interface AlertStore {
  alerts: T.Alert[];
  isLoading: boolean;
  getAlerts(size?: number): void;
  readAlert(id: number): void;
}

const alertStore: AlertStore = {
  alerts: [],
  isLoading: true,
  getAlerts(size = 10) {
    this.isLoading = true;
    Axios({
      method: T.RequestMethod.GET,
      data: {
        size,
      },
      url: '/api/user/alert',
      success: (response) => {
        const { result } = response.data;
        this.alerts = result;
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
