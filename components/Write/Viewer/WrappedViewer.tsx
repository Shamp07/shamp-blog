import React, { MutableRefObject } from 'react';
import { Viewer, ViewerProps } from '@toast-ui/react-editor';
import styled from '@emotion/styled';
import dsPalette from "@constants/ds-palette";

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
  '&&& *': {
    fontFamily: 'inherit',
  },

  '.toastui-editor-contents': {
    fontSize: '1.125rem',
    lineHeight: '1.7',
  },

  '.toastui-editor-contents ul > li::before': {
    marginTop: '11px',
    backgroundColor: dsPalette.typePrimary.toString(),
  },

  '.toastui-editor-contents ul > li.task-list-item::before': {
    marginTop: '5px',
  },

  '.toastui-editor-contents p + h1, .toastui-editor-contents p + h2, .toastui-editor-contents p + h3, .toastui-editor-contents p + h4': {
    marginTop: '2.5rem',
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
});

export default WrappedViewer;
