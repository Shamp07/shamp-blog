import { enableStaticRendering } from 'mobx-react-lite';
import SidebarStore from './SidebarStore';
import SignStore from './SignStore';
import AlertStore from './AlertStore';
import PostStore, { initialPost } from './PostStore';
import CategoryStore, { initialCategory } from './CategoryStore';
import CommentStore from './CommentStore';

const isServer = typeof window === 'undefined';
enableStaticRendering(isServer);

let store: any = null;

const initialRoot = {
  CategoryStore: initialCategory,
  PostStore: initialPost,
};

export class RootStore {
  SidebarStore: SidebarStore;

  SignStore: SignStore;

  AlertStore: AlertStore;

  PostStore: PostStore;

  CategoryStore: CategoryStore;

  CommentStore: CommentStore;

  constructor(initialData: any) {
    this.SidebarStore = new SidebarStore();
    this.SignStore = new SignStore();
    this.AlertStore = new AlertStore();
    this.PostStore = new PostStore(initialData.PostStore);
    this.CategoryStore = new CategoryStore(initialData.CategoryStore);
    this.CommentStore = new CommentStore();
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
