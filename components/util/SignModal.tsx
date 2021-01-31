import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { Button, TextField } from '@material-ui/core';
import PasswordInput from './PasswordInput';
import useStores from '../../stores/useStores';
import { useRouter } from 'next/router';

const SignModal: React.FC = () => {
  const { SignStore } = useStores();
  const { isOpenSignModal, toggleSignModal } = SignStore;
  const { loginInfo, loginHandleChange, login } = SignStore;
  const { email } = loginInfo;
  const router = useRouter();

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
            <CustomTextField label="e-mail" name="email" onChange={loginHandleChange} value={email} />
            <br />
            <br />
            <PasswordInput />
            <br />
            <br />
          </div>
          <Button variant="contained" color="primary">
            회원가입
          </Button>
          <RightButton variant="contained" color="primary" onClick={() => login(router)}>
            로그인
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
  width: 300px;
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
`;

export default observer(SignModal);
