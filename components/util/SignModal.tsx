import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Button, TextField } from '@material-ui/core';
import PasswordInput from './PasswordInput';
import useStores from '../../stores/useStores';

const SignModal: React.FC = () => {
  const { SignStore } = useStores();
  const { isOpenSignModal, openSignModal } = SignStore;

  return (
    <CustomModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpenSignModal}
      onClose={openSignModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpenSignModal}>
        <Paper>
          <h2 id="transition-modal-title">로그인</h2>
          <TextField id="standard-basic" label="ID" />
          <br />
          <br />
          <PasswordInput />
          <br />
          <br />
          <Button variant="contained" color="primary">
            회원가입
          </Button>
          <RightButton variant="contained" color="primary">
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
  margin: 0 20px;
  
  max-width: 100%;
  background-color: #fff;
  border: 2px solid #000;
  padding: 10px;
  
  &:focus {
    outline: 0;
  }
`;

const RightButton = styled(Button)`
  float: right;
`;

export default observer(SignModal);
