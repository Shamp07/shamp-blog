import React, { ChangeEvent, useCallback } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import styled from '@emotion/styled';

import stores from '@stores';
import Modal from '@atoms/Modal';
import Button from '@atoms/Button';
import TextField from '@atoms/TextField';
import * as T from '@types';
import { passwordValidator } from '@utilities/validators';

const PasswordResetPopup = () => {
  const { signStore, utilStore } = stores();

  const form = useLocalObservable(() => ({
    values: {
      currentPassword: '',
      password: '',
      passwordCheck: '',
    },
    onChange(event: ChangeEvent<HTMLInputElement>) {
      this.values = {
        ...this.values,
        [event.target.name]: event.target.value,
      };
    },
    onValidate() {
      const { currentPassword, password, passwordCheck } = this.values;

      if (!currentPassword.trim()) {
        utilStore.openPopup(T.Popup.ALERT, '현재 비밀번호를 제대로 입력해주세요');
        return false;
      }

      return passwordValidator(password, passwordCheck);
    },
  }));

  const onChange = useCallback(() => {
    if (!form.onValidate()) return;

    const { currentPassword, password } = form.values;
    signStore.resetPassword(currentPassword, password);
  }, [form.values.currentPassword, form.values.password]);

  return (
    <Modal title="비밀번호 변경">
      <Content>
        <TextField
          label="현재 비밀번호"
          onChange={form.onChange}
          value={form.values.currentPassword}
          name="currentPassword"
          type="password"
        />
        <br />
        <TextField
          label="변경할 비밀번호"
          onChange={form.onChange}
          value={form.values.password}
          name="password"
          type="password"
        />
        <br />
        <TextField
          label="변경할 비밀번호 확인"
          onChange={form.onChange}
          value={form.values.passwordCheck}
          name="passwordCheck"
          type="password"
        />
        <br />
      </Content>
      <Footer>
        <Button
          size={T.ButtonSize.MEDIUM}
          variant="contained"
          color="primary"
          onClick={onChange}
        >
          변경
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

export default observer(PasswordResetPopup);
