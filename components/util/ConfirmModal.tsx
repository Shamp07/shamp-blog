import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button } from '@material-ui/core';

import useStores from '@stores/useStores';

const ConfirmModal = () => {
  const { UtilStore } = useStores();
  const {
    isOpenConfirmModal, callback,
    text, closeConfirmModal, callFunction,
  } = UtilStore;

  const call = useCallback(() => {
    callFunction(callback);
  }, [callback]);

  return (
    <CustomModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpenConfirmModal}
      onClose={closeConfirmModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpenConfirmModal}>
        <Paper>
          <h2 id="transition-modal-title">알림</h2>
          <div>
            {text}
          </div>
          <div>
            <span>
              <RightButton
                type="button"
                variant="contained"
                onClick={closeConfirmModal}
              >
                취소
              </RightButton>
              <RightButton
                type="button"
                variant="contained"
                color="primary"
                onClick={call}
              >
                확인하기
              </RightButton>
            </span>
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
    & > span {
      margin-left: auto;
    }
  }
`;

const RightButton = styled(Button)`
  height: 44px;
  margin-left: 5px !important;
  border-radius: 10px !important;
  padding-left: 18px !important;
  padding-right: 18px !important;
  box-shadow: none !important;
`;

export default observer(ConfirmModal);
