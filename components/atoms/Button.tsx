import { Button as RowButton } from '@material-ui/core';
import styled from '@emotion/styled';

import * as T from '@types';

const Button = styled(RowButton)(({ size }) => ({
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
