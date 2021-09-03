import React from 'react';
import NextNprogress from 'nextjs-progressbar';

import SignModal from '../../util/SignPopup';
import RegisterModal from '../../util/RegisterPopup';
import AlertModal from '../../util/AlertPopup';
import ConfirmModal from '../../util/ConfirmPopup';
import EmailModal from '../../util/EmailPopup';
import PasswordChangeModal from '../../util/PasswordChangePopup';
import DeleteUserModal from '../../util/DeleteUserPopup';

const HeaderUtilComponents = () => (
  <>
    <SelectPopup />
    <SignModal />
    <RegisterModal />
    <AlertModal />
    <ConfirmModal />
    <EmailModal />
    <PasswordChangeModal />
    <DeleteUserModal />
    <NextNprogress
      color="#fff"
      startPosition={0.3}
      stopDelayMs={200}
      height={3}
      options={{
        showSpinner: false,
      }}
    />
  </>
);

export default HeaderUtilComponents;
