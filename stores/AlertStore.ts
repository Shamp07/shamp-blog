import { makeObservable } from 'mobx';
import makeAnnotations from '../util/Mobx';
import Axios from '../util/Axios';

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
      actions: ['toggleAlertModal', 'closeAlertModal', 'getAlertList'],
    }));
  }

  getAlertList = () => {
    this.alertLoading = true;
    Axios({
      method: 'get',
      data: {
        alertSize: this.alertSize,
      },
      url: '/api/user/alert',
      success: (response) => {
        const { result } = response.data;
        this.alertList = result;
        this.alertLoading = false;
      },
    });
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
