import SidebarStore from './SidebarStore';
import SignStore from './SignStore';

class RootStore {
  SidebarStore: SidebarStore;

  SignStore: SignStore;

  constructor() {
    this.SidebarStore = new SidebarStore(this);
    this.SignStore = new SignStore(this);
  }
}

export default new RootStore();
