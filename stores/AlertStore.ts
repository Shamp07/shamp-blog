import { makeObservable } from 'mobx';
import makeAnnotations from '../util/Mobx';

class AlertStore {
  isOpenAlertModal = false;

  text = '';

  constructor() {
    makeObservable(this, makeAnnotations({
      observables: ['isOpenAlertModal', 'text'],
      actions: ['toggleAlertModal', 'closeAlertModal'],
    }));
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
