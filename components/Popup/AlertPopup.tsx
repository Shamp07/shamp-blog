import React, { useRef, useEffect }  from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';

import stores from '@stores';
import Modal from '@atoms/Modal';
import Button from '@atoms/Button';
import * as T from '@types';

const AlertPopup = () => {
  const { utilStore } = stores();
  const { popup } = utilStore;
  const { description } = popup;

  const onClose = () => utilStore.closePopup();
  const ref = useRef<HTMLButtonElement>(null);

  // const focusRef = (node: HTMLButtonElement) => {
  //   setTimeout(() => {
  //     node?.focus();
  //     console.log('hi');
  //   }, 1000);
  // };

  useEffect(() => {
    ref.current.focus();
  }, [])

  return (
    <Modal title="알림">
      {/* eslint-disable-next-line react/no-danger */}
      <Content dangerouslySetInnerHTML={{ __html: description ?? '' }} />
      <Footer>
        <Button
          ref={ref}
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

export default observer(AlertPopup);
