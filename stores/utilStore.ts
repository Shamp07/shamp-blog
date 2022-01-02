import { observable } from 'mobx';
import { MouseEvent } from 'react';

import * as T from '@types';

interface Popup {
  type: T.PopupType | null;
  description: string;
  callback: (() => void) | null;
}

export interface UtilStore {
  popup: Popup,
  menu: {
    name: string | null;
    element: Element | null;
  }
  openPopup(popup: Popup): void;
  closePopup(): void;
  openHeaderMenu(event: MouseEvent<HTMLElement>): void;
  closeHeaderMenu(): void;
}

const utilStore: UtilStore = {
  popup: {
    type: null,
    description: '',
    callback: null,
  },
  menu: {
    name: null,
    element: null,
  },
  openPopup(popup) {
    this.popup = popup;
  },
  closePopup() {
    this.popup.type = null;
  },
  openHeaderMenu(event) {
    const element = event.currentTarget;
    const name = element.getAttribute('name');
    this.menu = { name, element };
  },
  closeHeaderMenu() {
    this.menu = { name: null, element: null };
  },
};

export default observable(utilStore);
