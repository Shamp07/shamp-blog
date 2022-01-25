import React from 'react';
import styled from '@emotion/styled';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import dsPalette from '@constants/ds-palette';
import { FontFamily, MediaQuery } from '@constants/styles';
import * as T from '@types';

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

    img: {
      display: 'block',
      margin: '3rem auto',
      maxWidth: '100%',
    },
  },

  'h1, h2, h3, h4': {
    lineHeight: 1.5,
    borderBottom: 0,
    marginBottom: '1rem',

    [MediaQuery[T.Device.MOBILE]]: {
      marginBottom: '.75rem',
    },
  },

  h1: {
    fontSize: '2.5rem',

    [MediaQuery[T.Device.MOBILE]]: {
      fontSize: '2.25rem',
    },
  },

  h2: {
    fontSize: '2rem',

    [MediaQuery[T.Device.MOBILE]]: {
      fontSize: '1.75rem',
    },
  },

  h3: {
    fontSize: '1.5rem',

    [MediaQuery[T.Device.MOBILE]]: {
      fontSize: '1.25rem',
    },
  },

  h4: {
    fontSize: '1.125rem',

    [MediaQuery[T.Device.MOBILE]]: {
      fontSize: '1rem',
    },
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

  '& > p > code': {
    color: dsPalette.typePrimary.toString(),
    borderRadius: '3px',
    fontSize: '85%',
    background: 'rgba(27, 31, 35, 0.05)',
    padding: '.2em .4em',
  },

  '& > p > a': {
    color: dsPalette.themePrimary.toString(),
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },

  '& > table': {
    minWidth: '40%',
    maxWidth: '100%',
    border: `1px solid ${dsPalette.typePrimary.toString()}`,
    borderCollapse: 'collapse',
    fontSize: '.875rem',
    '& tr': {
      '& > th, & > td': {
        wordBreak: 'break-word',
        padding: '.5rem',
      },
      '& > td + td, & > th + th': {
        borderLeft: '1px solid rgb(73, 80, 87)',
      },
      '& > th': {
        borderBottom: `4px solid ${dsPalette.typePrimary.toString()}`,
      },
      '&:nth-child(2n+1)': {
        background: dsPalette.themeWhite.toString(),
      },
      '&:nth-child(2n)': {
        background: dsPalette.write.table.secondRowBackground.toString(),
      },
    },
  },
});

export default Viewer;
