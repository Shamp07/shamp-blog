import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

import Button from '@atoms/Button';
import * as T from '@types';
import { MediaQuery } from '@constants/styles';
import stores from '@stores';
import Footprint from './Footprint';
import PostList from './PostList';

const Home = () => {
  const { homeStore } = stores();
  const { noticePosts, recentPosts } = homeStore;

  const onReload = useCallback(() => {
    homeStore.getFootprint();
  }, []);

  return (
    <Root>
      <WrapperGrid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <h2>공지사항</h2>
          <PostList list={noticePosts} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <h2>최근 글</h2>
          <PostList list={recentPosts} />
        </Grid>
        <BottomGrid item xs={12}>
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
        </BottomGrid>
      </WrapperGrid>
    </Root>
  );
};

const Root = styled.div({
  flexGrow: 1,
  backgroundColor: '#fff',
  boxShadow: '0 1px 3px 0 rgba(0,0,0,.15)',
  borderRadius: '14px',

  [MediaQuery[T.Device.TABLET]]: {
    borderRadius: 0,
  },
});

const WrapperGrid = styled(Grid)({
  margin: '0 !important',
  width: '100% !important',

  '& > div': {
    padding: '20px !important',

    [MediaQuery[T.Device.TABLET]]: {
      padding: '20px 15px !important',
    },
  },

  '& > div > h2': {
    paddingBottom: '15px',
    marginBottom: '15px',
    borderBottom: '1px solid #e6e6e6',
  },
});

const BottomGrid = styled(Grid)`
  position: relative;
`;

const ButtonWrapper = styled.div`
  & > button {
    position: absolute;
    top: 20px;
    right: 20px;
    
    & svg {
      margin-right: 5px;
    }
  }
`;

const ReloadIcon = styled(FontAwesomeIcon)`
  width: 12px;
  height: 12px;
`;

export default Home;
