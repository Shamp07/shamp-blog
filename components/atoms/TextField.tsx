import RowTextField from '@mui/material/TextField';
import styled from '@emotion/styled';

const TextField = styled(RowTextField)({
  width: '100%',
  marginBottom: '15px',
  '&&& *': {
    fontFamily: 'inherit',
  },
});

export default TextField;
