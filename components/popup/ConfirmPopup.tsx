import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import Modal from '@atoms/Modal';
import Button from '@atoms/Button';
import stores from '@stores';
import * as T from '@types';

const ConfirmPopup = () => {
  const { utilStore } = stores();
  const {
    isOpenConfirmModal, callback,
    text, callFunction,
  } = utilStore;

  const call = useCallback(() => {
    callFunction(callback);
  }, []);

  const onClose = useCallback(() => {
    utilStore.closeConfirmModal();
  }, []);

  return (
    <Modal
      open={isOpenConfirmModal}
      onClose={onClose}
      title="알림"
    >
      <div>
        {text}
      </div>
      <div>
        <span>
          <Button
            size={T.ButtonSize.MEDIUM}
            variant="contained"
            onClick={onClose}
            color="default"
          >
            취소
          </Button>
          <Button
            size={T.ButtonSize.MEDIUM}
            variant="contained"
            onClick={call}
            color="primary"
          >
            확인하기
          </Button>
        </span>
      </div>
    </Modal>
  );
};

export default observer(ConfirmPopup);
