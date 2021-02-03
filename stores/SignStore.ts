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

  @observable isOpenSignModal: boolean = false;

  @observable isOpenRegisterModal: boolean = false;

  constructor(root: any) {
    makeObservable(this);
    this.AlertStore = root.AlertStore;
  }

  @action toggleSignModal = () => {
    this.isOpenSignModal = !this.isOpenSignModal;
  };

  @action toggleRegisterModal = () => {
    this.isOpenRegisterModal = !this.isOpenRegisterModal;
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
        if (data && data.error) {
          console.error(data.message);
        }
        if (data && data.result) {
          cookie.set('token', data.result, { expires: 2 });
          this.cookieCheck();
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
            this.AlertStore.toggleAlertModal('회원가입이 완료되었습니다!');
          } else {
            this.AlertStore.toggleAlertModal('입력하신 이메일이 이미 사용중입니다ㅠㅡ');
          }
        }
      })
      .catch((response) => {
        console.error(response);
      });
  };

  registerValidationCheck = () => {
    if (!this.registerInfo.email.trim()) {
      this.AlertStore.toggleAlertModal('이메일을 제대로 입력해주세요.');
    }

    if (!this.registerInfo.name.trim()) {
      this.AlertStore.toggleAlertModal('이름을 제대로 입력해주세요.');
    }

    if (!this.registerInfo.password.trim()) {
      this.AlertStore.toggleAlertModal('패스워드를 제대로 입력해주세요.');
    }

    if (this.registerInfo.password !== this.registerInfo.passwordCheck) {
      this.AlertStore.toggleAlertModal('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
    }

    return true;
  };

  @action logout = () => {
    cookie.remove('token');
    this.userData = undefined;
  };
}

export default SignStore;
