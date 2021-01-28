import { action, makeObservable, observable } from 'mobx';

class UtilStore {
  @observable isOpenConfirmModal: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @action toggleSignModal = () => {
    this.isOpenConfirmModal = !this.isOpenConfirmModal;
  };
}

export default UtilStore;
