import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

import dsPalette from '@constants/ds-palette';

interface Props {
  title: string;
  date: string;
}

const Article = () => (
  <Root>
    <Container>
      <HeadWrapper>
        <Title>왜 Svelte(스벨트)를 좋아하나요?</Title>
        <div>
          <span>2021년 12월 12일</span>
        </div>
        <TagWrapper>
          <Link href="/" passHref>
            <Tag>
              framework
            </Tag>
          </Link>
        </TagWrapper>
      </HeadWrapper>
    </Container>
  </Root>
);

const Root = styled.div({
  background: dsPalette.themeWhite.toString(),
  width: '100%',
  height: '100vh',
});

const Container = styled.article({
  marginTop: '5.5rem',
  width: '768px',
  marginLeft: 'auto',
  marginRight: 'auto',
});

const HeadWrapper = styled.div({

});

const Title = styled.h1({
  fontSize: '3rem',
  lineHeight: 1.5,
  letterSpacing: '-0.004em',
  marginTop: 0,
  fontWeight: 800,
  marginBottom: '2rem',
  wordBreak: 'keep-all',
});

const TagWrapper = styled.div({
  marginTop: '.875rem',
  marginBottom: '-.875rem',
  minHeight: '.875rem',
});

const Tag = styled.a({
  marginBottom: '.875rem',
  background: 'rgb(241, 243, 245)',
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
});

export default Article;
