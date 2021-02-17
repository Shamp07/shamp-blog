import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import { Button, TextField } from '@material-ui/core';
import useStores from '../../stores/useStores';

const EmailModal: React.FC = () => {
  const { SignStore } = useStores();
  const {
    isOpenEmailModal, toggleEmailModal, emailVerifyCode,
    verifyHandleChange, verifyCode,
  } = SignStore;

  return (
    <CustomModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpenEmailModal}
      onClose={toggleEmailModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      disableBackdropClick
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpenEmailModal}>
        <Paper>
          <h2 id="transition-modal-title">이메일 인증 코드 입력</h2>
          <div>
            입력하신 이메일로 인증번호가 전송되었습니다.
            <br />
            메일에서 인증번호를 조회하여 아래 입력해주세요.
            <br />
            <br />
            <TextField label="인증번호" variant="outlined" value={emailVerifyCode} onChange={verifyHandleChange} size="small" />
          </div>
          <RightButton variant="contained" color="primary" onClick={verifyCode}>
            완료
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
  width: 500px;
  max-width: 100%;
  background-color: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
  padding: 15px;
  line-height: 25px;

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

export default observer(EmailModal);
