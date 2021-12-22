import homeStore, { HomeStore, initialHome } from './homeStore';
import postStore, { PostStore, initialPost } from './postStore';
import signStore, { SignStore } from './signStore';
import utilStore, { UtilStore } from './utilStore';

export const initialRoot = {
  postStore: initialPost,
  homeStore: initialHome,
};

export interface RootStore {
  homeStore: HomeStore;
  postStore: PostStore;
  signStore: SignStore;
  utilStore: UtilStore;
}

export default (() => {
  let instance: RootStore | undefined;
  const initialize = (initialStore = initialRoot) => ({
    postStore: postStore(initialStore.postStore),
    homeStore: homeStore(initialStore.homeStore),
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
