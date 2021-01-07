import SidebarStore from './SidebarStore';
import SignStore from './SignStore';
import AlertStore from './AlertStore';
import PostStore from './PostStore';
import CategoryStore from './CategoryStore';

class RootStore {
  SidebarStore: SidebarStore;

  SignStore: SignStore;

  AlertStore: AlertStore;

  PostStore: PostStore;

  CategoryStore: CategoryStore;

  constructor() {
    this.SidebarStore = new SidebarStore(this);
    this.SignStore = new SignStore(this);
    this.AlertStore = new AlertStore(this);
    this.PostStore = new PostStore(this);
    this.CategoryStore = new CategoryStore(this);
  }
}

export default new RootStore();
