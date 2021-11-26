import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import RawModal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';

import stores from '@stores';

interface Props {
  children: ReactNode;
  title: string;
}

const Modal = ({
  children, title,
}: Props) => {
  const { utilStore } = stores();
  const onClose = () => utilStore.closePopup();

  return (
    <StyledModal
      open
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in>
        <Paper>
          <h2>{title}</h2>
          {children}
        </Paper>
      </Fade>
    </StyledModal>
  );
};

const StyledModal = styled(RawModal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Paper = styled.div`
  margin: 0 20px;
  min-width: 300px;
  max-width: 100%;
  background-color: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 16px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .15);
  padding: 36px;
  line-height: 25px;

  &:focus {
    outline: 0;
  }

  & > h2 {
    margin-bottom: 10px;
    padding: 10px 0;
  }
`;

export default Modal;
