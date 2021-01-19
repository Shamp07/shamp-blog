import React from 'react';
import { action, makeObservable, observable } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';
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

  @action openSignModal = () => {
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
          this.userData = response.data.result;
        } else {
          toast.error(data.message);
        }

        this.cookieChecked = true;
      })
      .catch((response) => {
        toast.error(response);
      });
  };

  @action login = () => {
    axios.post('/api/user/login', this.loginInfo)
      .then((response) => {
        const { data } = response;
        if (data && data.error) {
          toast.error(data.message);
        }
        if (data && data.result) {
          toast.success(data.message);
          cookie.set('token', data.result, { expires: 2 });
          this.cookieCheck();
        }
      })
      .catch((response) => {
        toast.error(response);
      });
  };

  @action logout = () => {
    cookie.remove('token');
    this.userData = undefined;
  };
}

export default SignStore;
