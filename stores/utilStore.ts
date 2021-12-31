import { observable } from 'mobx';
import { MouseEvent } from 'react';

enum Popup {
  CONFIRM
}

export interface UtilStore {
  popup: {
    type: Popup | null;
    description: string;
    callback: (() => void) | null;
  },
  menu: {
    name: string | null;
    element: Element | null;
  }
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
