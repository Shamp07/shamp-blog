import React, { ReactNode } from 'react';
import { Button as RowButton, PropTypes } from '@material-ui/core';
import styled from '@emotion/styled';

import * as T from '@types';

interface Props {
  readonly children: ReactNode;
  readonly variant: 'text' | 'outlined' | 'contained';
  readonly color: PropTypes.Color;
  readonly size: T.ButtonSize;
  readonly disabled?: boolean;
  onClick(): void;
}

const Button = ({
  children, variant, color, size, disabled = false, onClick,
}: Props) => (
  <StyledButton
    variant={variant}
    color={color}
    size={size}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </StyledButton>
);

const StyledButton = styled(RowButton)(({ size }) => ({
  '&&&': {
    height: '44px',
    padding: '0 18px',
    boxShadow: 'none',
    borderRadius: '10px',

    ...(size === T.ButtonSize.SMALL ? ({
      height: '38px',
      padding: '0 16px',
    }) : null),
  },
}));

export default Button;
