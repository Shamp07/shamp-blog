import { makeObservable } from 'mobx';
import React from 'react';
import makeAnnotations from '../util/Mobx';

class UtilStore {
  profileMenu: HTMLElement | null = null;

  isOpenConfirmModal = false;

  callback: Function | undefined;

  text = '';

  constructor() {
    makeObservable(this, makeAnnotations<this>({
      observables: ['profileMenu', 'isOpenConfirmModal', 'callback', 'text'],
      actions: ['toggleConfirmModal', 'callFunction', 'closeConfirmModal'],
    }));
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
    event?: React.MouseEvent<HTMLLIElement | HTMLAnchorElement, MouseEvent>,
  ): void => {
    if (!this.profileMenu && event) this.profileMenu = event.currentTarget;
    else this.profileMenu = null;
  };
}

export default UtilStore;
