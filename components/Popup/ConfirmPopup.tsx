import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';

import Modal from '@atoms/Modal';
import Button from '@atoms/Button';
import stores from '@stores';
import * as T from '@types';

const ConfirmPopup = () => {
  const { utilStore } = stores();
  const { popup } = utilStore;
  const { description, callback } = popup;

  const onClose = () => utilStore.closePopup();
  const onConfirm = () => utilStore.confirm(callback);

  return (
    <Modal title="알림">
      <Content>
        {description}
      </Content>
      <Footer>
        <Button
          size={T.ButtonSize.MEDIUM}
          variant="contained"
          onClick={onConfirm}
          color="primary"
        >
          확인
        </Button>
        <Button
          size={T.ButtonSize.MEDIUM}
          variant="outlined"
          onClick={onClose}
          color="primary"
        >
          취소
        </Button>
      </Footer>
    </Modal>
  );
};

const Content = styled.div`
  padding: 20px 0;
  margin-bottom: 10px;
`;

const Footer = styled.div`
  display: flex;
  
  & > button:first-of-type {
    margin-left: auto;
    margin-right: 5px;
  }
`;

export default observer(ConfirmPopup);
