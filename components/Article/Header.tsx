import React from 'react';
import Head from 'next/head';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';

import stores from '@stores';
import * as T from '@types';
import { MediaQuery } from '@styles';
import { categoryName } from '@constants/category';

const Header = () => {
  const { postStore } = stores();
  const { article } = postStore;
  if (!article) return null;

  const {
    title, category, tags, time,
    commentCnt, likeCnt, viewCnt, modifiedTime,
  } = article;

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
          <li>{categoryName[category]}</li>
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
  padding: 24px;
  border-bottom: 1px solid #ebeef1;
`;

const ArticleTitle = styled.h1`
  font-size: 2em;
  font-weight: bold;
  color: #1e2022;
  word-wrap: break-word;
  word-break: break-all;
  overflow: auto;
`;

const ArticleMeta = styled.div({
  marginTop: '9px',
  lineHeight: '25px',
  fontSize: '14px',
  color: '#7b858e',
  display: 'flex',

  [MediaQuery[T.Device.LARGE]]: {
    display: 'block',
  },
});

const ArticleMetaUl = styled.ul({
  listStyle: 'none',

  [MediaQuery[T.Device.LARGE]]: {
    display: 'block',
  },

  '& > li': {
    display: 'inline-block',
    verticalAlign: 'middle',
    padding: '0 10px',
    color: '#98a0a7',
    wordBreak: 'break-all',
    lineHeight: 1,
  },
});

const ArticleMetaLeft = styled(ArticleMetaUl)({
  [MediaQuery[T.Device.LARGE]]: {
    marginRight: 'auto',
  },

  '& > li': {
    borderLeft: '1px solid #e6e6e6',
  },

  '& > li:first-of-type': {
    borderLeft: 'none',
    paddingLeft: 0,
    color: '#2d79c7',
  },
});

const ArticleMetaRight = styled(ArticleMetaUl)({
  marginLeft: 'auto',
  [MediaQuery[T.Device.LARGE]]: {
    marginLeft: 'auto',
  },

  '& > li:first-of-type': {
    paddingLeft: 0,
  },

  '& > li:last-child': {
    paddingRight: 0,
    borderRight: 'none',
  },

  '& > li': {
    borderRight: '1px solid #e6e6e6',
  },
});

export default observer(Header);
