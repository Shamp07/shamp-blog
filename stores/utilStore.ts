import { observable } from 'mobx';
import { MouseEvent } from 'react';

import * as T from '@types';
import alertStore from './alertStore';

export interface UtilStore {
  popup: T.Popup;
  headerMenu: string | null;
  headerMenuElement: Element | null;
  isOpenConfirmModal: boolean;
  callback: (() => void) | null;
  text: string;
  toggleConfirmModal(text: string, callback: (() => void) | null): void;
  callFunction(callback: (() => void) | null): void;
  closeConfirmModal(): void;
  openHeaderMenu(event: MouseEvent<HTMLElement>): void;
  closeHeaderMenu(): void;
}

const utilStore: UtilStore = {
  headerMenu: null,
  headerMenuElement: null,
  isOpenConfirmModal: false,
  callback: null,
  text: '',
  toggleConfirmModal(text, callback) {
    this.isOpenConfirmModal = !this.isOpenConfirmModal;
    this.text = text;
    this.callback = callback;
  },
  callFunction(callback) {
    if (callback) callback();
    this.closeConfirmModal();
  },
  closeConfirmModal() {
    this.isOpenConfirmModal = false;
  },
  openHeaderMenu(event) {
    if (!this.headerMenu) {
      alertStore.getAlertList();
    }

    this.headerMenu = event.currentTarget.getAttribute('name');
    this.headerMenuElement = event.currentTarget;
  },
  closeHeaderMenu() {
    this.headerMenu = null;
  },
};

export default observable(utilStore);
