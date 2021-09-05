import { ChangeEvent } from 'react';
import { observable } from 'mobx';
import cookie from 'js-cookie';

import Axios from '@util/Axios';
import * as T from '@types';
import alertStore from './alertStore';
import utilStore from './utilStore';

export interface SignStore {
  cookieChecked: boolean;
  userData: T.User | null;
  loginInfo: {
    email: string;
    password: string;
  };
  registerInfo: {
    email: string;
    password: string;
    passwordCheck: string;
    name: string;
  };
  passwordInfo: {
    currentPassword: string;
    changePassword: string;
    changePasswordCheck: string;
  };
  deleteUserInfo: {
    deleteEmail: string;
    deleteText: string;
  };
  emailVerifyCode: string;
  changeRegister(): void;
  loginHandleChange(event: ChangeEvent<HTMLInputElement>): void;
  registerHandleChange(event: ChangeEvent<HTMLInputElement>): void;
  passwordHandleChange(event: ChangeEvent<HTMLInputElement>): void;
  deleteUserHandleChange(event: ChangeEvent<HTMLInputElement>): void;
  verifyHandleChange(event: ChangeEvent<HTMLInputElement>): void;
  cookieCheck(): void;
  login(): void;
  changePassword(): void;
  deleteUser(): void;
  register(): void;
  verifyEmail(isFromRegister: boolean): void;
  verifyCode(): void;
  registerValidationCheck(): boolean;
  passwordCheck(password: string, passwordCheck: string): boolean;
  isEmail(): boolean;
  logout(isChangePassword: boolean): void;
}

const signStore: SignStore = {
  cookieChecked: false,
  userData: null,
  loginInfo: {
    email: '',
    password: '',
  },
  registerInfo: {
    email: '',
    password: '',
    passwordCheck: '',
    name: '',
  },
  passwordInfo: {
    currentPassword: '',
    changePassword: '',
    changePasswordCheck: '',
  },
  deleteUserInfo: {
    deleteEmail: '',
    deleteText: '',
  },
  emailVerifyCode: '',
  loginHandleChange(event) {
    this.loginInfo = {
      ...this.loginInfo,
      [event.target.name]: event.target.value,
    };
  },
  registerHandleChange(event) {
    this.registerInfo = {
      ...this.registerInfo,
      [event.target.name]: event.target.value,
    };
  },
  passwordHandleChange(event) {
    this.passwordInfo = {
      ...this.passwordInfo,
      [event.target.name]: event.target.value,
    };
  },
  deleteUserHandleChange(event) {
    this.deleteUserInfo = {
      ...this.deleteUserInfo,
      [event.target.name]: event.target.value,
    };
  },
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
  login() {
    Axios({
      method: T.RequestMethod.POST,
      url: '/api/user/login',
      data: this.loginInfo,
      success: (response) => {
        const { code, message, result } = response.data;
        if (code === 1) {
          cookie.set('token', result, { expires: 2 });
          this.cookieCheck();
          this.toggleSignModal();
          alertStore.toggleAlertModal(message);
        } else if (code === 2) {
          alertStore.toggleAlertModal(message);
        } else if (code === 3) {
          this.registerInfo.email = this.loginInfo.email;
          this.verifyEmail(false);
        }
      },
    });
  },
  changePassword() {
    const { changePassword, changePasswordCheck } = this.passwordInfo;
    if (!this.passwordCheck(changePassword, changePasswordCheck)) {
      return;
    }

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
  register() {
    if (!this.registerValidationCheck()) {
      return;
    }
    Axios({
      method: T.RequestMethod.POST,
      url: '/api/user',
      data: this.registerInfo,
      success: (response) => {
        const { code, message } = response.data;
        if (code === 1) {
          this.verifyEmail(true);
        } else {
          alertStore.toggleAlertModal(message);
        }
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
  registerValidationCheck() {
    const { toggleAlertModal } = alertStore;
    const { name } = this.registerInfo;

    if (!this.isEmail()) {
      toggleAlertModal('이메일을 제대로 입력해주세요.');
      return false;
    }

    if (!name.trim()) {
      toggleAlertModal('이름을 제대로 입력해주세요.');
      return false;
    }

    const { password, passwordCheck } = this.registerInfo;
    return this.passwordCheck(password, passwordCheck);
  },
  passwordCheck(password, passwordCheck) {
    const { toggleAlertModal } = alertStore;
    if (!password.trim()) {
      toggleAlertModal('패스워드를 제대로 입력해주세요.');
      return false;
    }

    const num = password.search(/[0-9]/g);
    const eng = password.search(/[a-z]/ig);
    const spe = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if (password.length < 8 || password.length > 20) {
      toggleAlertModal('비밀번호는 8자리 ~ 20자리 이내로 입력해주세요.');
      return false;
    } if (password.search(/\s/) !== -1) {
      toggleAlertModal('비밀번호는 공백 없이 입력해주세요.');
      return false;
    } if (num < 0 || eng < 0 || spe < 0) {
      toggleAlertModal('비밀번호는 영문, 숫자, 특수문자를 혼합하여 입력해주세요.');
      return false;
    }

    if (password !== passwordCheck) {
      toggleAlertModal('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return false;
    }

    return true;
  },
  isEmail() {
    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(this.registerInfo.email);
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
