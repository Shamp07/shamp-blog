import React, {useCallback, KeyboardEvent, ChangeEvent} from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { TextField } from '@material-ui/core';
import Button from '@atoms/Button';

import stores from '@stores';
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
    <CustomModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpenSignModal}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpenSignModal}>
        <Paper>
          <h2 id="transition-modal-title">로그인</h2>
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
        </Paper>
      </Fade>
    </CustomModal>
  );
};

const CustomModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Paper = styled.div`
  margin: 0 20px;
  width: 300px;
  max-width: 100%;
  background-color: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 14px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
  padding: 36px;

  &:focus {
    outline: 0;
  }

  & > h2 {
    margin-bottom: 10px;
    padding: 10px 0;
  }

  & > div:first-of-type {
    padding: 20px 0;
    border-top: 1px solid #e6e6e6;
    margin-bottom: 10px;
  }
  
  & > div:last-of-type {
    display: flex;
  }
  
  & > div > button:last-of-type {
    margin-left: auto;
  }
`;

const CustomTextField = styled(TextField)`
  width: 100%;
  margin-bottom: 15px !important;

  &&& * {
    font-family: inherit;
  }
`;

export default observer(SignModal);
