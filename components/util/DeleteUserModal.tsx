import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, TextField } from '@material-ui/core';

import useStores from '@stores/useStores';

const DeleteUserModal = () => {
  const { SignStore } = useStores();
  const {
    isOpenDeleteUserModal, toggleDeleteUserModal, deleteUserInfo,
    deleteUserHandleChange, deleteUser,
  } = SignStore;
  const { deleteEmail, deleteText } = deleteUserInfo;

  return (
    <CustomModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpenDeleteUserModal}
      onClose={toggleDeleteUserModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpenDeleteUserModal}>
        <Paper>
          <h2 id="transition-modal-title">회원 탈퇴</h2>
          <div>
            <div>본인의 이메일과 아래의 내용과 동일하게 적어주세요.</div>
            <br />
            <CustomTextField
              label="e-mail"
              onChange={deleteUserHandleChange}
              value={deleteEmail}
              name="deleteEmail"
            />
            <br />
            <CustomTextField
              label="'계정을 삭제하겠습니다' 라고 적어주세요."
              onChange={deleteUserHandleChange}
              value={deleteText}
              name="deleteText"
            />
            <br />
          </div>
          <div>
            <Button variant="contained" onClick={toggleDeleteUserModal}>취소</Button>
            <Button variant="contained" color="primary" onClick={deleteUser} disabled={deleteText !== '계정을 삭제하겠습니다'}>
              탈퇴하기
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

export default observer(DeleteUserModal);
