import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import RawModal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import RawBox from '@mui/material/Box';
import Fade from '@mui/material/Fade';

import stores from '@stores';
import dsPalette from '@constants/ds-palette';

interface Props {
  children: ReactNode;
  title: string;
}

const Modal = ({ children, title }: Props) => {
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
        <Box>
          <h2>{title}</h2>
          {children}
        </Box>
      </Fade>
    </StyledModal>
  );
};

const StyledModal = styled(RawModal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Box = styled(RawBox)({
  position: 'absolute',
  margin: '0 20px',
  minWidth: '300px',
  maxWidth: '100%',
  backgroundColor: dsPalette.themeWhite.toString(),
  borderRadius: '16px',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, .15)',
  padding: '36px',
  lineHeight: '25px',

  '&:focus': {
    outline: 0,
  },

  '& > h2': {
    marginBottom: '10px',
    padding: '10px 0',
  },
});

export default Modal;
