import SidebarStore from './SidebarStore';
import SignStore from './SignStore';
import AlertStore from './AlertStore';

class RootStore {
  SidebarStore: SidebarStore;

  SignStore: SignStore;

  AlertStore: AlertStore;

  constructor() {
    this.SidebarStore = new SidebarStore(this);
    this.SignStore = new SignStore(this);
    this.AlertStore = new AlertStore(this);
  }
}

export default new RootStore();
