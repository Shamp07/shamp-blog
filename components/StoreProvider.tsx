import React, { createContext, useContext } from 'react';
import RootStore from '../stores/store';

let store: any;
export const StoreContext: any = createContext();

export function useStores() {
  const context = useContext(StoreContext);
  console.log('useStores!');
  if (context === undefined) {
    throw new Error('useStore must be used within StoreProvider');
  }

  return context;
}

export function StoreProvider({ children, initialState: initialData }: any) {
  const store: RootStore = initializeStore(initialData);
  console.log(StoreContext);
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}

function initializeStore(initialData = null) {
  const storeInstance: any = store ?? new RootStore();

  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here, check `pages/ssg.js` and `pages/ssr.js` for more details
  if (initialData) {
    storeInstance.hydrate(initialData);
  }
  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return storeInstance;
  // Create the store once in the client
  if (!store) store = storeInstance;

  return storeInstance;
}
