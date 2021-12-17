import React from 'react';
import styled from '@emotion/styled';

import dsPalette from '@constants/ds-palette';
import Viewer from './Viewer';

interface Props {
  title: string;
  content: string;
}

const ViewerSection = ({ title, content }: Props) => (
  <Root>
    <PostViewer>
      <Title>{title}</Title>
      <Viewer content={content} />
    </PostViewer>
  </Root>
);

const Root = styled.div({
  display: 'flex',
  flex: '1 1 0%',
});

const PostViewer = styled.div({
  flex: '1 1 0%',
  padding: '3rem',
  background: dsPalette.write.viewerBackground.toString(),
  overflow: 'auto',
});

const Title = styled.h1({
  fontSize: '2.75rem',
  marginBottom: '4rem',
  fontWeight: 800,
});

export default ViewerSection;
