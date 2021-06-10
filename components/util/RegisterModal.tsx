import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { TextField } from '@material-ui/core';

import useStores from '@stores/useStores';
import Button from '@atoms/Button';
import * as T from '@types';

const RegisterModal = () => {
  const { SignStore } = useStores();
  const {
    isOpenRegisterModal, toggleRegisterModal,
    registerInfo, registerHandleChange, register,
  } = SignStore;
  const {
    email, name, password, passwordCheck,
  } = registerInfo;

  return (
    <CustomModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpenRegisterModal}
      onClose={toggleRegisterModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpenRegisterModal}>
        <Paper>
          <h2 id="transition-modal-title">회원가입</h2>
          <div>
            <CustomTextField
              label="e-mail"
              name="email"
              type="email"
              onChange={registerHandleChange}
              value={email}
              helperText="이메일로 인증을 진행하니 사용 중인 이메일을 적어주세요!"
            />
            <CustomTextField
              label="이름"
              name="name"
              onChange={registerHandleChange}
              value={name}
              helperText="블로그에서 사용할 이름을 적어주세요."
            />
            <CustomTextField
              label="비밀번호"
              name="password"
              type="password"
              value={password}
              onChange={registerHandleChange}
              helperText="8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요. 비밀번호는 단방향 암호화가 되어 블로그 주인도 알 방법이 없으니 안심하세요! 참고로 제 블로그는 오픈소스입니다!"
            />
            <CustomTextField
              label="비밀번호 확인"
              name="passwordCheck"
              type="password"
              value={passwordCheck}
              onChange={registerHandleChange}
              helperText="비밀번호와 동일하게 입력해주세요."
            />
            <br />
          </div>
          <ButtonWrapper>
            <Button
              size={T.ButtonSize.MEDIUM}
              variant="contained"
              color="primary"
              onClick={register}
            >
              가입하기
            </Button>
          </ButtonWrapper>
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
  margin: 0 40px;
  width: 400px;
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
`;

const CustomTextField = styled(TextField)`
  width: 100%;
  margin-bottom: 10px !important;
  
  &:nth-of-type(3) > .MuiFormHelperText-root {
    color: #dc143c;
  }
`;

const ButtonWrapper = styled.div`
  & > button {
    margin-left: auto;
  }
`;

export default observer(RegisterModal);
