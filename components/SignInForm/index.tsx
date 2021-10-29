import React, { ChangeEvent } from 'react';
import Link from 'next/link';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useMutation } from 'react-query';
import styled from '@emotion/styled';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';

import stores from '@stores';
import dsPalette from '@constants/ds-palette';
import { SubmitButton } from '@atoms/Button';
import TextField from '@atoms/TextField';

interface Form {
  email: string;
  password: string;
}

const SignInForm = () => {
  const form = useLocalObservable(() => ({
    values: {
      email: '',
      password: '',
    },
    onChange(event: ChangeEvent<HTMLInputElement>) {
      this.values = {
        ...this.values,
        [event.target.name]: event.target.value,
      };
    },
  }));

  const mutation = useMutation<Form, Error, Form>((values) => axios.post('/api/user/login', { params: values }));

  const onSignIn = () => {
    mutation.mutate(form.values);
  };

  const isAvailable = form.values.email.trim() && form.values.password.trim();

  const errorMessage = mutation.isError ? (
    <ErrorDescription>
      ID가 존재하지 않거나 비밀번호가 일치하지 않습니다. 다시 시도해주세요.
    </ErrorDescription>
  ) : null;

  return (
    <Root>
      <Inner>
        <Title>로그인</Title>
        <TextField label="이메일 주소" variant="standard" name="email" onChange={form.onChange} value={form.values.email} />
        <TextField label="비밀번호" variant="standard" name="password" onChange={form.onChange} value={form.values.password} type="password" />
        <Option>
          <FormControlLabel control={<Checkbox defaultChecked />} label="자동 로그인" />
          <Link href="/password" passHref>
            <SignLink>비밀번호 찾기</SignLink>
          </Link>
        </Option>
        {errorMessage}
        <SignInButton variant="contained" disabled={!isAvailable} onClick={onSignIn}>
          {mutation.isLoading ? '로딩' : '로그인'}
        </SignInButton>
        <Link href="/signup" passHref>
          <SignUp>회원가입</SignUp>
        </Link>
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

const Option = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  '& span': {
    fontFamily: 'inherit',
    fontSize: '14px',
    color: dsPalette.typeSecond.toString(),
  },
});

const SignInButton = styled(SubmitButton)({
  width: '100%',
  fontSize: '1rem',
  '&&&': {
    padding: '1rem',
  },
});

const SignLink = styled.a({
  textDecorationLine: 'none',
  color: dsPalette.typeSecond.toString(),
  fontSize: '.875rem',
  '&: hover': {
    textDecorationLine: 'underline',
  },
});

const SignUp = styled(SignLink)({
  display: 'block',
  width: '100%',
  textAlign: 'center',
  marginTop: '2rem',
});

const ErrorDescription = styled.div({
  color: dsPalette.themeError.toString(),
  lineHeight: '20px',
  fontSize: '.875rem',
  marginBottom: '1rem',
  wordBreak: 'keep-all',
});

export default observer(SignInForm);
