import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import { useMutation } from 'react-query';
import styled from '@emotion/styled';
import axios from 'axios';

import dsPalette from '@constants/ds-palette';
import Viewer from '@atoms/Viewer';
import stores from '@stores';
import * as T from '@types';
import { MediaQuery } from '@constants/styles';
import { Page } from '@utilities/route';
import NotExist from './NotExist';

const ARTICLE_TITLE_SUFFIX = ' - Shamp Blog';

const Article = () => {
  const router = useRouter();

  const { postStore, signStore, utilStore } = stores();
  const { article } = postStore;
  const { userData } = signStore;

  if (!article) return <NotExist />;

  const {
    id, title, content, time, modifiedTime,
    tags, shortContent, thumbnail,
  } = article;

  const mutation = useMutation(() => axios.delete('/api/post', { params: { id } }));

  useEffect(() => {
    signStore.authCheck();
  }, []);

  useEffect(() => {
    if (mutation.isSuccess) router.push('/');
  }, [mutation.isSuccess]);

  const onModify = () => {
    router.push(`/write?id=${id}`);
  };

  const onDelete = () => {
    utilStore.openPopup({
      type: T.PopupType.CONFIRM,
      description: '정말로 글을 삭제하겠습니까?',
      callback: mutation.mutate,
    });
  };

  const options = userData?.adminFl ? (
    <OptionWrapper>
      <Option onClick={onModify}>수정</Option>
      <Option onClick={onDelete}>삭제</Option>
    </OptionWrapper>
  ) : null;

  const tagList = tags.map((tag) => (
    <Link href={Page.HOME} passHref key={tag}>
      <Tag>{tag}</Tag>
    </Link>
  ));

  const description = shortContent.replaceAll('\n', ' ').trim().substring(0, 150);

  return (
    <Root>
      <Head>
        <title>
          {title}
          {ARTICLE_TITLE_SUFFIX}
        </title>
        <meta property="title" content={title} key="title" />
        <meta property="og:title" content={title} key="og-title" />
        <meta property="twitter:title" content={title} />
        <meta property="description" content={description} key="description" />
        <meta property="og:description" content={description} key="og-description" />
        <meta property="twitter:description" content={description} />
        <meta property="og:url" content={`${process.env.BASE_PATH}${router.asPath}`} />
        <meta property="og:type" content="article" key="og-type" />
        {thumbnail && <meta property="og:image" content={thumbnail} key="og-image" />}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet" />
      </Head>
      <Container>
        <HeadWrapper>
          <Title>{title}</Title>
          <DetailWrapper>
            <span>{modifiedTime || time}</span>
            {options}
          </DetailWrapper>
          <TagWrapper>
            {tagList}
          </TagWrapper>
        </HeadWrapper>
        <Content>
          <Viewer content={content} />
        </Content>
      </Container>
    </Root>
  );
};

const Root = styled.div({
  background: dsPalette.themeWhite.toString(),
  width: '100%',
  height: '100vh',
});

const Container = styled.article({
  padding: '5.4rem 0',
  width: '768px',
  marginLeft: 'auto',
  marginRight: 'auto',

  [MediaQuery[T.Device.TABLET]]: {
    paddingTop: '2rem',
  },

  [MediaQuery[T.Device.MOBILE]]: {
    width: '100%',
  },
});

const HeadWrapper = styled.div({
  [MediaQuery[T.Device.TABLET]]: {
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
});

const Title = styled.h1({
  fontSize: '3rem',
  lineHeight: 1.5,
  letterSpacing: '-.004em',
  marginTop: 0,
  fontWeight: 800,
  marginBottom: '2rem',
  wordBreak: 'keep-all',

  [MediaQuery[T.Device.TABLET]]: {
    fontSize: '2.25rem',
  },
});

const DetailWrapper = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  color: dsPalette.typeSecond.toString(),

  [MediaQuery[T.Device.MOBILE]]: {
    fontSize: '.875rem',
  },
});

const OptionWrapper = styled.div({
  display: 'flex',
});

const Option = styled.button({
  fontSize: 'inherit',
  marginLeft: '.5rem',
  padding: 0,
  outline: 'none',
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  color: 'inherit',

  '&:hover': {
    color: dsPalette.typePrimary.toString(),
  },

  [MediaQuery[T.Device.MOBILE]]: {
    fontSize: '.875rem',
  },
});

const TagWrapper = styled.div({
  marginTop: '.875rem',
  marginBottom: '-.875rem',
  minHeight: '.875rem',
});

const Tag = styled.a({
  marginBottom: '.875rem',
  background: dsPalette.tag.background.toString(),
  paddingLeft: '1rem',
  paddingRight: '1rem',
  height: '2rem',
  borderRadius: '1rem',
  display: 'inline-flex',
  alignItems: 'center',
  marginRight: '.875rem',
  color: dsPalette.themePrimary.toString(),
  textDecoration: 'none',
  fontWeight: 500,
  fontSize: '1rem',

  [MediaQuery[T.Device.MOBILE]]: {
    height: '1.5rem',
    fontSize: '.75rem',
    borderRadius: '.75rem',
    paddingLeft: '.75rem',
    paddingRight: '.75rem',
    marginRight: '.5rem',
    marginBottom: '.5rem',
  },
});

const Content = styled.div({
  marginTop: '5rem',

  [MediaQuery[T.Device.TABLET]]: {
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
});

export default observer(Article);
