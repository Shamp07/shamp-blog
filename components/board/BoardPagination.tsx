import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import PaginationItem from '@material-ui/lab/PaginationItem';
import useStores from '../../stores/useStores';
import { RootStore } from '../../stores';

const BoardPagination = () => {
  const router = useRouter();
  const { PostStore } = useStores() as RootStore;
  const { postList, movePage } = PostStore;

  let pageCount = 1;
  if (router.query.page) {
    pageCount = Number(router.query.page);
  }

  let count = 0;
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
