import { action, makeObservable, observable } from 'mobx';

class UtilStore {
  @observable isOpenConfirmModal: boolean = false;

  @observable callback: Function | undefined;

  @observable text: string = '';

  constructor() {
    makeObservable(this);
  }

  @action toggleConfirmModal = (text: string, callback: Function | undefined): void => {
    this.isOpenConfirmModal = !this.isOpenConfirmModal;
    this.text = text;
    this.callback = callback;
  };

  @action callFunction = (callback: Function): void => {
    callback();
    this.closeConfirmModal();
  };

  @action closeConfirmModal = (): void => {
    this.isOpenConfirmModal = false;
  };
}

export default UtilStore;
