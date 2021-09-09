import React, { useCallback, KeyboardEvent, ChangeEvent } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import styled from '@emotion/styled';

import stores from '@stores';
import Modal from '@atoms/Modal';
import Button from '@atoms/Button';
import TextField from '@atoms/TextField';
import * as T from '@types';

const SignInPopup = () => {
  const { signStore } = stores();
  const signInForm = useLocalObservable(() => ({
    values: {
      email: '',
      password: '',
    },
    onChange(event: ChangeEvent<HTMLInputElement>) {
      this.values = {
        ...this.values,
        [event.target.name]: event.target.value,
      };
    },
  }));

  const onSignIn = useCallback(() => {
    signStore.signIn(signInForm.values);
  }, []);

  const onSignUp = useCallback(() => {
    signStore.changeRegister();
  }, []);

  const onEnter = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') onSignIn();
  }, []);

  const focusRef = useCallback((node: HTMLDivElement) => {
    node?.getElementsByTagName('input')[0]?.focus();
  }, []);

  return (
    <Modal title="로그인">
      <Content>
        <TextField
          name="email"
          value={signInForm.values.email}
          label="e-mail"
          ref={focusRef}
          onChange={signInForm.onChange}
          onKeyPress={onEnter}
        />
        <TextField
          type="password"
          name="password"
          label="비밀번호"
          value={signInForm.values.password}
          onChange={signInForm.onChange}
          onKeyPress={onEnter}
        />
      </Content>
      <Footer>
        <Button
          size={T.ButtonSize.MEDIUM}
          variant="contained"
          color="default"
          onClick={onSignUp}
        >
          회원가입
        </Button>
        <Button
          size={T.ButtonSize.MEDIUM}
          variant="contained"
          color="primary"
          onClick={onSignIn}
        >
          로그인
        </Button>
      </Footer>
    </Modal>
  );
};

const Content = styled.div`
  max-width: 300px;
  & > div {
    margin-bottom: 10px;
  }
`;

const Footer = styled.footer`
  display: flex;
  padding: 20px 0 10px;
  & > button:last-of-type {
    margin-left: auto;
  }
`;

export default observer(SignInPopup);
