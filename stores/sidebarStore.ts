import { observable } from 'mobx';

export interface SidebarStore {
  isOpenSidebar: boolean;
  toggleSidebar(): void;
}

const sidebarStore: SidebarStore = {
  isOpenSidebar: false,
  toggleSidebar() {
    this.isOpenSidebar = !this.isOpenSidebar;
  },
};

export default observable(sidebarStore);
