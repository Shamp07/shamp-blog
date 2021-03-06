import React from 'react';
import styled from '@emotion/styled';
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

import useStores from '@stores/useStores';
import HomePostList from '@components/home/HomePostList';
import Footprint from '@components/home/Footprint';
import Button from '@atoms/Button';
import * as T from '@types';
import { MyNextPageContext } from './_app';

const Home = () => {
  const { HomeStore } = useStores();
  const { noticePostList, recentlyPostList, getFootprint } = HomeStore;

  return (
    <GridWrapper>
      <CustomGrid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <h2>공지사항</h2>
          <HomePostList list={noticePostList} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <h2>최근 글</h2>
          <HomePostList list={recentlyPostList} />
        </Grid>
        <RelativeGrid item xs={12}>
          <h2>발자취</h2>
          <ButtonWrapper>
            <Button
              size={T.ButtonSize.SMALL}
              variant="outlined"
              onClick={getFootprint}
              color="default"
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

Home.getInitialProps = async ({ store }: MyNextPageContext) => {
  if (!store) return null;

  const { HomeStore } = store;
  const { getRecentlyPostList, getNoticePostList, getFootprint } = HomeStore;

  await Promise.all([
    getRecentlyPostList(),
    getNoticePostList(),
    getFootprint(),
  ]);

  return {
    props: {},
  };
};

const GridWrapper = styled.div`
  flex-grow: 1;
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
  border-radius: 14px;

  @media (max-width: 1064px) {
    border-radius: 0;
  }
`;

const CustomGrid = styled(Grid)`
  margin: 0 !important;
  width: 100% !important;
  
  & > div {
    padding: 20px !important;
    
    @media (max-width: 1064px) {
      padding: 20px 15px !important;
    }
  }
  
  & > div > h2 {
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid #e6e6e6;
  }
`;

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
