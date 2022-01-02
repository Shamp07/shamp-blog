import React from 'react';
import styled from '@emotion/styled';

import stores from '@stores';
import Modal from '@atoms/Modal';

const ConfirmPopup = () => {
  const { utilStore } = stores();
  const { popup } = utilStore;
  const { description } = popup;

  return (
    <Modal title="확인">
      <div>{description}</div>
      <Footer>
        <button type="button">하이</button>
        <button type="button">하이</button>
      </Footer>
    </Modal>
  );
};

const Footer = styled.div({
  display: 'flex',
  marginLeft: 'auto',
});

export default ConfirmPopup;
