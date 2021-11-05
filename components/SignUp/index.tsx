import React from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';

import EmailVerify from '@components/EmailVerify';
import Form from './Form';

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
    [Page.DONE]: <></>,
  };

  return pages[page.current];
};

export default observer(SignUp);
