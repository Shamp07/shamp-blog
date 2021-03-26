import { makeObservable } from 'mobx';
import React from 'react';
import makeAnnotations from '../util/Mobx';

class UtilStore {
  headerMenu: string | null = null;

  headerMenuElement: Element | null = null;

  isOpenConfirmModal = false;

  callback: Function | undefined;

  text = '';

  constructor() {
    makeObservable(this, makeAnnotations<this>({
      observables: ['headerMenu', 'isOpenConfirmModal', 'callback', 'text'],
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

  openHeaderMenu = (event: React.MouseEvent<HTMLElement>): void => {
    this.headerMenu = event.currentTarget.getAttribute('name');
    this.headerMenuElement = event.currentTarget;
  };

  closeHeaderMenu = () => {
    this.headerMenu = null;
  };
}

export default UtilStore;
