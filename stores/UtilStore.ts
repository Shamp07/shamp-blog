import { makeObservable } from 'mobx';
import React from 'react';

import makeAnnotations from '@util/Mobx';
import AlertStore from './AlertStore';

class UtilStore {
  AlertStore: AlertStore;

  headerMenu: string | null = null;

  headerMenuElement: Element | null = null;

  isOpenConfirmModal = false;

  callback: (() => void | undefined) | undefined;

  text = '';

  constructor(root: { AlertStore: AlertStore }) {
    this.AlertStore = root.AlertStore;
    makeObservable(this, makeAnnotations<this>({
      observables: ['headerMenu', 'isOpenConfirmModal', 'callback', 'text'],
      actions: ['toggleConfirmModal', 'callFunction', 'closeConfirmModal'],
    }));
  }

  toggleConfirmModal = (text: string, callback: () => void): void => {
    this.isOpenConfirmModal = !this.isOpenConfirmModal;
    this.text = text;
    this.callback = callback;
  };

  callFunction = (callback: () => void): void => {
    if (callback) callback();
    this.closeConfirmModal();
  };

  closeConfirmModal = (): void => {
    this.isOpenConfirmModal = false;
  };

  openHeaderMenu = (event: React.MouseEvent<HTMLElement>): void => {
    if (!this.headerMenu) {
      this.AlertStore.getAlertList();
    }

    this.headerMenu = event.currentTarget.getAttribute('name');
    this.headerMenuElement = event.currentTarget;
  };

  closeHeaderMenu = () => {
    this.headerMenu = null;
  };
}

export default UtilStore;
