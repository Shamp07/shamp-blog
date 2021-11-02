import React from 'react';
import styled from '@emotion/styled';
import RowTextField from '@mui/material/TextField';
import { TextFieldProps } from '@mui/material/TextField/TextField';

import dsPalette from '@constants/ds-palette';

type Props = TextFieldProps & {
  description?: string;
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
}: Props) => (
  <Root>
    <Field
      type={type}
      label={label}
      variant={variant}
      name={name}
      onChange={onChange}
      value={value}
      helperText={helperText}
      error={error}
    />
    {description && <Description>{description}</Description>}
  </Root>
);

TextField.defaultProps = {
  description: undefined,
};

const Root = styled.div({
  marginBottom: '20px',
});

const Field = styled(RowTextField)({
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
