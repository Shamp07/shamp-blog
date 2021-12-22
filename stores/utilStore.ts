import { observable } from 'mobx';
import { MouseEvent } from 'react';

import * as T from '@types';

export interface UtilStore {
  popup: {
    type: T.Popup | null;
    description: string | undefined;
    callback: (() => void) | undefined;
  };
  menu: {
    name: string | null;
    element: Element | null;
  }
  openPopup(type: T.Popup, description?: string, callback?: (() => void) | undefined): void;
  closePopup(): void;
  confirm(callback: (() => void) | undefined): void;
  openHeaderMenu(event: MouseEvent<HTMLElement>): void;
  closeHeaderMenu(): void;
}

const utilStore: UtilStore = {
  popup: {
    type: null,
    description: undefined,
    callback: undefined,
  },
  menu: {
    name: null,
    element: null,
  },
  openPopup(type, description, callback) {
    this.popup = { type, description, callback };
  },
  closePopup() {
    this.popup.type = null;
  },
  confirm(callback) {
    if (callback) callback();
    this.closePopup();
  },
  openHeaderMenu(event) {
    const element = event.currentTarget;
    this.menu = { name: element.getAttribute('name'), element };
  },
  closeHeaderMenu() {
    this.menu = { name: null, element: null };
  },
};

export default observable(utilStore);
