import SidebarStore from './SidebarStore';

class RootStore {
  SidebarStore: SidebarStore;

  constructor() {
    this.SidebarStore = new SidebarStore(this);
  }
}

export default new RootStore();
