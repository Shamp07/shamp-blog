import React from 'react';
import styled from '@emotion/styled';

import dsPalette from '@constants/ds-palette';

const PostCard = () => {
  return (
    <Root>
      <Title>Title</Title>
      <Content>Content</Content>
      <Footer>
        <div>3일 전 · 2개의 댓글</div>
        <div>좋아요 3</div>
      </Footer>
    </Root>
  );
};

const Root = styled.div({
  width: '20rem',
  backgroundColor: dsPalette.themeWhite.toString(),
  borderRadius: '4px',
});

const Title = styled.h4({
  fontSize: '1rem',
  lineHeight: 1.5,
});

const Content = styled.p({
  padding: '1rem',
});

const Footer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0.625rem 1rem',
  color: dsPalette.typeSecond.toString(),
  fontSize: '.75rem',
});

export default PostCard;
