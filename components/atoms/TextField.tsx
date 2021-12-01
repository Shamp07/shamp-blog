import React, { KeyboardEvent } from 'react';
import styled from '@emotion/styled';
import RawTextField from '@mui/material/TextField';
import { TextFieldProps } from '@mui/material/TextField/TextField';

import dsPalette from '@constants/ds-palette';

type Props = TextFieldProps & {
  description?: string;
  borderless?: boolean;
  onKeyPress?(event: KeyboardEvent<HTMLInputElement>): void;
};

const TextField = ({
  type,
  label,
  variant,
  name,
  onChange,
  value,
  helperText,
  error,
  description,
  onKeyPress,
  borderless,
}: Props) => (
  <Root borderless={borderless}>
    <Field
      type={type}
      label={label}
      variant={variant}
      name={name}
      onChange={onChange}
      value={value}
      helperText={helperText}
      error={error}
      onKeyPress={onKeyPress}
    />
    {description && <Description>{description}</Description>}
  </Root>
);

TextField.defaultProps = {
  description: undefined,
  onKeyPress: undefined,
  borderless: false,
};

const Root = styled.div<{ borderless?: boolean }>(({ borderless }) => ({
  ...(borderless ? ({
    '& fieldset': {
      border: 0,
    },
  }) : null),
}));

const Field = styled(RawTextField)({
  width: '100%',
  '&&& *': {
    fontFamily: 'inherit',
  },
});

const Description = styled.div({
  color: dsPalette.typeBlack.toString(),
  opacity: 0.6,
  fontWeight: 400,
  fontSize: '.75rem',
  lineHeight: 1.66,
  letterSpacing: '.03333em',
  textAlign: 'left',
  marginTop: '3px',
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
});

export default TextField;
