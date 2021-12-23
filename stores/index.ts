import postStore, { PostStore, initialPost } from './postStore';
import signStore, { SignStore } from './signStore';
import utilStore, { UtilStore } from './utilStore';

export const initialRoot = {
  postStore: initialPost,
};

export interface RootStore {
  postStore: PostStore;
  signStore: SignStore;
  utilStore: UtilStore;
}

export default (() => {
  let instance: RootStore | undefined;
  const initialize = (initialStore = initialRoot) => ({
    postStore: postStore(initialStore.postStore),
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
