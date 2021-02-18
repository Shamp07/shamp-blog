import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import PaginationItem from '@material-ui/lab/PaginationItem';
import useStores from '../../stores/useStores';

const BoardPagination = () => {
  const router = useRouter();

  let pageCount = 1;
  if (router.query.page) {
    pageCount = Number(router.query.page);
  }

  const { PostStore } = useStores();
  const { postList, movePage } = PostStore;

  let count: number = 0;
  if (postList.length > 0) {
    count = Number(postList[0].page);
  }

  return (
    <PaginationWrapper>
      <CustomPagination
        page={pageCount}
        count={count}
        color="primary"
        renderItem={(item) => (
          <PaginationItem
            {...item}
            component="div"
            onClick={() => movePage(router, item.page)}
          />
        )}
      />
    </PaginationWrapper>
  );
};

const PaginationWrapper = styled.div`
  margin-top: 15px;
  text-align: center;
`;

const CustomPagination = styled(Pagination)`
  display: inline-flex;
`;

export default BoardPagination;
