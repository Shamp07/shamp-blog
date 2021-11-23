import React from 'react';
import styled from '@emotion/styled';

import dsPalette from '@constants/ds-palette';

const PostCard = () => (
  <Root>
    <Section>
      <Title>기본기의 중요성</Title>
      <Content>
        Code Splitting (코드분할) 이란? 코드 분할(Code Splitting)은
        SPA의 성능을 향상시키는 방법입니다.
        싱글 페이지 애플리케이션(Single
        ddsadsadsadsadasdsadsadsad
      </Content>
    </Section>
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
});

const Title = styled.h4({
  fontSize: '1rem',
});

const Content = styled.p({
  fontSize: '.875rem',
});

const Section = styled.div({
  padding: '1rem',
  lineHeight: 1.5,

});

const Footer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0.625rem 1rem',
  color: dsPalette.typeSecond.toString(),
  fontSize: '.75rem',
});

export default PostCard;
