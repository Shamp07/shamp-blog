import React from 'react';
import Grid from '@material-ui/core/Grid';
import styled from '@emotion/styled';
import { NextPage } from 'next';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useStores from '../stores/useStores';
import HomePostList from '../components/home/HomePostList';
import Footprint from '../components/home/Footprint';
import { MyNextPageContext } from './_app';

const Home: NextPage = () => {
  const { HomeStore } = useStores();
  const { noticePostList, recentlyPostList, getFootprint } = HomeStore;

  return (
    <GridWrapper>
      <CustomGrid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <h2>공지사항</h2>
          <HomePostList array={noticePostList} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <h2>최근 글</h2>
          <HomePostList array={recentlyPostList} />
        </Grid>
        <RelativeGrid item xs={12}>
          <h2>발자취</h2>
          <RightButton size="small" variant="outlined" onClick={getFootprint}>
            <span>
              <ReloadICon icon={faSync} />
              {' '}
              새로고침
            </span>
          </RightButton>
          <Footprint />
        </RelativeGrid>
      </CustomGrid>
    </GridWrapper>
  );
};

Home.getInitialProps = async ({ store }: MyNextPageContext) => {
  if (store) {
    const { HomeStore } = store;
    const { getRecentlyPostList, getNoticePostList, getFootprint } = HomeStore;
    await Promise.all([getRecentlyPostList(), getNoticePostList(), getFootprint()]);
  }

  return {
    props: {},
  };
};

const GridWrapper = styled.div`
  flex-grow: 1;
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
  border-radius: 4px;
`;

const CustomGrid = styled(Grid)`
  margin: 0 !important;
  width: 100% !important;
  
  & > div {
    padding: 20px !important;
    
    @media (max-width: 1064px) {
      padding: 15px !important;
    }
  }
  
  & > div > h2 {
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid #e6e6e6;
  }
`;

const RelativeGrid = styled(Grid)`
  position: relative;
`;

const RightButton = styled(Button)`
  position: absolute !important;
  top: 20px;
  right: 20px;
`;

const ReloadICon = styled(FontAwesomeIcon)`
  vertical-align: baseline;
  width: 12px;
  height: 12px;
`;

export default Home;
