import SidebarStore from './SidebarStore';
import SignStore from './SignStore';
import AlertStore from './AlertStore';
import PostStore from './PostStore';

class RootStore {
  SidebarStore: SidebarStore;

  SignStore: SignStore;

  AlertStore: AlertStore;

  PostStore: PostStore;

  constructor() {
    this.SidebarStore = new SidebarStore(this);
    this.SignStore = new SignStore(this);
    this.AlertStore = new AlertStore(this);
    this.PostStore = new PostStore(this);
  }
}

export default new RootStore();
