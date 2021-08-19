import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { TextField } from '@material-ui/core';

import stores from '@stores';
import Button from '@atoms/Button';
import * as T from '@types';

const EmailModal = () => {
  const { signStore } = stores();
  const {
    isOpenEmailModal, toggleEmailModal, emailVerifyCode,
    verifyHandleChange, verifyCode,
  } = signStore;

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
          <h2 id="transition-modal-title">이메일 인증</h2>
          <ContentWrapper>
            <div>
              입력하신 이메일로 인증번호가 전송되었습니다.
              메일에서 인증번호를 조회하여 아래 입력해주세요.
            </div>
            <TextField label="인증번호" variant="outlined" value={emailVerifyCode} onChange={verifyHandleChange} size="small" />
          </ContentWrapper>
          <ButtonWrapper>
            <Button
              size={T.ButtonSize.MEDIUM}
              variant="contained"
              color="primary"
              onClick={verifyCode}
            >
              완료
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
  margin: 0 20px;
  width: 400px;
  max-width: 100%;
  background-color: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 14px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
  padding: 36px;
  line-height: 25px;

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
  }

  & > div:last-of-type {
    display: flex;
  }
`;

const ButtonWrapper = styled.div`
  & > button {
    margin-left: auto;
  }
`;

const ContentWrapper = styled.div`
  word-break: keep-all;

  & .MuiInputBase-root {
    border-radius: 10px;
  }
  
  & > div {
    margin-bottom: 10px;
  }

  &&& * {
    font-family: inherit;
  }
`;

export default observer(EmailModal);
