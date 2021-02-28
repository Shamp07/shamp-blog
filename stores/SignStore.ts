import React from 'react';
import { action, makeObservable, observable } from 'mobx';
import axios from 'axios';
import cookie from 'js-cookie';
import AlertStore from './AlertStore';

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

  cookieChecked: boolean = false;

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

  emailVerifyCode: string = '';

  isOpenSignModal: boolean = false;

  isOpenRegisterModal: boolean = false;

  isOpenEmailModal: boolean = false;

  constructor(root: { AlertStore: AlertStore }) {
    this.AlertStore = root.AlertStore;

    makeObservable(this, {
      cookieChecked: observable,
      userData: observable,
      loginInfo: observable,
      registerInfo: observable,
      changeRegister: action,
      toggleSignModal: action,
      toggleRegisterModal: action,
      toggleEmailModal: action,
      loginHandleChange: action,
      registerHandleChange: action,
      verifyHandleChange: action,
      cookieCheck: action,
      login: action,
      register: action,
      verifyEmail: action,
      verifyCode: action,
      logout: action,
    });
  }

  changeRegister = (): void => {
    this.toggleRegisterModal();
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

  verifyHandleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.emailVerifyCode = event.target.value;
  };

  cookieCheck = (): void => {
    axios.get('/api/user/cookie')
      .then((response) => {
        const { data } = response;
        if (data.success) {
          this.userData = data.result;
        }
        this.cookieChecked = true;
      })
      .catch((response) => {
        console.error(response);
      });
  };

  login = (): void => {
    axios.post('/api/user/login', this.loginInfo)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            cookie.set('token', data.result, { expires: 2 });
            this.cookieCheck();
            this.toggleSignModal();
            this.AlertStore.toggleAlertModal(data.message);
          } else if (data.code === 2) {
            this.AlertStore.toggleAlertModal(data.message);
          } else if (data.code === 3) {
            this.registerInfo.email = this.loginInfo.email;
            this.verifyEmail(false);
          }
        }
      })
      .catch((response) => {
        console.error(response);
      });
  };

  register = (): void => {
    if (!this.registerValidationCheck()) {
      return;
    }

    axios.post('/api/user', this.registerInfo)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            this.verifyEmail(true);
          } else {
            this.AlertStore.toggleAlertModal(data.message);
          }
        }
      })
      .catch((response) => {
        console.error(response);
      });
  };

  verifyEmail = (isFromRegister: boolean): void => {
    axios.put('/api/user/verify', {
      email: this.registerInfo.email,
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (isFromRegister) {
            this.toggleRegisterModal();
          } else {
            this.toggleSignModal();
          }
          this.toggleEmailModal();
        } else {
          this.AlertStore.toggleAlertModal(data.message);
        }
      })
      .catch((response) => {
        console.error(response);
      });
  };

  verifyCode = (): void => {
    axios.put('/api/user/verify/code', {
      email: this.registerInfo.email,
      code: this.emailVerifyCode,
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            this.toggleEmailModal();
          }
        }
        this.AlertStore.toggleAlertModal(data.message);
      })
      .catch((response) => {
        console.error(response);
      });
  };

  registerValidationCheck = (): boolean => {
    if (!this.isEmail()) {
      this.AlertStore.toggleAlertModal('이메일을 제대로 입력해주세요.');
      return false;
    }

    if (!this.registerInfo.name.trim()) {
      this.AlertStore.toggleAlertModal('이름을 제대로 입력해주세요.');
      return false;
    }

    if (!this.registerInfo.password.trim()) {
      this.AlertStore.toggleAlertModal('패스워드를 제대로 입력해주세요.');
      return false;
    }

    const num = this.registerInfo.password.search(/[0-9]/g);
    const eng = this.registerInfo.password.search(/[a-z]/ig);
    const spe = this.registerInfo.password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if (this.registerInfo.password.length < 8 || this.registerInfo.password.length > 20) {
      this.AlertStore.toggleAlertModal('비밀번호는 8자리 ~ 20자리 이내로 입력해주세요.');
      return false;
    } if (this.registerInfo.password.search(/\s/) !== -1) {
      this.AlertStore.toggleAlertModal('비밀번호는 공백 없이 입력해주세요.');
      return false;
    } if (num < 0 || eng < 0 || spe < 0) {
      this.AlertStore.toggleAlertModal('비밀번호는 영문, 숫자, 특수문자를 혼합하여 입력해주세요.');
      return false;
    }

    if (this.registerInfo.password !== this.registerInfo.passwordCheck) {
      this.AlertStore.toggleAlertModal('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return false;
    }

    return true;
  };

  isEmail = (): boolean => {
    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(this.registerInfo.email);
  };

  logout = (): void => {
    cookie.remove('token');
    this.userData = undefined;
    this.AlertStore.toggleAlertModal('로그아웃 되었습니다.');
  };
}

export default SignStore;
