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
  openPopup(type: T.Popup, description?: string, callback?: (() => void) | undefined): void;
  closePopup(): void;
  confirm(callback: (() => void) | undefined): void;
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
  openPopup(type, description, callback) {
    this.popup = { type, description, callback };
  },
  closePopup() {
    this.popup.type = undefined;
  },
  confirm(callback) {
    if (callback) callback();
    this.closePopup();
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
