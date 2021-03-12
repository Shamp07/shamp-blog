import { action, makeObservable, observable } from 'mobx';
import React from 'react';

class UtilStore {
  profileMenu: HTMLElement | null = null;

  isOpenConfirmModal = false;

  callback: Function | undefined;

  text = '';

  constructor() {
    makeObservable(this, {
      profileMenu: observable,
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
    if (callback) callback();
    this.closeConfirmModal();
  };

  closeConfirmModal = (): void => {
    this.isOpenConfirmModal = false;
  };

  toggleProfileMenu = (
    event: React.MouseEvent<HTMLLIElement | HTMLAnchorElement, MouseEvent>,
  ): void => {
    if (!this.profileMenu) this.profileMenu = event.currentTarget;
    else this.profileMenu = null;
  };
}

export default UtilStore;
