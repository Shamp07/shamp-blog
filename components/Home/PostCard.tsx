import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from '@emotion/styled';

import dsPalette from '@constants/ds-palette';
import * as T from '@types';
import { MediaQuery } from '@constants/styles';
import { Page } from '@utilities/route';

interface Props {
  post: T.Post;
}

const PostCard = ({
  post: {
    title, titleId, time, shortContent,
    modifiedTime, thumbnail,
  },
}: Props) => {
  const thumbnailImage = thumbnail ? (
    <ImageWrapper>
      <ImageInner>
        <Image
          src={thumbnail}
          layout="fill"
          objectFit="cover"
          priority
        />
      </ImageInner>
    </ImageWrapper>
  ) : null;

  return (
    <Root>
      <Link href={`${Page.POST}/${titleId}`} passHref>
        <Section>
          {thumbnailImage}
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
};

const Root = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
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

    '&:hover': {
      transform: 'none',
      boxShadow: 'rgb(0 0 0 / 8%) 0px 12px 20px 0px',
    },
  },

  [MediaQuery[T.Device.MOBILE]]: {
    margin: 0,
    width: '100%',

    '& + &': {
      marginTop: '1rem',
    },
  },
});

const ImageWrapper = styled.div({
  width: '100%',
  paddingTop: '60%',
  position: 'relative',
});

const ImageInner = styled.div({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
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
  height: '5.4rem',
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
