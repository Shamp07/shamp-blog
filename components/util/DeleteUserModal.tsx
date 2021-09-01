import React, { useCallback, ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';

import stores from '@stores';
import Button from '@atoms/Button';
import Modal from '@atoms/Modal';
import TextField from '@atoms/TextField';
import * as T from '@types';

const DeleteUserModal = () => {
  const { signStore } = stores();
  const { isOpenDeleteUserModal, deleteUserInfo, deleteUser } = signStore;
  const { deleteEmail, deleteText } = deleteUserInfo;

  const onClose = useCallback(() => {
    signStore.toggleDeleteUserModal();
  }, []);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    signStore.deleteUserHandleChange(event);
  }, []);

  const onDelete = useCallback(() => {
    signStore.deleteUser();
  }, []);

  return (
    <Modal
      open={isOpenDeleteUserModal}
      onClose={onClose}
      title="회원 탈퇴"
    >
      <div>
        <div>본인의 이메일과 아래의 내용과 동일하게 적어주세요.</div>
        <br />
        <TextField
          label="e-mail"
          onChange={onChange}
          value={deleteEmail}
          name="deleteEmail"
        />
        <TextField
          label="'계정을 삭제하겠습니다' 라고 적어주세요."
          onChange={onChange}
          value={deleteText}
          name="deleteText"
        />
      </div>
      <div>
        <Button
          size={T.ButtonSize.MEDIUM}
          variant="contained"
          color="default"
          onClick={onDelete}
        >
          취소
        </Button>
        <Button
          size={T.ButtonSize.MEDIUM}
          variant="contained"
          color="primary"
          onClick={deleteUser}
          disabled={deleteText !== '계정을 삭제하겠습니다'}
        >
          탈퇴하기
        </Button>
      </div>
    </Modal>
  );
};

export default observer(DeleteUserModal);
