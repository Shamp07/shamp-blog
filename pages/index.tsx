import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

import stores from '@stores';
import HomePostList from '@components/home/Post/HomePostList';
import Footprint from '@components/home/Footprint';
import Button from '@atoms/Button';
import * as T from '@types';
import { MediaQuery } from '@styles';

const Home = () => {
  const { homeStore } = stores();
  const { noticePosts, recentPosts } = homeStore;

  const onReload = useCallback(() => {
    homeStore.getFootprint();
  }, []);

  return (
    <GridWrapper>
      <CustomGrid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <h2>공지사항</h2>
          <HomePostList list={noticePosts} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <h2>최근 글</h2>
          <HomePostList list={recentPosts} />
        </Grid>
        <RelativeGrid item xs={12}>
          <h2>발자취</h2>
          <ButtonWrapper>
            <Button
              size={T.ButtonSize.SMALL}
              variant="outlined"
              onClick={onReload}
              color="primary"
            >
              <ReloadIcon icon={faSync} />
              {' '}
              새로고침
            </Button>
          </ButtonWrapper>
          <Footprint />
        </RelativeGrid>
      </CustomGrid>
    </GridWrapper>
  );
};

Home.getInitialProps = async () => {
  const { homeStore } = stores();

  await Promise.all([
    homeStore.getRecentPosts(),
    homeStore.getNoticePosts(),
    homeStore.getFootprint(),
  ]);

  return {
    props: {},
  };
};

const GridWrapper = styled.div({
  flexGrow: 1,
  backgroundColor: '#fff',
  boxShadow: '0 1px 3px 0 rgba(0,0,0,.15)',
  borderRadius: '14px',

  [MediaQuery[T.Device.LARGE]]: {
    borderRadius: 0,
  },
});

const CustomGrid = styled(Grid)({
  margin: '0 !important',
  width: '100% !important',

  '& > div': {
    padding: '20px !important',

    [MediaQuery[T.Device.LARGE]]: {
      padding: '20px 15px !important',
    },
  },

  '& > div > h2': {
    paddingBottom: '15px',
    marginBottom: '15px',
    borderBottom: '1px solid #e6e6e6',
  },
});

const ButtonWrapper = styled.div`
  & > button {
    position: absolute;
    top: 20px;
    right: 20px;
  }

  & svg {
    margin-right: 5px;
  }
`;

const RelativeGrid = styled(Grid)`
  position: relative;
`;

const ReloadIcon = styled(FontAwesomeIcon)`
  width: 12px;
  height: 12px;
`;

export default Home;
