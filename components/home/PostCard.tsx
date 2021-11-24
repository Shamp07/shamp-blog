import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from '@emotion/styled';

import tempo from '@assets/images/tempo.gif';
import dsPalette from '@constants/ds-palette';

const PostCard = () => (
  <Root>
    <Link href="/post/1" passHref>
      <Section>
        <Image
          src={tempo}
          width="100%"
          height="167"
        />
        <Inner>
          <Title>Title</Title>
          <Content>
            Content
          </Content>
        </Inner>
      </Section>
    </Link>
    <Footer>
      <div>3일 전 · 2개의 댓글</div>
      <div>좋아요 3</div>
    </Footer>
  </Root>
);

const Root = styled.div({
  width: '20rem',
  backgroundColor: dsPalette.themeWhite.toString(),
  borderRadius: '4px',
  margin: '1rem',
  overflow: 'hidden',
});

const Title = styled.h4({
  fontSize: '1rem',
  margin: '0 0 .25rem',
});

const Inner = styled.div({
  padding: '1rem',
})

const Content = styled.p({
  fontSize: '.875rem',
  margin: '0 0 1.5rem',
  height: '3.9375rem',
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  webkitLineClamp: '3',
  webkitBoxOrient: 'vertical',
});

const Section = styled.a({
  display: 'flex',
  color: dsPalette.typePrimary.toString(),
  textDecoration: 'none',
  lineHeight: 1.5,
  flex: '1 1 0%',
  flexDirection: 'column',
});

const Footer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0.625rem 1rem',
  color: dsPalette.typeSecond.toString(),
  fontSize: '.75rem',
});

export default PostCard;
