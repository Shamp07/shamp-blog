import React, { ChangeEvent } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import styled from '@emotion/styled';

import dsPalette from '@constants/ds-palette';
import TextField from '@atoms/TextField';
import {SubmitButton} from "@atoms/Button";

const SignUpForm = () => {
  const form = useLocalObservable(() => ({
    values: {
      email: '',
      username: '',
      password: '',
      passwordCheck: '',
    },
    onChange(event: ChangeEvent<HTMLInputElement>) {
      this.values = {
        ...this.values,
        [event.target.name]: event.target.value,
      };
    },
  }));

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
          helperText="회원가입을 위해서 해당 이메일을 통해 인증이 진행이 필요합니다."
        />
        <TextField label="닉네임" variant="standard" name="password" onChange={form.onChange} value={form.values.username} />
        <TextField label="비밀번호" variant="standard" name="password" onChange={form.onChange} value={form.values.password} />
        <TextField label="비밀번호 확인" variant="standard" name="password" onChange={form.onChange} value={form.values.passwordCheck} />
        <SignUpButton variant="contained">
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

export default SignUpForm;
