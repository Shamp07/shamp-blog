import { TextField as RowTextField } from '@material-ui/core';
import styled from '@emotion/styled';

const TextField = styled(RowTextField)`
  width: 100%;
  margin-bottom: 15px;
  &&& * {
    font-family: inherit;
  }
`;

export default TextField;
