import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import useStores from '../../stores/useStores';

const ConfirmModal: React.FC = () => {
  const router = useRouter();
  const { UtilStore } = useStores();
  const { isOpenConfirmModal, toggleConfirmModal } = UtilStore;

  return (
    <CustomModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpenConfirmModal}
      onClose={toggleConfirmModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpenConfirmModal}>
        <Paper>
          <h2 id="transition-modal-title">알림</h2>
          안녕하세요.
          <RightButton variant="contained">취소</RightButton>
          <RightButton variant="contained" color="primary">확인</RightButton>
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

export default observer(ConfirmModal);
