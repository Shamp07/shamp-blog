import React from 'react';
import { Editor, EditorProps } from '@toast-ui/react-editor';

export interface Props extends EditorProps {
  forwardedRef?: React.MutableRefObject<Editor>;
}

const WrappedEditor = (props: Props) => {
  const { forwardedRef } = props;
  return (
    <Editor {...props} ref={forwardedRef} />
  );
};

export default WrappedEditor;
