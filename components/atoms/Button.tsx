import React, { CSSProperties } from 'react';
import RawButton, { ButtonProps } from '@mui/material/Button';
import RawLoadingButton from '@mui/lab/LoadingButton';
import styled from '@emotion/styled';

interface Props extends ButtonProps {
  onClick?(): void;
  customStyles?: CSSProperties;
}

const Button = ({
  size,
  color,
  variant,
  onClick,
  customStyles,
  children,
}: Props) => (
  <Root customStyles={customStyles} onClick={onClick}>
    <RawButton
      size={size}
      color={color}
      variant={variant}
    >
      {children}
    </RawButton>
  </Root>
);

const Root = styled.div<{ customStyles?: CSSProperties }>(({ customStyles }) => ({
  '& + &': {
    marginLeft: '0.75rem',
  },
  '&&& .MuiButton-root': {
    ...commonButtonStyle,
    ...customStyles,
  },
}));

Button.defaultProps = {
  onClick: undefined,
  customStyles: undefined,
};

const commonButtonStyle = {
  boxShadow: 'none',
  fontFamily: 'inherit',
  letterSpacing: 'normal',
};

export const LoadingButton = styled(RawLoadingButton)({
  '&&&': {
    ...commonButtonStyle,
  },
});

export default Button;
