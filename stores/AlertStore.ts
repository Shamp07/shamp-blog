import { action, makeObservable, observable } from 'mobx';

class AlertStore {
  root: any;

  @observable isOpenAlertModal: boolean = false;

  @observable text: string = '';

  constructor(root: any) {
    makeObservable(this);
  }

  @action toggleAlertModal = (text: string) => {
    this.text = text;
    this.isOpenAlertModal = !this.isOpenAlertModal;
  };
}

export default AlertStore;
