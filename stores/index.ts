import alertStore, { AlertStore } from './alertStore';
import categoryStore, { CategoryStore, initialCategory } from './categoryStore';
import commentStore, { CommentStore, initialComment } from './commentStore';
import homeStore, { HomeStore, initialHome } from './homeStore';
import postStore, { PostStore, initialPost } from './postStore';
import sidebarStore, { SidebarStore } from './sidebarStore';
import signStore, { SignStore } from './signStore';
import utilStore, { UtilStore } from './utilStore';

export const initialRoot = {
  categoryStore: initialCategory,
  postStore: initialPost,
  commentStore: initialComment,
  homeStore: initialHome,
};

export interface RootStore {
  alertStore: AlertStore;
  categoryStore: CategoryStore;
  commentStore: CommentStore;
  homeStore: HomeStore;
  postStore: PostStore;
  sidebarStore: SidebarStore;
  signStore: SignStore;
  utilStore: UtilStore;
}

export default (() => {
  let instance: RootStore | undefined;
  const initialize = (initialStore = initialRoot) => ({
    categoryStore: categoryStore(initialStore.categoryStore),
    commentStore: commentStore(initialStore.commentStore),
    postStore: postStore(initialStore.postStore),
    homeStore: homeStore(initialStore.homeStore),
    alertStore,
    sidebarStore,
    signStore,
    utilStore,
  });

  return (initialStore = initialRoot) => {
    if (!instance) {
      instance = initialize(initialStore);
    }
    return instance;
  };
})();
