import { ChangeEvent } from 'react';
import { observable } from 'mobx';
import cookie from 'js-cookie';

import Axios from '@utilities/axios';
import * as T from '@types';
import alertStore from './alertStore';
import utilStore from './utilStore';

export interface SignStore {
  cookieChecked: boolean;
  userData: T.User | null;
  emailVerifyCode: string;
  cookieCheck(): void;
  signIn(form: {
    email: string;
    password: string;
  }): void;
  signUp(fom: {
    email: string;
    name: string;
    password: string;
    passwordCheck: string;
  }): void;
  changePassword(): void;
  deleteUser(email: string): void;
  verifyEmail(isFromRegister: boolean): void;
  verifyCode(): void;
  logout(isChangePassword: boolean): void;
}

const signStore: SignStore = {
  cookieChecked: false,
  userData: null,
  deleteUserInfo: {
    deleteEmail: '',
    deleteText: '',
  },
  emailVerifyCode: '',
  verifyHandleChange(event) {
    this.emailVerifyCode = event.target.value;
  },
  cookieCheck() {
    Axios({
      method: T.RequestMethod.GET,
      url: '/api/user/cookie',
      success: (response) => {
        const { result } = response.data;
        this.userData = result;
        // chatStore.connectSocket();
        // chatStore.getChatRoomList();
      },
      complete: () => {
        this.cookieChecked = true;
      },
    });
  },
  signIn(signInForm) {
    Axios({
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
        } else if (code === 3) {
          // this.registerInfo.email = signInform.email;
          // this.verifyEmail(false);
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
          this.verifyEmail(true);
        } else {
          utilStore.openPopup(T.Popup.ALERT, message);
        }
      },
    });
  },
  changePassword() {
    // const { changePassword, changePasswordCheck } = this.passwordInfo;
    // if (!this.passwordCheck(changePassword, changePasswordCheck)) {
    //   return;
    // }

    Axios({
      method: T.RequestMethod.PUT,
      url: '/api/user/password',
      data: this.passwordInfo,
      success: (response) => {
        const { code, message } = response.data;
        if (code === 1) {
          this.logout(true);
          this.togglePasswordChangeModal();
        }
        alertStore.toggleAlertModal(message);
      },
    });
  },
  deleteUser() {
    Axios({
      method: T.RequestMethod.DELETE,
      url: '/api/user',
      data: this.deleteUserInfo,
      success: (response) => {
        const { code, message } = response.data;
        if (code === 1) {
          this.toggleDeleteUserModal();
          this.logout(true);
        }
        alertStore.toggleAlertModal(message);
      },
    });
  },
  verifyEmail(isFromRegister) {
    Axios({
      method: T.RequestMethod.PUT,
      url: '/api/user/verify',
      data: { email: this.registerInfo.email },
      success: () => {
        if (isFromRegister) {
          this.toggleRegisterModal();
        } else {
          this.toggleSignModal();
        }
        this.toggleEmailModal();
      },
    });
  },
  verifyCode() {
    Axios({
      method: T.RequestMethod.PUT,
      url: '/api/user/verify/code',
      data: {
        email: this.registerInfo.email,
        code: this.emailVerifyCode,
      },
      success: (response) => {
        const { code } = response.data;
        if (code === 1) {
          this.toggleEmailModal();
        }
      },
      complete: (response) => {
        const { message } = response.data;
        alertStore.toggleAlertModal(message);
      },
    });
  },
  logout(isChangePassword: boolean) {
    utilStore.closeHeaderMenu();

    cookie.remove('token');
    this.userData = null;
    if (!isChangePassword) {
      alertStore.toggleAlertModal('로그아웃 되었습니다.');
    }
  },
};

export default observable(signStore);
