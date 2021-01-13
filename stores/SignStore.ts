import React from 'react';
import { action, makeObservable, observable } from 'mobx';

class SignStore {
  root: any;

  @observable loginInfo = {
    id: '',
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
}

export default SignStore;
