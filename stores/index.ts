import { enableStaticRendering } from 'mobx-react-lite';
import SidebarStore from './SidebarStore';
import SignStore from './SignStore';
import AlertStore from './AlertStore';
import PostStore from './PostStore';
import CategoryStore, { initialCategory } from './CategoryStore';

const isServer = typeof window === 'undefined';
enableStaticRendering(isServer);

let store: any = null;

const initialRoot = {
  categoryStore: initialCategory,
};

export class RootStore {
  SidebarStore: SidebarStore;

  SignStore: SignStore;

  AlertStore: AlertStore;

  PostStore: PostStore;

  CategoryStore: CategoryStore;

  constructor(initialData: any) {
    this.SidebarStore = new SidebarStore(this);
    this.SignStore = new SignStore(this);
    this.AlertStore = new AlertStore(this);
    this.PostStore = new PostStore(this);
    this.CategoryStore = new CategoryStore(initialData.categoryStore, this);
  }
}
export default function initializeStore(initialData = initialRoot) {
  if (isServer) {
    return new RootStore(initialData);
  }
  if (store === null) {
    store = new RootStore(initialData);
  }
  return store;
}
