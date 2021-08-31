import React, { useCallback, KeyboardEvent, ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';

import stores from '@stores';
import Modal from '@atoms/Modal';
import Button from '@atoms/Button';
import TextField from '@atoms/TextField';
import * as T from '@types';

const SignModal = () => {
  const { signStore } = stores();
  const { isOpenSignModal, loginInfo } = signStore;
  const { email, password } = loginInfo;

  const onLogin = useCallback(() => {
    signStore.login();
  }, []);

  const onEnter = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') onLogin();
  }, []);

  const onClose = useCallback(() => {
    signStore.toggleSignModal();
  }, []);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    signStore.loginHandleChange(event);
  }, []);

  const onRegister = useCallback(() => {
    signStore.changeRegister();
  }, []);

  const focusRef = useCallback((node: HTMLDivElement) => {
    node?.getElementsByTagName('input')[0]?.focus();
  }, []);

  return (
    <Modal
      open={isOpenSignModal}
      onClose={onClose}
      title="로그인"
    >
      <div>
        <TextField
          name="email"
          value={email}
          label="e-mail"
          ref={focusRef}
          onChange={onChange}
          onKeyPress={onEnter}
        />
        <TextField
          type="password"
          name="password"
          label="비밀번호"
          value={password}
          onChange={onChange}
          onKeyPress={onEnter}
        />
        <br />
      </div>
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
          onClick={onLogin}
        >
          로그인
        </Button>
      </Footer>
    </Modal>
  );
};

const Footer = styled.footer`

`;

export default observer(SignModal);
