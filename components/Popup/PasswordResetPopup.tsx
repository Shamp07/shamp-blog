import React from 'react';
import { observer } from 'mobx-react-lite';

import stores from '@stores';
import Modal from '@atoms/Modal';
import Button from '@atoms/Button';
import TextField from '@atoms/TextField';
import * as T from '@types';

const PasswordResetPopup = () => {
  const { signStore } = stores();
  const { changePassword, passwordInfo, passwordHandleChange } = signStore;
  const {
    currentPassword, changePassword: changePasswordValue, changePasswordCheck,
  } = passwordInfo;
  return (
    <Modal title="비밀번호 변경">
      <div>
        <TextField
          label="현재 비밀번호"
          onChange={passwordHandleChange}
          value={currentPassword}
          name="currentPassword"
          type="password"
        />
        <br />
        <TextField
          label="변경할 비밀번호"
          onChange={passwordHandleChange}
          value={changePasswordValue}
          name="changePassword"
          type="password"
        />
        <br />
        <TextField
          label="변경할 비밀번호 확인"
          onChange={passwordHandleChange}
          value={changePasswordCheck}
          name="changePasswordCheck"
          type="password"
        />
        <br />
      </div>
      <div>
        <Button
          size={T.ButtonSize.MEDIUM}
          variant="contained"
          color="primary"
          onClick={changePassword}
        >
          변경하기
        </Button>
      </div>
    </Modal>
  );
};

export default observer(PasswordResetPopup);
