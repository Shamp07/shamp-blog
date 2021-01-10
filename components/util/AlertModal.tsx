import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import useStores from '../../stores/useStores';

const AlertModal: React.FC = () => {
  const { AlertStore } = useStores();
  const { isOpenAlertModal, toggleAlertModal, text } = AlertStore;

  return (
    <CustomModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpenAlertModal}
      onClose={toggleAlertModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpenAlertModal}>
        <Paper>
          <h2 id="transition-modal-title">알림</h2>
          <TextDiv>{text}</TextDiv>
          <div>
            <RightButton variant="contained" color="primary" onClick={() => toggleAlertModal('')}>
              닫기
            </RightButton>
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

const TextDiv = styled.div`
  margin: 10px 0;
`;

export default observer(AlertModal);
