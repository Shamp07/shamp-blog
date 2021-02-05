import React from 'react';
import { action, makeObservable, observable } from 'mobx';
import axios from 'axios';
import cookie from 'js-cookie';
import AlertStore from './AlertStore';

class SignStore {
  AlertStore: AlertStore;

  @observable cookieChecked: boolean = false;

  @observable userData: object | undefined;

  @observable loginInfo = {
    email: '',
    password: '',
  };

  @observable registerInfo = {
    email: '',
    password: '',
    passwordCheck: '',
    name: '',
  };

  @observable emailVerifyCode: string = '';

  @observable inputEmailVerifyCode: string = '';

  @observable isOpenSignModal: boolean = false;

  @observable isOpenRegisterModal: boolean = false;

  @observable isOpenEmailModal: boolean = false;

  constructor(root: any) {
    makeObservable(this);
    this.AlertStore = root.AlertStore;
  }

  @action changeRegister = () => {
    this.toggleRegisterModal();
  };

  @action toggleSignModal = () => {
    this.isOpenSignModal = !this.isOpenSignModal;
    this.loginInfo = {
      email: '',
      password: '',
    };
  };

  @action toggleRegisterModal = () => {
    this.isOpenRegisterModal = !this.isOpenRegisterModal;
    this.registerInfo = {
      email: '',
      password: '',
      passwordCheck: '',
      name: '',
    };
  };

  @action toggleEmailModal = () => {
    this.isOpenEmailModal = !this.isOpenEmailModal;
    this.emailVerifyCode = '';
    this.inputEmailVerifyCode = '';
  };

  @action loginHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.loginInfo = {
      ...this.loginInfo,
      [event.target.name]: event.target.value,
    };
  };

  @action registerHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.registerInfo = {
      ...this.registerInfo,
      [event.target.name]: event.target.value,
    };
  };

  @action verifyHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.inputEmailVerifyCode = event.target.value;
  };

  @action cookieCheck = async () => {
    await axios.get('http://localhost:3000/api/user/cookie')
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

  @action login = () => {
    axios.post('/api/user/login', this.loginInfo)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            cookie.set('token', data.result, { expires: 2 });
            this.cookieCheck();
            this.toggleSignModal();
          }
          this.AlertStore.toggleAlertModal(data.message);
        }
      })
      .catch((response) => {
        console.error(response);
      });
  };

  @action register = () => {
    if (!this.registerValidationCheck()) {
      return;
    }

    axios.post('/api/user', this.registerInfo)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            this.verifyEmail(this.registerInfo.email);
          } else {
            this.AlertStore.toggleAlertModal(data.message);
          }
        }
      })
      .catch((response) => {
        console.error(response);
      });
  };

  @action verifyEmail = (email: string): void => {
    axios.put('/api/user/verify', {
      email,
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          this.toggleRegisterModal();
          this.toggleEmailModal();
        } else {
          this.AlertStore.toggleAlertModal(data.message);
        }
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

  @action logout = (): void => {
    cookie.remove('token');
    this.userData = undefined;
    this.AlertStore.toggleAlertModal('로그아웃 되었습니다.');
  };
}

export default SignStore;
