import postStore, { PostStore, initialPost } from './postStore';
import signStore, { SignStore, initialSign } from './signStore';
import utilStore, { UtilStore } from './utilStore';

export const initialRoot = {
  signStore: initialSign,
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
    signStore: signStore(initialStore.signStore),
    utilStore,
  });

  return (initialStore = initialRoot) => {
    if (!instance) {
      instance = initialize(initialStore);
    }
    return instance;
  };
})();
