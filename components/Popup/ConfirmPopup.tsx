import React from 'react';
import styled from '@emotion/styled';

import stores from '@stores';
import Modal from '@atoms/Modal';
import Button from '@atoms/Button';

const ConfirmPopup = () => {
  const { utilStore } = stores();
  const { popup } = utilStore;
  const { description, callback } = popup;

  const onClose = () => utilStore.closePopup();
  const onConfirm = () => {
    if (callback) callback();
    onClose();
  };

  return (
    <Modal title="확인">
      <div>{description}</div>
      <Footer>
        <span>
          <Button variant="outlined" onClick={onClose}>취소</Button>
          <Button variant="contained" color="primary" onClick={onConfirm}>확인</Button>
        </span>
      </Footer>
    </Modal>
  );
};

const Footer = styled.div({
  display: 'flex',
  marginTop: '2rem',

  '& > span': {
    display: 'flex',
    marginLeft: 'auto',
  },
});

export default ConfirmPopup;
