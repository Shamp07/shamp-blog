import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import dsPalette from '@constants/ds-palette';
import { SubmitButton } from '@atoms/Button';
import TextField from '@atoms/TextField';


const SignInForm = () => (
  <Root>
    <Inner>
      <Title>로그인</Title>
      <TextField label="이메일 주소" variant="standard" />
      <TextField label="비밀번호" variant="standard" />
      <Option>
        <FormControlLabel control={<Checkbox defaultChecked />} label="자동 로그인" />
        <Link href="/password" passHref>
          <PasswordReset>비밀번호를 잊어버리셨나요?</PasswordReset>
        </Link>
      </Option>
      <SignInButton variant="contained">
        로그인
      </SignInButton>
    </Inner>
  </Root>
);

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
  marginBottom: '1rem',

  '& span': {
    fontFamily: 'inherit',
    fontSize: '14px',
  },
});

const PasswordReset = styled.a({
  fontSize: '14px',
});

const SignInButton = styled(SubmitButton)({
  width: '100%',
  '&&&': {
    padding: '1rem',
  },
});

export default SignInForm;
