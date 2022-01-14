import React from 'react';
import styled from '@emotion/styled';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import dsPalette from '@constants/ds-palette';
import { FontFamily } from '@constants/styles';

interface Props {
  content: string | null;
}

const Viewer = ({ content }: Props) => (
  <Root>
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkBreaks]}
      components={{
        code({
          node, inline, className, children,
          ...props
        }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline ? (
            <SyntaxHighlighter
              language={match?.[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code>
              {children}
            </code>
          );
        },
      }}
    >
      {content || ''}
    </ReactMarkdown>
  </Root>
);

const Root = styled.div({
  fontSize: '1.125rem',
  lineHeight: '1.7',
  fontFamily: 'inherit',

  '& > div': {
    whiteSpace: 'pre-wrap',
  },

  blockquote: {
    margin: '2rem 0px',
    borderLeft: `4px solid ${dsPalette.themePrimary.toString()}`,
    padding: '1rem 1rem 1rem 2rem',
    background: dsPalette.write.blockquoteBackground.toString(),
    '& > p': {
      color: dsPalette.typePrimary.toString(),
      '&:first-of-type, &:last-of-type': {
        marginTop: 0,
        marginBottom: 0,
      },
    },
  },

  ul: {
    display: 'block',
    listStyleType: 'disc',
    marginBlockStart: '1em',
    marginBlockEnd: '1em',
    marginInlineStart: 0,
    marginInlineEnd: 0,
    paddingInlineStart: '40px',
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

  h2: {
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

  '& > pre': {
    margin: '1em 0',
    fontSize: '14px',
    '& > div': {
      borderRadius: '4px',
      '& > code > span': {
        fontFamily: FontFamily.JETBRAINS_MONO,
        background: 'transparent !important',
      },
    },
  },

  '& > code': {
    color: dsPalette.typePrimary.toString(),
    borderRadius: '3px',
    fontSize: '85%',
  },
});

const CodeWrapper = styled.div({
  padding: '1em',
});

export default Viewer;
