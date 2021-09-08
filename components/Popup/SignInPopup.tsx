import React, { useCallback, KeyboardEvent, ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';

import stores from '@stores';
import Modal from '@atoms/Modal';
import Button from '@atoms/Button';
import TextField from '@atoms/TextField';
import * as T from '@types';

const SignInPopup = () => {
  const { signStore } = stores();
  const { signInForm, signInHandleChange } = signStore;
  const { email, password } = signInForm;

  const onChange = (event: ) => ()

  const onSignIn = useCallback(() => {
    signStore.signIn();
  }, []);

  const onEnter = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') onSignIn();
  }, []);

  const onRegister = useCallback(() => {
    signStore.changeRegister();
  }, []);

  const focusRef = useCallback((node: HTMLDivElement) => {
    node?.getElementsByTagName('input')[0]?.focus();
  }, []);

  return (
    <Modal title="로그인">
      <Content>
        <TextField
          name="email"
          value={email}
          label="e-mail"
          ref={focusRef}
          onChange={signInHandleChange.bind(signStore)}
          onKeyPress={onEnter}
        />
        <TextField
          type="password"
          name="password"
          label="비밀번호"
          value={password}
          onChange={signInHandleChange.bind(signStore)}
          onKeyPress={onEnter}
        />
      </Content>
      <Footer>
        <Button
          size={T.ButtonSize.MEDIUM}
          variant="contained"
          color="default"
          onClick={onRegister}
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
