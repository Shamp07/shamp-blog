import { action, makeObservable, observable } from 'mobx';

class AlertStore {
  @observable isOpenAlertModal: boolean = false;

  @observable text: string = '';

  constructor() {
    makeObservable(this);
  }

  @action toggleAlertModal = (text: string): void => {
    this.text = text;
    this.isOpenAlertModal = !this.isOpenAlertModal;
  };

  @action closeAlertModal = (): void => {
    this.isOpenAlertModal = false;
  };
}

export default AlertStore;
