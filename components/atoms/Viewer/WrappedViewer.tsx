import React, { MutableRefObject } from 'react';
import { Viewer, ViewerProps } from '@toast-ui/react-editor';
import styled from '@emotion/styled';
import dsPalette from '@constants/ds-palette';
import {FontFamily} from "@constants/styles";

export interface Props extends ViewerProps {
  forwardedRef?: MutableRefObject<Viewer>;
}

const WrappedViewer = (props: Props) => {
  const { forwardedRef } = props;
  return (
    <Root>
      <Viewer {...props} ref={forwardedRef} />
    </Root>
  );
};

const Root = styled.div({
  '.toastui-editor-contents': {
    fontSize: '1.125rem',
    lineHeight: '1.7',
    fontFamily: 'inherit',
  },

  '.toastui-editor-contents blockquote': {
    margin: '2rem 0px',
    borderLeft: `4px solid ${dsPalette.themePrimary.toString()}`,
    padding: '1rem 1rem 1rem 2rem',
    background: dsPalette.write.blockquoteBackground.toString(),
    '& > p': {
      color: dsPalette.typePrimary.toString(),
    },
  },

  '.toastui-editor-contents ul > li::before': {
    marginTop: '11px',
    backgroundColor: dsPalette.typePrimary.toString(),
  },

  '.toastui-editor-contents ul > li.task-list-item::before': {
    marginTop: '4px',
    backgroundColor: dsPalette.themeWhite.toString(),
  },

  '.toastui-editor-contents p + h1, .toastui-editor-contents p + h2, .toastui-editor-contents p + h3, .toastui-editor-contents p + h4': {
    marginTop: '2.5rem',
  },

  '.toastui-editor-contents p': {
    marginBlockStart: '1em',
    marginBlockEnd: '1em',
  },

  '.toastui-editor-contents h1': {
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

  '.toastui-editor-contents h3': {
    lineHeight: '1.5',
    fontSize: '1.5rem',
    borderBottom: 0,
    marginBottom: '1rem',
  },

  '.toastui-editor-contents h4': {
    lineHeight: '1.5',
    fontSize: '1.125rem',
    marginBottom: '1rem',
  },

  '.toastui-editor-contents pre': {
    borderRadius: '4px',
    margin: '1em 0',
    '& > code': {
      fontFamily: FontFamily.JETBRAINS_MONO,
    },
  },

  '.toastui-editor-contents code': {
    color: dsPalette.typePrimary.toString(),
    padding: '.2em .4em',
    borderRadius: '3px',
    fontSize: '85%',
  },
});

export default WrappedViewer;
