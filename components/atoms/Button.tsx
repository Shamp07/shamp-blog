import RawButton from '@mui/material/Button';
import RawLoadingButton from '@mui/lab/LoadingButton';
import styled from '@emotion/styled';

import dsPalette from '@constants/ds-palette';

const CommonButtonStyle = {
  '&&&': {
    boxShadow: 'none',
    fontFamily: 'inherit',
  },
};

const Button = styled(RawButton)({
  '&&&': {
    boxShadow: 'none',
    fontFamily: 'inherit',
  },
});

export const SubmitButton = styled(Button)(() => ({
}));

export const LoadingButton = styled(RawLoadingButton)({
  ...CommonButtonStyle,
});

export const SubButton = styled(SubmitButton)({
  '&&&': {
    background: dsPalette.themePrimary.toString(),
  },
});

export default Button;
