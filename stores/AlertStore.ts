import { makeObservable } from 'mobx';
import makeAnnotations from '../util/Mobx';
import Axios from '../util/Axios';
import {NextRouter} from "next/dist/next-server/lib/router/router";

export interface AlertType {
  id: number;
  content: string;
  postId: number;
  readFl: boolean;
  time: string;
}

class AlertStore {
  isOpenAlertModal = false;

  text = '';

  alertLoading = true;

  alertList = [];

  alertSize = 10;

  constructor() {
    makeObservable(this, makeAnnotations<this>({
      observables: ['isOpenAlertModal', 'text', 'alertList', 'alertLoading'],
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
      method: 'get',
      data: {
        size: this.alertSize,
      },
      url: '/api/user/alert',
      success: (response) => {
        const { result } = response.data;
        this.alertList = result;
        this.alertLoading = false;
      },
    });
  };

  movePost = (router: NextRouter, postId: number, alertId: number): void => {
    Axios({
      method: 'put',
      data: {
        id: alertId,
      },
      url: '/api/user/alert',
    });

    router.push(`/post/${postId}`);
  };

  toggleAlertModal = (text: string): void => {
    this.text = text;
    this.isOpenAlertModal = !this.isOpenAlertModal;
  };

  closeAlertModal = (): void => {
    this.isOpenAlertModal = false;
  };
}

export default AlertStore;
