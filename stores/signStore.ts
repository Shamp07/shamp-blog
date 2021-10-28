import { observable } from 'mobx';
import cookie from 'js-cookie';

import Axios from '@utilities/axios';
import * as T from '@types';
import utilStore from './utilStore';

export interface SignStore {
  cookieChecked: boolean;
  userData: T.User | null;
  cookieCheck(): void;
  signIn(form: {
    email: string;
    password: string;
  }): void;
  signUp(form: {
    email: string;
    name: string;
    password: string;
    passwordCheck: string;
  }): void;
  signOut(openAlert: boolean): void;
  resetPassword(currentPassword: string, password: string): void;
  deleteUser(email: string): void;
  verifyEmail(email: string): void;
  verifyCode(email: string, code: string): void;
}

const signStore: SignStore = {
  cookieChecked: false,
  userData: null,
  cookieCheck() {
    Axios({
      method: T.RequestMethod.GET,
      url: '/api/user/cookie',
      success: (response) => {
        const { result } = response.data;
        this.userData = result;
      },
      complete: () => {
        this.cookieChecked = true;
      },
    });
  },
  async signIn(signInForm) {
    await Axios({
      method: T.RequestMethod.POST,
      url: '/api/user/login',
      data: signInForm,
      success: (response) => {
        const { code, message, result } = response.data;
        if (code === 1) {
          cookie.set('token', result, { expires: 2 });
          this.cookieCheck();
          utilStore.closePopup();
          utilStore.openPopup(T.Popup.ALERT, message);
        } else if (code === 2) {
          utilStore.openPopup(T.Popup.ALERT, message);
        }
      },
    });
  },
  signUp(signUpForm) {
    Axios({
      method: T.RequestMethod.POST,
      url: '/api/user',
      data: signUpForm,
      success: (response) => {
        const { code, message } = response.data;
        if (code === 1) {
          this.verifyEmail(signUpForm.email);
        } else {
          utilStore.openPopup(T.Popup.ALERT, message);
        }
      },
    });
  },
  signOut(openAlert: boolean) {
    utilStore.closeHeaderMenu();

    cookie.remove('token');
    this.userData = null;
    if (openAlert) {
      utilStore.openPopup(T.Popup.ALERT, '로그아웃 되었습니다.');
    }
  },
  resetPassword(currentPassword: string, password: string) {
    Axios({
      method: T.RequestMethod.PUT,
      url: '/api/user/password',
      data: {
        currentPassword,
        password,
      },
      success: (response) => {
        const { code, message } = response.data;
        if (code === 1) {
          this.signOut(false);
        }
        utilStore.openPopup(T.Popup.ALERT, message);
      },
    });
  },
  deleteUser(email) {
    Axios({
      method: T.RequestMethod.DELETE,
      url: '/api/user',
      data: {
        email,
      },
      success: (response) => {
        const { code, message } = response.data;
        if (code === 1) {
          this.signOut(true);
        }
        utilStore.openPopup(T.Popup.ALERT, message);
      },
    });
  },
  verifyEmail(email: string) {
    Axios({
      method: T.RequestMethod.PUT,
      url: '/api/user/verify',
      data: {
        email,
      },
      success: () => {
        utilStore.openPopup(T.Popup.EMAIL_VERIFY);
      },
    });
  },
  verifyCode(email, code) {
    Axios({
      method: T.RequestMethod.PUT,
      url: '/api/user/verify/code',
      data: {
        email,
        code,
      },
      complete: (response) => {
        const { message } = response.data;
        utilStore.openPopup(T.Popup.ALERT, message);
      },
    });
  },
};

export default observable(signStore);
