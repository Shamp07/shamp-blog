import RowButton from '@mui/material/Button';
import RowLoadingButton from '@mui/lab/LoadingButton';
import styled from '@emotion/styled';

import dsPalette from '@constants/ds-palette';

const CommonButtonStyle = {
  '&&&': {
    boxShadow: 'none',
    fontFamily: 'inherit',
  },
};

const Button = styled(RowButton)({
  '&&&': {
    boxShadow: 'none',
    fontFamily: 'inherit',
  },
});

export const SubmitButton = styled(Button)(() => ({
}));

export const LoadingButton = styled(RowLoadingButton)({
  ...CommonButtonStyle,
});

export const SubButton = styled(SubmitButton)({
  '&&&': {
    background: dsPalette.themePrimary.toString(),
  },
});

export default Button;
