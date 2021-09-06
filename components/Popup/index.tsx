import React from 'react';
import { observer } from 'mobx-react-lite';

import stores from '@stores';
import * as T from '@types';
import AlertPopup from '@components/Popup/AlertPopup';
import ConfirmPopup from '@components/Popup/ConfirmPopup';
import SignInPopup from '@components/Popup/SignInPopup';
import SignUpPopup from '@components/Popup/SignUpPopup';
import PasswordResetPopup from '@components/Popup/PasswordResetPopup';
import EmailVerifyPopup from '@components/Popup/EmailVerifyPopup';
import AccountDeletePopup from '@components/Popup/AccountDeletePopup';

const Popup = () => {
  const { utilStore } = stores();
  const { popup } = utilStore;
  const { type } = popup;

  switch (type) {
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

export default observer(Popup);
