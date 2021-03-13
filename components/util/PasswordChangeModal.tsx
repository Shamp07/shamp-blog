import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import { Button, TextField } from '@material-ui/core';
import useStores from '../../stores/useStores';
import { RootStore } from '../../stores';

const PasswordChangeModal = () => {
  const { SignStore } = useStores() as RootStore;
  const {
    isOpenPasswordChangeModal, togglePasswordChangeModal,
    changePassword,
  } = SignStore;

  return (
    <CustomModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpenPasswordChangeModal}
      onClose={togglePasswordChangeModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpenPasswordChangeModal}>
        <Paper>
          <h2 id="transition-modal-title">비밀번호 변경</h2>
          <div>
            <CustomTextField label="e-mail" name="email" onChange={loginHandleChange} value={email} />
            <br />
            <CustomTextField label="비밀번호" name="password" onChange={loginHandleChange} value={password} type="password" />
            <br />
          </div>
          <div>
            <Button variant="contained" onClick={togglePasswordChangeModal}>취소</Button>
            <Button variant="contained" color="primary" onClick={changePassword}>변경하기</Button>
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

  & > div:first-of-type {
    padding: 20px 0;
    border-bottom: 1px solid #e6e6e6;
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
`;

export default observer(PasswordChangeModal);
