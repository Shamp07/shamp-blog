import React, { ReactNode } from 'react';
import { Button as RowButton, PropTypes, ButtonTypeMap } from '@material-ui/core';
import styled from '@emotion/styled';

interface Props {
  readonly children: ReactNode;
  readonly variant: 'text' | 'outlined' | 'contained';
  readonly color: PropTypes.Color;
  onClick(): void;
}

const PopupButton = ({
  children, variant, color, onClick,
}: Props) => (
  <Button
    variant={variant}
    color={color}
    onClick={onClick}
  >
    {children}
  </Button>
);

const Button = styled(RowButton)`
  height: 44px;
  &&& {
    padding: 0 18px;
    box-shadow: none;
    border-radius: 10px;
  }
`;

export default PopupButton;
