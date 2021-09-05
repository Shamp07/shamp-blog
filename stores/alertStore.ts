import { observable } from 'mobx';
import { NextRouter } from 'next/dist/next-server/lib/router/router';

import Axios from '@util/Axios';
import * as T from '@types';

export interface AlertStore {
  text: string;
  alertLoading: boolean;
  alertList: T.Alert[];
  alertSize: number;
  alertNotReadSize: number;
  moreAlert(): void;
  getAlertList(): void;
  movePost(router: NextRouter, postId: number, alertId: number): void;
}

const alertStore: AlertStore = {
  text: '',
  alertLoading: true,
  alertList: [],
  alertSize: 10,
  alertNotReadSize: 0,
  moreAlert() {
    this.alertSize += 10;
    this.getAlertList();
  },
  getAlertList() {
    this.alertLoading = true;
    Axios({
      method: T.RequestMethod.GET,
      data: {
        size: this.alertSize,
      },
      url: '/api/user/alert',
      success: (response) => {
        const { result } = response.data;
        this.alertList = result;
        this.alertNotReadSize = this.alertList.filter((data) => !data.readFl).length;
        this.alertLoading = false;
      },
    });
  },
  movePost(router, postId, alertId) {
    Axios({
      method: T.RequestMethod.PUT,
      data: {
        id: alertId,
      },
      url: '/api/user/alert',
    });

    router.push(`/post/${postId}`);
  },
};

export default observable(alertStore);
