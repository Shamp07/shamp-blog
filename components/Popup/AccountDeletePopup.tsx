import React, { useCallback, ChangeEvent } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import styled from '@emotion/styled';

import stores from '@stores';
import Button from '@atoms/Button';
import Modal from '@atoms/Modal';
import TextField from '@atoms/TextField';
import * as T from '@types';

const AccountDeletePopup = () => {
  const { signStore, utilStore } = stores();

  const form = useLocalObservable(() => ({
    values: {
      email: '',
      text: '',
    },
    onChange(event: ChangeEvent<HTMLInputElement>) {
      this.values = {
        ...this.values,
        [event.target.name]: event.target.value,
      };
    },
  }));

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    form.onChange(event);
  }, []);

  const onDelete = useCallback(() => {
    signStore.deleteUser(form.values.email);
  }, [form.values.email]);

  const onClose = useCallback(() => {
    utilStore.closePopup();
  }, []);

  return (
    <Modal title="회원 탈퇴">
      <Content>
        <div>본인의 이메일과 아래의 내용과 동일하게 적어주세요.</div>
        <TextField
          label="e-mail"
          onChange={onChange}
          value={form.values.email}
          name="email"
        />
        <TextField
          label="'계정을 삭제하겠습니다' 를 입력해주세요"
          onChange={onChange}
          value={form.values.text}
          name="text"
        />
      </Content>
      <Footer>
        <Button
          size={T.ButtonSize.MEDIUM}
          variant="contained"
          color="default"
          onClick={onClose}
        >
          취소
        </Button>
        <Button
          size={T.ButtonSize.MEDIUM}
          variant="contained"
          color="primary"
          onClick={onDelete}
          disabled={form.values.text !== '계정을 삭제하겠습니다'}
        >
          탈퇴하기
        </Button>
      </Footer>
    </Modal>
  );
};

const Content = styled.div`
  & > div {
    margin-bottom: 10px;
  }
`;

const Footer = styled.footer`
  display: flex;
  padding: 20px 0 10px;
  
  & > button:last-of-type {
    margin-left: auto;
  }
`;

export default observer(AccountDeletePopup);
