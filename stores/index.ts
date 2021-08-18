import { enableStaticRendering } from 'mobx-react-lite';
import alertStore, { AlertStore } from './alertStore';
import categoryStore, { CategoryStore } from './categoryStore';
import commentStore, { CommentStore } from './commentStore';
import homeStore, { HomeStore } from './homeStore';
import postStore, { PostStore } from './postStore';
import sidebarStore, { SidebarStore } from './sidebarStore';
import signStore, { SignStore } from './signStore';
import utilStore, { UtilStore } from './utilStore';

const isServer = typeof window === 'undefined';
enableStaticRendering(isServer);

// export const initialRoot = {
//   CategoryStore: initialCategory,
//   PostStore: initialPost,
//   CommentStore: initialComment,
//   HomeStore: initialHome,
// };
//

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
  function initialize() {
    return {
      alertStore,
      categoryStore,
      commentStore,
      homeStore,
      postStore,
      sidebarStore,
      signStore,
      utilStore,
    };
  }
  return () => {
    if (!instance) {
      instance = initialize();
    }
    return instance;
  };
})();

// export function initializeStore(initialData = initialRoot) {
//   if (isServer) {
//     return new RootStore(initialData);
//   }
//   if (store === null) {
//     store = new RootStore(initialData);
//   }
//   return store;
// }
