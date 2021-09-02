import React, { useCallback, ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';

import stores from '@stores';
import Modal from '@atoms/Modal';
import Button from '@atoms/Button';
import TextField from '@atoms/TextField';
import dsPalette from '@constants/ds-palette';
import * as T from '@types';

const RegisterModal = () => {
  const { signStore } = stores();
  const { isOpenRegisterModal, registerInfo } = signStore;
  const {
    email, name, password, passwordCheck,
  } = registerInfo;

  const toggle = useCallback(() => {
    signStore.toggleRegisterModal();
  }, []);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    signStore.registerHandleChange(event);
  }, []);

  const onRegister = useCallback(() => {
    signStore.register();
  }, []);

  return (
    <Modal
      open={isOpenRegisterModal}
      onClose={toggle}
      title="회원가입"
    >
      <Content>
        <TextField
          label="e-mail"
          name="email"
          type="email"
          onChange={onChange}
          value={email}
          helperText="이메일로 인증을 진행하니 사용 중인 이메일을 적어주세요!"
        />
        <TextField
          label="이름"
          name="name"
          onChange={onChange}
          value={name}
          helperText="블로그에서 사용할 이름을 적어주세요."
        />
        <TextField
          label="비밀번호"
          name="password"
          type="password"
          value={password}
          onChange={onChange}
          helperText="8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요."
        />
        <TextField
          label="비밀번호 확인"
          name="passwordCheck"
          type="password"
          value={passwordCheck}
          onChange={onChange}
          helperText="비밀번호와 동일하게 입력해주세요."
        />
        <Description>
          비밀번호는 단방향 암호화가 진행되어 저도 알 방법이 없습니다.
          <br />
          블로그는 오픈 소스로 공개되어있습니다.
        </Description>
      </Content>
      <Footer>
        <Button
          size={T.ButtonSize.MEDIUM}
          variant="contained"
          color="primary"
          onClick={onRegister}
        >
          가입하기
        </Button>
      </Footer>
    </Modal>
  );
};

const Description = styled.div({
  marginTop: '20px',
  fontSize: '12px',
  lineHeight: '20px',
  color: dsPalette.themeWarning.toString(),
});

const Content = styled.div`
  max-width: 360px;
  & > .MuiFormHelperText-root {
    color: red;
  }
`;

const Footer = styled.footer`
  display: flex;
  padding: 20px 0 10px;
  & > button {
    margin-left: auto;
  }
`;

export default observer(RegisterModal);
