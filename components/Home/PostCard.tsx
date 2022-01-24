import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from '@emotion/styled';

import dsPalette from '@constants/ds-palette';
import * as T from '@types';
import { MediaQuery } from '@constants/styles';

interface Props {
  post: T.Post;
}

const PostCard = ({
  post: {
    id, title, time, shortContent,
    modifiedTime, thumbnail,
  },
}: Props) => (
  <Root>
    <Link href={`/post/${id}`} passHref>
      <Section>
        {thumbnail && (
          <Image
            src={thumbnail}
            width="100%"
            height="167"
          />
        )}
        <Inner>
          <Title>{title}</Title>
          <Content>{shortContent}</Content>
        </Inner>
      </Section>
    </Link>
    <Footer>
      <div>
        {modifiedTime || time}
      </div>
    </Footer>
  </Root>
);

const Root = styled.div({
  width: '20rem',
  backgroundColor: dsPalette.themeWhite.toString(),
  borderRadius: '4px',
  margin: '1rem',
  overflow: 'hidden',
  transition: 'box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s',

  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: 'rgb(0 0 0 / 8%) 0px 12px 20px 0px',
  },

  [MediaQuery[T.Device.TABLET]]: {
    width: 'calc(50% - 2rem)',
  },

  [MediaQuery[T.Device.MOBILE]]: {
    margin: 0,
    width: '100%',

    '& + &': {
      marginTop: '1rem',
    },
  },
});

const Title = styled.h4({
  fontSize: '1rem',
  margin: '0 0 .25rem',
});

const Inner = styled.div({
  padding: '1rem',
});

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
