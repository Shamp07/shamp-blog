import React, { useCallback, KeyboardEvent } from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { TextField } from '@material-ui/core';
import Button from '@atoms/Button';

import useStores from '@stores/useStores';
import * as T from '@types';

const SignModal = () => {
  const { SignStore } = useStores();
  const {
    isOpenSignModal, toggleSignModal,
    loginInfo, loginHandleChange, login,
    changeRegister,
  } = SignStore;
  const { email, password } = loginInfo;

  const onEnter = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') login();
  }, []);

  return (
    <CustomModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpenSignModal}
      onClose={toggleSignModal}
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
              onChange={loginHandleChange}
              value={email}
              onKeyPress={onEnter}
            />
            <br />
            <CustomTextField
              label="비밀번호"
              name="password"
              onChange={loginHandleChange}
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
              onClick={changeRegister}
            >
              회원가입
            </Button>
            <Button
              size={T.ButtonSize.MEDIUM}
              variant="contained"
              color="primary"
              onClick={login}

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
