import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { Pagination, PaginationItem, PaginationRenderItemParams } from '@material-ui/lab';

import stores from '@stores';

const Pagination = () => {
  const router = useRouter();
  const { postStore } = stores();
  const { posts, movePage } = postStore;

  const page = router.query.page ? Number(router.query.page) : 1;
  const count = posts.length ? Number(posts[0].page) : 0;

  const renderItem = useCallback((item: PaginationRenderItemParams) => {
    const moveBoardPage = () => movePage(router, item.page);

    return (
      <PaginationItem
        {...item}
        component="div"
        onClick={moveBoardPage}
      />
    );
  }, []);

  return (
    <PaginationWrapper>
      <CustomPagination
        page={page}
        count={count}
        color="primary"
        renderItem={renderItem}
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

export default Pagination;
