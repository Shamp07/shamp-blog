import { observable, flow } from 'mobx';
import cookie from 'js-cookie';
import axios from 'axios';

import * as T from '@types';
import utilStore from './utilStore';

export interface SignStore {
  authChecked: boolean;
  userData: T.User | null;
  authCheck(): void;
  signIn(form: {
    email: string;
    password: string;
  }): Promise<T.Response<T.EncodedAuthToken>>;
  signOut(): void;
}

export const initialSign: Pick<SignStore, 'authChecked' | 'userData'> = {
  authChecked: false,
  userData: null,
};

const signStore: SignStore = {
  authChecked: false,
  userData: null,
  authCheck: flow(function* (this: SignStore) {
    const { data } = yield axios.get(`${process.env.BASE_PATH}/api/user/cookie`);
    this.userData = data.result;
    this.authChecked = true;
  }),
  async signIn(signInForm) {
    const res = await axios.post('/api/user/login', signInForm);
    return res.data;
  },
  signOut() {
    utilStore.closeHeaderMenu();
    cookie.remove('auth');
    this.userData = null;
  },
};

export default (() => {
  let instance: SignStore | undefined;
  const initialize = (initialState = initialSign) => ({
    ...signStore,
    ...initialState,
  });
  return (initialState = initialSign) => {
    if (!instance) {
      instance = initialize(initialState);
    }
    return observable(instance);
  };
})();
