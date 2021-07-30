import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import { Button } from '@material-ui/core';

import useStores from '@stores/useStores';
import Modal from '@atoms/Modal';

const ConfirmModal = () => {
  const { AlertStore } = useStores();
  const { isOpenAlertModal, text, closeAlertModal } = AlertStore;

  const focusRef = useCallback((node: HTMLButtonElement) => {
    node?.focus();
  }, []);

  return (
    <Modal
      title="알림"
      open={isOpenAlertModal}
      onClose={closeAlertModal}
    >
      {/* eslint-disable-next-line react/no-danger */}
      <Content dangerouslySetInnerHTML={{ __html: text }} />
      <Footer>
        <RightButton
          variant="contained"
          color="primary"
          onClick={closeAlertModal}
          ref={focusRef}
        >
          확인하기
        </RightButton>
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

const RightButton = styled(Button)`
  height: 44px;
  border-radius: 10px !important;
  padding-left: 18px !important;
  padding-right: 18px !important;
  margin-left: auto !important;
  box-shadow: none !important;
`;

export default observer(ConfirmModal);
