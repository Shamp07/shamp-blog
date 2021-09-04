import React from 'react';
import { observer } from 'mobx-react-lite';

import stores from '@stores';
import * as T from '@types';
import AlertPopup from '@components/util/AlertPopup';
import ConfirmPopup from '@components/util/ConfirmPopup';
import SignInPopup from '@components/util/SignInPopup';
import SignUpPopup from '@components/util/SignUpPopup';
import PasswordResetPopup from '@components/util/PasswordResetPopup';
import EmailVerifyPopup from '@components/util/EmailVerifyPopup';
import AccountDeletePopup from '@components/util/AccountDeletePopup';

const SelectPopup = () => {
  const { utilStore } = stores();
  const { popup } = utilStore;

  switch (popup) {
    case T.Popup.ALERT:
      return <AlertPopup />;
    case T.Popup.CONFIRM:
      return <ConfirmPopup />;
    case T.Popup.SIGN_IN:
      return <SignInPopup />;
    case T.Popup.SIGN_UP:
      return <SignUpPopup />;
    case T.Popup.PASSWORD_RESET:
      return <PasswordResetPopup />;
    case T.Popup.EMAIL_VERIFY:
      return <EmailVerifyPopup />;
    case T.Popup.ACCOUNT_DELETE:
      return <AccountDeletePopup />;
    default:
      return null;
  }
};

export default observer(SelectPopup);
