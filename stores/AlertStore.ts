import { action, observable } from 'mobx';

class AlertStore {
  root: any;

  @observable isOpenAlertModal: boolean = false;
  @observable text: string = '';

  constructor(root: any) {
    this.root = root;
  }

  @action toggleAlertModal = (text: string) => {
    this.text = text;
    this.isOpenAlertModal = !this.isOpenAlertModal;
  };
}

export default AlertStore;
