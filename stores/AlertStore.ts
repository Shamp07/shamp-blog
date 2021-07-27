import { makeObservable } from 'mobx';
import { NextRouter } from 'next/dist/next-server/lib/router/router';

import makeAnnotations from '@util/Mobx';
import Axios from '@util/Axios';
import * as T from '@types';

class AlertStore {
  isOpenAlertModal = false;

  text = '';

  alertLoading = true;

  alertList: Array<T.Alert> = [];

  alertSize = 10;

  alertNotReadSize = 0;

  constructor() {
    makeObservable(this, makeAnnotations<this>({
      observables: ['isOpenAlertModal', 'text', 'alertList', 'alertLoading', 'alertSize'],
      actions: ['toggleAlertModal', 'closeAlertModal', 'getAlertList', 'moreAlert'],
    }));
  }

  moreAlert = () => {
    this.alertSize += 10;
    this.getAlertList();
  };

  getAlertList = () => {
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
  };

  movePost = (router: NextRouter, postId: number, alertId: number) => {
    Axios({
      method: T.RequestMethod.PUT,
      data: {
        id: alertId,
      },
      url: '/api/user/alert',
    });

    router.push(`/post/${postId}`);
  };

  toggleAlertModal = (text: string) => {
    this.text = text;
    this.isOpenAlertModal = !this.isOpenAlertModal;
  };

  closeAlertModal = () => {
    this.isOpenAlertModal = false;
  };
}

export default AlertStore;
