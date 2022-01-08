import React from 'react';
import styled from '@emotion/styled';
import ReactMarkdown from 'react-markdown';

import dsPalette from '@constants/ds-palette';
import { FontFamily } from '@constants/styles';

interface Props {
  content: string;
}

const Viewer = ({ content }: Props) => (
  <Root>
    <ReactMarkdown>
      {content}
    </ReactMarkdown>
  </Root>
);

const Root = styled.div({
  fontSize: '1.125rem',
  lineHeight: '1.7',
  fontFamily: 'inherit',

  blockquote: {
    margin: '2rem 0px',
    borderLeft: `4px solid ${dsPalette.themePrimary.toString()}`,
    padding: '1rem 1rem 1rem 2rem',
    background: dsPalette.write.blockquoteBackground.toString(),
    '& > p': {
      color: dsPalette.typePrimary.toString(),
    },
  },

  'ul > li::before': {
    marginTop: '11px',
    backgroundColor: dsPalette.typePrimary.toString(),
  },

  'ul > li.task-list-item::before': {
    marginTop: '4px',
    backgroundColor: dsPalette.themeWhite.toString(),
  },

  'p + h1, p + h2, p + h3, p + h4': {
    marginTop: '2.5rem',
  },

  p: {
    marginBlockStart: '1em',
    marginBlockEnd: '1em',
  },

  h1: {
    lineHeight: '1.5',
    fontSize: '2.5rem',
    borderBottom: 0,
    marginBottom: '1rem',
  },

  '.toastui-editor-contents h2': {
    lineHeight: '1.5',
    fontSize: '2rem',
    borderBottom: 0,
    marginBottom: '1rem',
  },

  h3: {
    lineHeight: '1.5',
    fontSize: '1.5rem',
    borderBottom: 0,
    marginBottom: '1rem',
  },

  h4: {
    lineHeight: '1.5',
    fontSize: '1.125rem',
    marginBottom: '1rem',
  },

  pre: {
    borderRadius: '4px',
    margin: '1em 0',
    '& > code, & > code *': {
      fontFamily: FontFamily.JETBRAINS_MONO,
    },
  },

  code: {
    color: dsPalette.typePrimary.toString(),
    borderRadius: '3px',
    fontSize: '85%',
  },
});

export default Viewer;
