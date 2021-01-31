import { action, makeObservable, observable } from 'mobx';

class AlertStore {
  @observable isOpenAlertModal: boolean = false;

  @observable text: string = '';

  constructor() {
    makeObservable(this);
  }

  @action toggleAlertModal = (text: string) => {
    this.text = text;
    this.isOpenAlertModal = !this.isOpenAlertModal;
  };

  @action closeAlertModal = () => {
    this.isOpenAlertModal = false;
  };
}

export default AlertStore;
