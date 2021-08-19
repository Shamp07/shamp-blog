import { enableStaticRendering } from 'mobx-react-lite';
import alertStore, { AlertStore } from './alertStore';
import categoryStore, { CategoryStore } from './categoryStore';
import commentStore, { CommentStore } from './commentStore';
import homeStore, { HomeStore } from './homeStore';
import postStore, { PostStore } from './postStore';
import sidebarStore, { SidebarStore } from './sidebarStore';
import signStore, { SignStore } from './signStore';
import utilStore, { UtilStore } from './utilStore';
import chatStore, { ChatStore } from './chatStore';

const isServer = typeof window === 'undefined';
enableStaticRendering(isServer);

// export const initialRoot = {
//   CategoryStore: initialCategory,
//   PostStore: initialPost,
//   CommentStore: initialComment,
//   HomeStore: initialHome,
// };

export interface RootStore {
  alertStore: AlertStore;
  categoryStore: CategoryStore;
  commentStore: CommentStore;
  homeStore: HomeStore;
  postStore: PostStore;
  sidebarStore: SidebarStore;
  signStore: SignStore;
  utilStore: UtilStore;
  chatStore: ChatStore;
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
      chatStore,
    };
  }
  return () => {
    if (!instance) {
      instance = initialize();
    }
    return instance;
  };
})();
