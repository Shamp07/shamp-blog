import React from 'react';
import { makeObservable } from 'mobx';
import cookie from 'js-cookie';
import AlertStore from './AlertStore';
import UtilStore from './UtilStore';
import Axios from '../util/Axios';
import makeAnnotations from '../util/Mobx';
import ChatStore from './ChatStore';

interface UserDataType {
  id: number;
  name: string;
  verifyFl: boolean;
  adminFl: boolean;
  exp: number;
  iat: number;
}

class SignStore {
  AlertStore: AlertStore;

  UtilStore: UtilStore;

  ChatStore: ChatStore;

  cookieChecked = false;

  userData: UserDataType | undefined;

  loginInfo = {
    email: '',
    password: '',
  };

  registerInfo = {
    email: '',
    password: '',
    passwordCheck: '',
    name: '',
  };

  passwordInfo = {
    currentPassword: '',
    changePassword: '',
    changePasswordCheck: '',
  };

  deleteUserInfo = {
    deleteEmail: '',
    deleteText: '',
  };

  emailVerifyCode = '';

  isOpenSignModal = false;

  isOpenRegisterModal = false;

  isOpenEmailModal = false;

  isOpenPasswordChangeModal = false;

  isOpenDeleteUserModal = false;

  constructor(root: { AlertStore: AlertStore, UtilStore: UtilStore, ChatStore: ChatStore }) {
    this.AlertStore = root.AlertStore;
    this.UtilStore = root.UtilStore;
    this.ChatStore = root.ChatStore;

    makeObservable(this, makeAnnotations<this>({
      observables: [
        'cookieChecked', 'userData', 'loginInfo', 'registerInfo',
        'passwordInfo', 'deleteUserInfo', 'isOpenPasswordChangeModal',
        'isOpenDeleteUserModal', 'isOpenEmailModal', 'emailVerifyCode',
        'isOpenRegisterModal',
      ],
      actions: [
        'changeRegister', 'toggleSignModal', 'toggleRegisterModal',
        'toggleEmailModal', 'loginHandleChange', 'registerHandleChange',
        'verifyHandleChange', 'cookieCheck', 'login',
        'register', 'verifyEmail', 'verifyCode', 'logout',
        'togglePasswordChangeModal',
      ],
    }));
  }

  changeRegister = (): void => {
    this.toggleRegisterModal();
  };

  togglePasswordChangeModal = (): void => {
    if (!this.isOpenPasswordChangeModal) {
      this.UtilStore.closeHeaderMenu();
    }
    this.passwordInfo = {
      currentPassword: '',
      changePassword: '',
      changePasswordCheck: '',
    };

    this.isOpenPasswordChangeModal = !this.isOpenPasswordChangeModal;
  };

  toggleDeleteUserModal = (): void => {
    if (!this.isOpenDeleteUserModal) {
      this.UtilStore.closeHeaderMenu();
    }

    this.deleteUserInfo = {
      deleteEmail: '',
      deleteText: '',
    };

    this.isOpenDeleteUserModal = !this.isOpenDeleteUserModal;
  };

  toggleSignModal = (): void => {
    this.isOpenSignModal = !this.isOpenSignModal;
    this.loginInfo = {
      email: '',
      password: '',
    };
  };

  toggleRegisterModal = (): void => {
    if (!this.isOpenRegisterModal) {
      this.registerInfo = {
        email: '',
        password: '',
        passwordCheck: '',
        name: '',
      };
    }
    this.isOpenRegisterModal = !this.isOpenRegisterModal;
  };

  toggleEmailModal = (): void => {
    this.isOpenEmailModal = !this.isOpenEmailModal;
    this.emailVerifyCode = '';
  };

  loginHandleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.loginInfo = {
      ...this.loginInfo,
      [event.target.name]: event.target.value,
    };
  };

  registerHandleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.registerInfo = {
      ...this.registerInfo,
      [event.target.name]: event.target.value,
    };
  };

  passwordHandleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.passwordInfo = {
      ...this.passwordInfo,
      [event.target.name]: event.target.value,
    };
  };

  deleteUserHandleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.deleteUserInfo = {
      ...this.deleteUserInfo,
      [event.target.name]: event.target.value,
    };
  };

  verifyHandleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.emailVerifyCode = event.target.value;
  };

  cookieCheck = (): void => {
    Axios({
      method: 'get',
      url: '/api/user/cookie',
      success: (response) => {
        const { result } = response.data;
        this.userData = result;
        this.ChatStore.connectSocket();
        this.ChatStore.getChatCount(true);
      },
      complete: () => {
        this.cookieChecked = true;
      },
    });
  };

  login = (): void => {
    Axios({
      method: 'post',
      url: '/api/user/login',
      data: this.loginInfo,
      success: (response) => {
        const { code, message, result } = response.data;
        if (code === 1) {
          cookie.set('token', result, { expires: 2 });
          this.cookieCheck();
          this.toggleSignModal();
          this.AlertStore.toggleAlertModal(message);
        } else if (code === 2) {
          this.AlertStore.toggleAlertModal(message);
        } else if (code === 3) {
          this.registerInfo.email = this.loginInfo.email;
          this.verifyEmail(false);
        }
      },
    });
  };

  changePassword = (): void => {
    const { changePassword, changePasswordCheck } = this.passwordInfo;
    if (!this.passwordCheck(changePassword, changePasswordCheck)) {
      return;
    }

    Axios({
      method: 'put',
      url: '/api/user/password',
      data: this.passwordInfo,
      success: (response) => {
        const { code, message } = response.data;
        if (code === 1) {
          this.logout(true);
          this.togglePasswordChangeModal();
        }
        this.AlertStore.toggleAlertModal(message);
      },
    });
  };

  deleteUser = (): void => {
    Axios({
      method: 'delete',
      url: '/api/user',
      data: this.deleteUserInfo,
      success: (response) => {
        const { code, message } = response.data;
        if (code === 1) {
          this.toggleDeleteUserModal();
          this.logout(true);
        }
        this.AlertStore.toggleAlertModal(message);
      },
    });
  };

  register = (): void => {
    if (!this.registerValidationCheck()) {
      return;
    }

    Axios({
      method: 'post',
      url: '/api/user',
      data: this.registerInfo,
      success: (response) => {
        const { code, message } = response.data;
        if (code === 1) {
          this.verifyEmail(true);
        } else {
          this.AlertStore.toggleAlertModal(message);
        }
      },
    });
  };

  verifyEmail = (isFromRegister: boolean): void => {
    Axios({
      method: 'put',
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
  };

  verifyCode = (): void => {
    Axios({
      method: 'put',
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
        this.AlertStore.toggleAlertModal(message);
      },
    });
  };

  registerValidationCheck = (): boolean => {
    const { toggleAlertModal } = this.AlertStore;
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
  };

  passwordCheck = (password: string, passwordCheck: string) => {
    if (!password.trim()) {
      this.AlertStore.toggleAlertModal('패스워드를 제대로 입력해주세요.');
      return false;
    }

    const num = password.search(/[0-9]/g);
    const eng = password.search(/[a-z]/ig);
    const spe = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if (password.length < 8 || password.length > 20) {
      this.AlertStore.toggleAlertModal('비밀번호는 8자리 ~ 20자리 이내로 입력해주세요.');
      return false;
    } if (password.search(/\s/) !== -1) {
      this.AlertStore.toggleAlertModal('비밀번호는 공백 없이 입력해주세요.');
      return false;
    } if (num < 0 || eng < 0 || spe < 0) {
      this.AlertStore.toggleAlertModal('비밀번호는 영문, 숫자, 특수문자를 혼합하여 입력해주세요.');
      return false;
    }

    if (password !== passwordCheck) {
      this.AlertStore.toggleAlertModal('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return false;
    }

    return true;
  };

  isEmail = (): boolean => {
    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(this.registerInfo.email);
  };

  logout = (isChangePassword: boolean): void => {
    this.UtilStore.closeHeaderMenu();

    cookie.remove('token');
    this.userData = undefined;
    if (!isChangePassword) {
      this.AlertStore.toggleAlertModal('로그아웃 되었습니다.');
    }
  };
}

export default SignStore;
