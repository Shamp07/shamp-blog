import React, { useCallback, KeyboardEvent, ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import { TextField } from '@material-ui/core';

import stores from '@stores';
import Modal from '@atoms/Modal';
import Button from '@atoms/Button';
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
        <CustomTextField
          label="e-mail"
          name="email"
          onChange={onChange}
          value={email}
          onKeyPress={onEnter}
          ref={focusRef}
        />
        <br />
        <CustomTextField
          label="비밀번호"
          name="password"
          onChange={onChange}
          value={password}
          type="password"
          onKeyPress={onEnter}
        />
        <br />
      </div>
      <div>
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
      </div>
    </Modal>
  );
};

const CustomTextField = styled(TextField)`
  width: 100%;
  margin-bottom: 15px !important;

  &&& * {
    font-family: inherit;
  }
`;

export default observer(SignModal);
