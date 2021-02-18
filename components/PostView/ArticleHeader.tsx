import React from 'react';
import styled from '@emotion/styled';
import Head from 'next/head';
import useStores from '../../stores/useStores';
import { observer } from 'mobx-react-lite';

const ArticleHeader = () => {
  const { PostStore, SidebarStore } = useStores();
  const { boardCategoryName } = SidebarStore;
  const { postView } = PostStore;
  const {
    title, category, tags, time,
    commentCnt, likeCnt, viewCnt, modifiedTime,
  } = postView;

  const headTitle = title.concat(' - Shamp Blog');

  return (
    <Wrapper>
      <Head>
        <title>{headTitle}</title>
        <meta property="og:title" content={headTitle} />
      </Head>
      <ArticleTitle>
        {title}
      </ArticleTitle>
      <ArticleMeta>
        <ArticleMetaLeft>
          <li>{boardCategoryName[category]}</li>
          <li>{tags}</li>
          <li>
            {modifiedTime || time}
          </li>
        </ArticleMetaLeft>
        <ArticleMetaRight>
          <li>
            조회
            {' '}
            {viewCnt}
          </li>
          <li>
            댓글
            {' '}
            {commentCnt}
          </li>
          <li>
            좋아요
            {' '}
            {likeCnt}
          </li>
        </ArticleMetaRight>
      </ArticleMeta>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 24px 16px;
  border-bottom: 1px solid #ebeef1;
`;

const ArticleTitle = styled.div`
  line-height: 36px;
  font-size: 24px;
  font-weight: bold;
  color: #1e2022;
  word-wrap: break-word;
  word-break: break-all;
  overflow: auto;
`;

const ArticleMeta = styled.div`
  margin-top: 9px;
  line-height: 20px;
  font-size: 14px;
  color: #7b858e;
  
  &:after {
    content: "";
    display: block;
    clear: both;
  }
`;

const ArticleMetaUl = styled.ul`
  list-style: none;
  
  & > li {
    display: inline-block;
    vertical-align: middle;
    padding: 0 10px;
    color: #98a0a7;
    word-break: break-all;
  }
`;

const ArticleMetaLeft = styled(ArticleMetaUl)`
  @media (min-width: 768px) {
    float: left;
  }

  & > li {
    border-left: 1px solid #e6e6e6;
  }

  & > li:first-of-type {
    border-left: none;
    padding-left: 0;
    color: #2d79c7;
  }
`;

const ArticleMetaRight = styled(ArticleMetaUl)`
  @media (min-width: 768px) {
    float: right;
  }

  & > li:first-of-type {
    padding-left: 0;
  }

  & > li:last-child {
    padding-right: 0;
    border-right: none;
  }
  
  & > li {
    border-right: 1px solid #e6e6e6;
  }
`;

export default observer(ArticleHeader);
