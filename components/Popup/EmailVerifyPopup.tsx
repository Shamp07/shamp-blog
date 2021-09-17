import React, { ChangeEvent, useCallback } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import styled from '@emotion/styled';

import stores from '@stores';
import Modal from '@atoms/Modal';
import Button from '@atoms/Button';
import TextField from '@atoms/TextField';
import * as T from '@types';

const EmailVerifyPopup = () => {
  const { signStore } = stores();

  const form = useLocalObservable(() => ({
    values: {
      email: '',
      code: '',
    },
    onChange(event: ChangeEvent<HTMLInputElement>) {
      this.values = {
        ...this.values,
        [event.target.name]: event.target.value,
      };
    },
  }));

  const onVerify = useCallback(() => {
    const { email, code } = form.values;
    signStore.verifyCode(email, code);
  }, [form.values.email, form.values.code]);

  return (
    <Modal title="이메일 인증">
      <Content>
        <div>
          입력하신 이메일로 인증번호가 전송되었습니다.
          <br />
          메일에서 인증번호를 조회하여 아래 입력해주세요.
        </div>
        <TextField
          label="e-mail"
          variant="outlined"
          value={form.values.email}
          onChange={form.onChange}
          name="email"
          size="small"
        />
        <TextField
          label="인증번호"
          variant="outlined"
          value={form.values.code}
          onChange={form.onChange}
          name="code"
          size="small"
        />
      </Content>
      <Footer>
        <Button
          size={T.ButtonSize.MEDIUM}
          variant="contained"
          color="primary"
          onClick={onVerify}
        >
          인증
        </Button>
      </Footer>
    </Modal>
  );
};

const Content = styled.div`
  padding: 20px 0;
  margin-bottom: 10px;
  word-break: keep-all;

  & .MuiInputBase-root {
    border-radius: 10px;
  }
  & > div {
    margin-bottom: 10px;
  }
`;

const Footer = styled.div`
  display: flex;
  
  & > button {
    margin-left: auto;
  }
`;

export default observer(EmailVerifyPopup);
