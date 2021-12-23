import { observable } from 'mobx';
import { MouseEvent } from 'react';

export interface UtilStore {
  menu: {
    name: string | null;
    element: Element | null;
  }
  openHeaderMenu(event: MouseEvent<HTMLElement>): void;
  closeHeaderMenu(): void;
}

const utilStore: UtilStore = {
  menu: {
    name: null,
    element: null,
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
