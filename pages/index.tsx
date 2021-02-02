import React from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import { NextPage } from 'next';
import useStores from '../stores/useStores';
import HomePostList from '../components/home/HomePostList';

const Home: NextPage = () => {
  const { HomeStore } = useStores();
  const { noticePostList, popularPostList } = HomeStore;

  return (
    <GridWrapper>
      <CustomGrid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <h2>공지사항</h2>
          <HomePostList array={noticePostList} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <h2>인기 글</h2>
          <HomePostList array={popularPostList} />
        </Grid>
        <Grid item xs={12}>
          <h2>방명록</h2>
        </Grid>
      </CustomGrid>
    </GridWrapper>
  );
};

Home.getInitialProps = async ({ store }: any) => {
  const { HomeStore } = store;
  const { getPopularPostList, getNoticePostList } = HomeStore;
  await Promise.all([getPopularPostList(), getNoticePostList()]);

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
  }
  
  & > div > h2 {
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid #e6e6e6;
  }
`;

export default Home;
