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

  alertList = [];

  constructor() {
    makeObservable(this, makeAnnotations<this>({
      observables: ['isOpenAlertModal', 'text', 'alertList'],
      actions: ['toggleAlertModal', 'closeAlertModal', 'getAlertList'],
    }));
  }

  getAlertList = () => {
    Axios({
      method: 'get',
      url: '/api/user/alert',
      success: (response) => {
        const { result } = response.data;
        this.alertList = result;
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
