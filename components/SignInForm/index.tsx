import React from 'react';
import styled from '@emotion/styled';

import dsPalette from '@constants/ds-palette';
import { SubmitButton } from '@atoms/Button';

const SignInForm = () => (
  <Root>
    <SignInButton
      variant="contained"
    >
      로그인
    </SignInButton>
  </Root>
);

const Root = styled.div({
  display: 'flex',
  width: '450px',
  flexDirection: 'column',
  padding: '2rem',
  borderRadius: '1rem',
  background: dsPalette.themeWhite.toString(),
  boxShadow: 'rgb(0 0 0 / 4%) 0px 4px 16px 0px',
});

const SignInButton = styled(SubmitButton)({
  width: '100%',
  '&&&': {
    padding: '1rem',
  },
});

export default SignInForm;
