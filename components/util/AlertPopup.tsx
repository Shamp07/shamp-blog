import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';

import stores from '@stores';
import Modal from '@atoms/Modal';
import Button from '@atoms/Button';
import * as T from '@types';

const ConfirmModal = () => {
  const { alertStore } = stores();
  const { isOpenAlertModal, text } = alertStore;

  const onClose = useCallback(() => {
    alertStore.closeAlertModal();
  }, []);

  const focusRef = useCallback((node: HTMLButtonElement) => {
    node?.focus();
  }, []);

  return (
    <Modal
      title="알림"
      open={isOpenAlertModal}
      onClose={onClose}
    >
      {/* eslint-disable-next-line react/no-danger */}
      <Content dangerouslySetInnerHTML={{ __html: text }} />
      <Footer>
        <Button
          ref={focusRef}
          variant="contained"
          color="primary"
          onClick={onClose}
          size={T.ButtonSize.MEDIUM}
        >
          확인하기
        </Button>
      </Footer>
    </Modal>
  );
};

const Content = styled.div`
  padding: 20px 15px 20px 0;
  margin-bottom: 10px;
`;

const Footer = styled.div`
  display: flex;
`;

export default observer(ConfirmModal);
