import { enableStaticRendering } from 'mobx-react';
import { useMemo } from 'react';
import SidebarStore from './SidebarStore';
import SignStore from './SignStore';
import AlertStore from './AlertStore';
import PostStore from './PostStore';
import CategoryStore from './CategoryStore';

enableStaticRendering(typeof window === 'undefined');

let store: any;

class RootStore {

}

function initializeStore(initialData = null) {
  const rootStore: any = store ?? new RootStore();

  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here, check `pages/ssg.js` and `pages/ssr.js` for more details
  if (initialData) {
    rootStore.hydrate(initialData);
  }
  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return rootStore;
  // Create the store once in the client
  if (!store) store = rootStore;

  return rootStore;
}

const useStore = (initialState: any) => useMemo(
  () => initializeStore(initialState), [initialState],
);

export default useStore;
