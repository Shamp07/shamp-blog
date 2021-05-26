import React from 'react';
import NextNprogress from 'nextjs-progressbar';

import SignModal from '../../util/SignModal';
import RegisterModal from '../../util/RegisterModal';
import AlertModal from '../../util/AlertModal';
import ConfirmModal from '../../util/ConfirmModal';
import EmailModal from '../../util/EmailModal';
import PasswordChangeModal from '../../util/PasswordChangeModal';
import DeleteUserModal from '../../util/DeleteUserModal';

const HeaderUtilComponents = () => (
  <>
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
