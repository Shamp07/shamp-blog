import React, { ChangeEvent } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import styled from '@emotion/styled';

import dsPalette from '@constants/ds-palette';
import TextField from '@atoms/TextField';
import { SubmitButton } from '@atoms/Button';
import { emailValidator, passwordValidator } from '@utilities/validators';
import {useMutation} from "react-query";
import axios from "axios";

enum UI {
  EMAIL = 'EMAIL',
  USERNAME = 'USERNAME',
  PASSWORD = 'PASSWORD',
  PASSWORD_CHECK = 'PASSWORD_CHECK',
}

const INITIAL_ERRORS = {
  [UI.EMAIL]: false,
  [UI.USERNAME]: false,
  [UI.PASSWORD]: false,
  [UI.PASSWORD_CHECK]: false,
};

interface Form {
  email: string;
  username: string;
  password: string;
}

const SignUpForm = () => {
  const form = useLocalObservable(() => ({
    values: {
      email: '',
      username: '',
      password: '',
      passwordCheck: '',
    },
    errors: INITIAL_ERRORS,
    onChange(event: ChangeEvent<HTMLInputElement>) {
      this.values = {
        ...this.values,
        [event.target.name]: event.target.value,
      };
    },
    onValidation() {
      const { email, password, passwordCheck } = this.values;

      if (!emailValidator(email)) {
        this.errors[UI.EMAIL] = true;
        return false;
      }

      if (passwordValidator(password, passwordCheck)) {
        this.errors[UI.PASSWORD] = true;
        return false;
      }

      return true;
    },
  }));

  const onSignUp = () => {
    if (!form.onValidation()) return;

    mutation.mutate(form.values);
  };

  const mutation = useMutation<void, Error, Form>((values) => axios.post('/api/user', { params: values }));

  const isAvailable = Object.values(form.values).every((str) => str.trim());

  return (
    <Root>
      <Inner>
        <Title>회원가입</Title>
        <TextField
          label="이메일 주소"
          variant="standard"
          name="email"
          onChange={form.onChange}
          value={form.values.email}
          helperText="회원가입을 위해서 해당 이메일을 통해 인증이 필요합니다."
          error={form.errors[UI.EMAIL]}
        />
        <TextField
          label="이름"
          variant="standard"
          name="username"
          onChange={form.onChange}
          value={form.values.username}
        />
        <TextField
          type="password"
          label="비밀번호"
          variant="standard"
          name="password"
          onChange={form.onChange}
          value={form.values.password}
          error={form.errors[UI.PASSWORD]}
        />
        <TextField
          type="password"
          label="비밀번호 확인"
          variant="standard"
          name="passwordCheck"
          onChange={form.onChange}
          value={form.values.passwordCheck}
          helperText="8~16자 영문 대 소문자, 숫자, 특수문자를 사용해주세요."
          error={form.errors[UI.PASSWORD]}
        />
        <Description>
          <ul>
            <li>비밀번호는 단방향 암호화가 진행되어 블로그 주인조차 알 방법이 없습니다.</li>
            <li>블로그는 오픈 소스로 공개되어있습니다.</li>
          </ul>
        </Description>
        <SignUpButton variant="contained" disabled={!isAvailable} onClick={onSignUp}>
          회원가입
        </SignUpButton>
      </Inner>
    </Root>
  );
};

const Root = styled.div({
  display: 'flex',
  width: '450px',
  flexDirection: 'column',
  borderRadius: '1rem',
  background: dsPalette.themeWhite.toString(),
  boxShadow: 'rgb(0 0 0 / 4%) 0px 4px 16px 0px',
});

const Inner = styled.div({
  padding: '3rem',
});

const Title = styled.h1({
  marginBottom: '1rem',
  textAlign: 'center',
});

const SignUpButton = styled(SubmitButton)({
  width: '100%',
  fontSize: '1rem',
  '&&&': {
    padding: '1rem',
  },
});

const Description = styled.div({
  color: dsPalette.typeSecond.toString(),
  backgroundColor: dsPalette.themeBackground.toString(),
  lineHeight: 1.5,
  fontSize: '.75rem',
  padding: '1rem 1rem 1rem 2rem',
  marginBottom: '1rem',
  borderRadius: '.25rem',
});

export default observer(SignUpForm);
