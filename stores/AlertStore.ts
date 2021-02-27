import { action, makeObservable, observable } from 'mobx';

class AlertStore {
  isOpenAlertModal = false;

  text = '';

  constructor() {
    makeObservable(this, {
      isOpenAlertModal: observable,
      text: observable,
      toggleAlertModal: action,
      closeAlertModal: action,
    });
  }

  toggleAlertModal = (text: string): void => {
    this.text = text;
    this.isOpenAlertModal = !this.isOpenAlertModal;
  };

  closeAlertModal = (): void => {
    this.isOpenAlertModal = false;
  };
}

export default AlertStore;
