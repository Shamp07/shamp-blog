import { action, makeObservable, observable } from 'mobx';

class UtilStore {
  isOpenConfirmModal: boolean = false;

  callback: Function | undefined;

  text: string = '';

  constructor() {
    makeObservable(this, {
      isOpenConfirmModal: observable,
      callback: observable,
      text: observable,
      toggleConfirmModal: action,
      callFunction: action,
      closeConfirmModal: action,
    });
  }

  toggleConfirmModal = (text: string, callback: Function | undefined): void => {
    this.isOpenConfirmModal = !this.isOpenConfirmModal;
    this.text = text;
    this.callback = callback;
  };

  callFunction = (callback: Function | undefined): void => {
    if (callback) {
      callback();
    }
    this.closeConfirmModal();
  };

  closeConfirmModal = (): void => {
    this.isOpenConfirmModal = false;
  };
}

export default UtilStore;
