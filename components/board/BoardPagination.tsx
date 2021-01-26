import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import styled from 'styled-components';

const BoardPagination: React.FC = () => (
  <PaginationWrapper>
    <CustomPagination count={0} color="primary" />
  </PaginationWrapper>
);

const PaginationWrapper = styled.div`
  margin-top: 15px;
  text-align: center;
`;

const CustomPagination = styled(Pagination)`
  display: inline-flex;
`;

export default BoardPagination;
