import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import RowModal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

interface Props {
  children: ReactNode;
  title: string;
  open: boolean;
  onClose(): void;
}

const Modal = ({
  children, title, open, onClose,
}: Props) => (
  <StyledModal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    open={open}
    onClose={onClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={open}>
      <Paper>
        <h2>{title}</h2>
        {children}
      </Paper>
    </Fade>
  </StyledModal>
);

const StyledModal = styled(RowModal)`
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
    border-bottom: 1px solid #e6e6e6;
  }
`;

export default Modal;
