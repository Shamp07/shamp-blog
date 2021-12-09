import React, { forwardRef, useRef, useCallback, MutableRefObject } from 'react';
import dynamic from 'next/dynamic';
import { Editor as EditorType, EditorProps } from '@toast-ui/react-editor';
import { Props as WrappedEditorProps } from './WrappedEditor';

interface EditorPropsWithHandlers extends EditorProps {
  onChange?(value: string): void;
}

const Editor = dynamic<WrappedEditorProps>(() => import('./WrappedEditor'), { ssr: false });
const EditorWithForwardedRef = forwardRef<EditorType | undefined, EditorPropsWithHandlers>(
  (props, ref) => (
    <Editor {...props} forwardedRef={ref as MutableRefObject<EditorType>} />
  ),
);

interface Props extends EditorProps {
  onChange(value: string): void;
}

const WysiwygEditor = ({ onChange }: Props) => {
  const editorRef = useRef<EditorType>();
  const handleChange = useCallback(() => {
    if (!editorRef.current) {
      return;
    }

    const instance = editorRef.current.getInstance();

    onChange(instance.getMarkdown());
  }, [onChange, editorRef]);

  return (
    <EditorWithForwardedRef
      placeholder="내용을 입력해주세요..."
      useCommandShortcut
      hideModeSwitch
      height="600px"
      initialEditType="markdown"
      ref={editorRef}
      onChange={handleChange}
    />
  );
};

export default WysiwygEditor;
