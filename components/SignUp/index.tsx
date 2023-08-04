import React from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';

import styled from '@emotion/styled';
import dsPalette from '@constants/ds-palette';
import { MediaQuery } from '@constants/styles';
import * as T from '@types';
import Form from './Form';
import EmailVerify from './EmailVerify';
import Done from './Done';

enum Page {
  FORM = 'form',
  EMAIL_VERIFY = 'email-verify',
  DONE = 'done',
}

const SignUp = () => {
  const page = useLocalObservable(() => ({
    current: Page.FORM,
    email: '',
    next() {
      this.current = (() => {
        switch (this.current) {
          case Page.FORM:
            return Page.EMAIL_VERIFY;
          case Page.EMAIL_VERIFY:
            return Page.DONE;
          default:
            return Page.FORM;
        }
      })();
    },
    setEmail(email: string) {
      this.email = email;
    },
  }));

  const pages = {
    [Page.FORM]: <Form setEmail={page.setEmail} next={page.next} />,
    [Page.EMAIL_VERIFY]: <EmailVerify email={page.email} next={page.next} />,
    [Page.DONE]: <Done />,
  };

  return (
    <Root>
      <Inner>
        {pages[page.current]}
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
  boxShadow: 'rgb(0 0 0 / 4%) 0 4px 16px 0',
  marginTop: '3.5rem',

  [MediaQuery[T.Device.TABLET]]: {
    width: '100%',
    marginTop: '1rem',
  },
});

const Inner = styled.div({
  padding: '3rem',
});

export default observer(SignUp);
