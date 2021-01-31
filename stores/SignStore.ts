import React from 'react';
import { action, makeObservable, observable } from 'mobx';
import axios from 'axios';
import cookie from 'js-cookie';

class SignStore {
  @observable cookieChecked: boolean = false;

  @observable userData: object | undefined;

  @observable loginInfo = {
    email: '',
    password: '',
  };

  @observable registerInfo = {
    id: '',
    password: '',
  };

  @observable isOpenSignModal: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @action toggleSignModal = () => {
    this.isOpenSignModal = !this.isOpenSignModal;
  };

  @action loginHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.loginInfo = {
      ...this.loginInfo,
      [event.target.name]: event.target.value,
    };
  };

  @action cookieCheck = async () => {
    await axios.get('/api/user/cookie')
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

  @action logout = () => {
    cookie.remove('token');
    this.userData = undefined;
  };
}

export default SignStore;
