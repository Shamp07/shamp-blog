import { observable } from 'mobx';
import { MouseEvent } from 'react';

import * as T from '@types';
import alertStore from './alertStore';

export interface UtilStore {
  popup: {
    type: T.Popup | undefined;
    description: string | undefined;
    callback: (() => void) | undefined;
  };
  headerMenu: string | null;
  headerMenuElement: Element | null;
  isOpenConfirmModal: boolean;
  openPopup(type: T.Popup, description?: string, callback?: (() => void) | undefined): void;
  closePopup(): void;
  callFunction(callback: (() => void) | undefined): void;
  openHeaderMenu(event: MouseEvent<HTMLElement>): void;
  closeHeaderMenu(): void;
}

const utilStore: UtilStore = {
  popup: {
    type: undefined,
    description: undefined,
    callback: undefined,
  },
  headerMenu: null,
  headerMenuElement: null,
  isOpenConfirmModal: false,
  openPopup(type, description, callback) {
    this.popup = { type, description, callback };
  },
  closePopup() {
    this.popup.type = undefined;
  },

  callFunction(callback) {
    if (callback) callback();
    this.closeConfirmModal();
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
