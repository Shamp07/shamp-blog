import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { Button, TextField } from '@material-ui/core';
import { useRouter } from 'next/router';
import useStores from '../../stores/useStores';

const RegisterModal: React.FC = () => {
  const { SignStore } = useStores();
  const {
    isOpenRegisterModal, toggleRegisterModal,
    registerInfo, registerHandleChange, register,
  } = SignStore;
  const {
    email, name, password, passwordCheck,
  } = registerInfo;
  const router = useRouter();

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
            <CustomTextField label="e-mail" name="email" type="email" onChange={registerHandleChange} value={email} helperText="이메일로 인증을 진행하니 사용 중인 이메일을 적어주세요!" />
            <CustomTextField label="이름" name="name" onChange={registerHandleChange} value={name} helperText="블로그에서 사용할 이름을 적어주세요." />
            <CustomTextField label="비밀번호" name="password" type="password" value={password} onChange={registerHandleChange} helperText="8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요." />
            <CustomTextField label="비밀번호 확인" name="passwordCheck" type="password" value={passwordCheck} onChange={registerHandleChange} helperText="비밀번호와 동일하게 입력해주세요." />
            <br />
          </div>
          <RightButton variant="contained" color="primary" onClick={() => register(router)}>
            가입
          </RightButton>
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
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
  padding: 15px;

  &:focus {
    outline: 0;
  }

  & > h2 {
    margin-bottom: 10px;
    padding: 10px 0;
  }

  & > div {
    padding: 20px 0;
    border-bottom: 1px solid #e6e6e6;
    border-top: 1px solid #e6e6e6;
    margin-bottom: 10px;
  }
`;

const RightButton = styled(Button)`
  float: right;
  margin-left: 5px !important;
`;

const CustomTextField = styled(TextField)`
  width: 100%;
  margin-bottom: 10px !important;
`;

export default observer(RegisterModal);
