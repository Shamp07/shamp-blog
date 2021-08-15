import { observable } from 'mobx';
import { MouseEvent } from 'react';

import alertStore from './alertStore';

const utilStore = observable({
  headerMenu: null,
  headerMenuElement: null,
  isOpenConfirmModal: false,
  callback: undefined,
  text: '',
  toggleConfirmModal(text: string, callback: (() => void) | undefined) {
    this.isOpenConfirmModal = !this.isOpenConfirmModal;
    this.text = text;
    this.callback = callback;
  },
  callFunction(callback: (() => void) | undefined) {
    if (callback) callback();
    this.closeConfirmModal();
  },
  closeConfirmModal() {
    this.isOpenConfirmModal = false;
  },
  openHeaderMenu(event: MouseEvent<HTMLElement>) {
    if (!this.headerMenu) {
      alertStore.getAlertList();
    }

    this.headerMenu = event.currentTarget.getAttribute('name');
    this.headerMenuElement = event.currentTarget;
  },
  closeHeaderMenu() {
    this.headerMenu = null;
  },
});

export default utilStore;
