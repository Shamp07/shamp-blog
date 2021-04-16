import { enableStaticRendering } from 'mobx-react-lite';
import SidebarStore from './SidebarStore';
import SignStore from './SignStore';
import AlertStore from './AlertStore';
import PostStore, { initialPost } from './PostStore';
import CategoryStore, { initialCategory } from './CategoryStore';
import CommentStore, { initialComment } from './CommentStore';
import HomeStore, { initialHome } from './HomeStore';
import UtilStore from './UtilStore';
import ChatStore from './ChatStore';

const isServer = typeof window === 'undefined';
enableStaticRendering(isServer);

let store: RootStore | null = null;

export const initialRoot = {
  CategoryStore: initialCategory,
  PostStore: initialPost,
  CommentStore: initialComment,
  HomeStore: initialHome,
};

export class RootStore {
  SidebarStore: SidebarStore;

  SignStore: SignStore;

  AlertStore: AlertStore;

  PostStore: PostStore;

  CategoryStore: CategoryStore;

  CommentStore: CommentStore;

  HomeStore: HomeStore;

  UtilStore: UtilStore;

  ChatStore: ChatStore;

  constructor(initialData = initialRoot) {
    this.AlertStore = new AlertStore();
    this.SidebarStore = new SidebarStore();
    this.UtilStore = new UtilStore(this);
    this.ChatStore = new ChatStore(this);
    this.SignStore = new SignStore(this);
    this.PostStore = new PostStore(initialData.PostStore, this);
    this.CategoryStore = new CategoryStore(initialData.CategoryStore);
    this.CommentStore = new CommentStore(initialData.CommentStore, this);
    this.HomeStore = new HomeStore(initialData.HomeStore, this);
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
