import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';

import stores from '@stores';
import Modal from '@atoms/Modal';
import Button from '@atoms/Button';
import TextField from '@atoms/TextField';
import * as T from '@types';

const EmailModal = () => {
  const { signStore } = stores();
  const {
    isOpenEmailModal, emailVerifyCode,
    verifyHandleChange, verifyCode,
  } = signStore;

  const onClose = useCallback(() => {
    signStore.toggleEmailModal();
  }, []);

  return (
    <Modal
      open={isOpenEmailModal}
      onClose={onClose}
      title="이메일 인증"
    >
      <ContentWrapper>
        <div>
          입력하신 이메일로 인증번호가 전송되었습니다.
          메일에서 인증번호를 조회하여 아래 입력해주세요.
        </div>
        <TextField
          label="인증번호"
          variant="outlined"
          value={emailVerifyCode}
          onChange={verifyHandleChange}
          size="small"
        />
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
    </Modal>
  );
};

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
