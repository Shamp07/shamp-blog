import React, { ChangeEvent, KeyboardEvent, useEffect } from 'react';
import Link from 'next/link';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useMutation } from 'react-query';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';

import stores from '@stores';
import dsPalette from '@constants/ds-palette';
import { LoadingButton } from '@atoms/Button';
import TextField from '@atoms/TextField';
import { MediaQuery } from '@constants/styles';
import * as T from '@types';
import { Page } from '@utilities/route';

const SignIn = () => {
  const router = useRouter();
  const { signStore } = stores();

  const form = useLocalObservable(() => ({
    values: {
      email: '',
      password: '',
    },
    autoSignIn: false,
    isError: false,
    onChange(event: ChangeEvent<HTMLInputElement>) {
      this.values = {
        ...this.values,
        [event.target.name]: event.target.value,
      };
    },
    onChangeAutoSignIn() {
      this.autoSignIn = !this.autoSignIn;
    },
  }));

  const mutation = useMutation<T.Response<T.EncodedAuthToken>, Error, void>(
    () => signStore.signIn(form.values),
  );

  const isAvailable = form.values.email.trim() && form.values.password.trim();

  const onSignIn = () => {
    if (isAvailable) mutation.mutate();
  };

  const onEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') onSignIn();
  };

  useEffect(() => {
    if (mutation.isSuccess && mutation.data.result) {
      cookie.set('auth', mutation.data.result, { expires: 2 });
      signStore.authCheck();
      router.push(Page.HOME);
    }
  }, [mutation.isSuccess]);

  useEffect(() => {
    if (mutation.isError) form.isError = true;
  }, [mutation.isError]);

  const errorMessage = form.isError ? (
    <ErrorDescription>
      이메일이 존재하지 않거나 비밀번호가 일치하지 않습니다. 다시 시도해주세요.
    </ErrorDescription>
  ) : null;

  return (
    <Root>
      <Inner>
        <Title>로그인</Title>
        <Wrapper>
          <TextField
            label="이메일 주소"
            variant="standard"
            name="email"
            onChange={form.onChange}
            value={form.values.email}
            error={form.isError}
            onKeyPress={onEnter}
          />
          <TextField
            type="password"
            label="비밀번호"
            variant="standard"
            name="password"
            onChange={form.onChange}
            value={form.values.password}
            error={form.isError}
            onKeyPress={onEnter}
          />
        </Wrapper>
        {errorMessage}
        <SignInButton variant="contained" loading={mutation.isLoading} disabled={!isAvailable} onClick={onSignIn}>
          로그인
        </SignInButton>
        <Link href={Page.SIGN_UP} passHref>
          <SignUp>회원가입</SignUp>
        </Link>
      </Inner>
    </Root>
  );
};

const Root = styled.div({
  display: 'flex',
  width: '450px',
  marginTop: '3.5rem',
  flexDirection: 'column',
  borderRadius: '1rem',
  background: dsPalette.themeWhite.toString(),
  boxShadow: 'rgb(0 0 0 / 4%) 0px 4px 16px 0px',

  [MediaQuery[T.Device.TABLET]]: {
    marginTop: '1rem',
    width: '100%',
  },
});

const Inner = styled.div({
  padding: '3rem',

  [MediaQuery[T.Device.TABLET]]: {
    padding: '2rem',
  },
});

const Title = styled.h1({
  marginBottom: '1rem',
  textAlign: 'center',
});

const Wrapper = styled.div({
  '& > div': {
    marginBottom: '20px',
  },
});

const SignInButton = styled(LoadingButton)({
  width: '100%',
  fontSize: '.9rem',
  '&&&': {
    padding: '.9rem',
  },
});

const SignLink = styled.a({
  textDecorationLine: 'none',
  color: dsPalette.typeSecond.toString(),
  fontSize: '.875rem',
  '&:hover': {
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
  lineHeight: 1.5,
  fontSize: '.8rem',
  marginBottom: '1rem',
  wordBreak: 'keep-all',
});

export default observer(SignIn);
