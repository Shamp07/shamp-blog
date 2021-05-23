import React from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { Pagination, PaginationItem } from '@material-ui/lab';

import useStores from '@stores/useStores';

const BoardPagination = () => {
  const router = useRouter();
  const { PostStore } = useStores();
  const { postList, movePage } = PostStore;

  const page = router.query.page ? Number(router.query.page) : 1;
  const count = postList.length ? Number(postList[0].page) : 0;

  return (
    <PaginationWrapper>
      <CustomPagination
        page={page}
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
