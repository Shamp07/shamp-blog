import React, { forwardRef } from 'react';
import dynamic from 'next/dynamic';
import { Editor as EditorType, EditorProps } from '@toast-ui/react-editor';
import { Props as WrappedEditorProps } from './WrappedEditor';

interface EditorPropsWithHandlers extends EditorProps {
  onChange?(value: string): void;
}

const Editor = dynamic<WrappedEditorProps>(() => import('./WrappedEditor'), { ssr: false });
const EditorWithForwardedRef = forwardRef<EditorType | undefined, EditorPropsWithHandlers>(
  (props, ref) => (
    <Editor {...props} forwardedRef={ref as React.MutableRefObject<EditorType>} />
  ),
);

interface Props extends EditorProps {
  onChange(value: string): void;
  valueType?: 'markdown' | 'html';
}

const WysiwygEditor: React.FC<Props> = (props) => {
  const {
    initialValue, previewStyle, height, initialEditType, useCommandShortcut,
    onChange, valueType,
  } = props;

  const editorRef = React.useRef<EditorType>();
  const handleChange = React.useCallback(() => {
    if (!editorRef.current) {
      return;
    }

    const instance = editorRef.current.getInstance();

    onChange((valueType || 'markdown') === 'markdown' ? instance.getMarkdown() : instance.getHTML());
  }, [props, editorRef]);

  return (
    <div>
      <EditorWithForwardedRef
        {...props}
        previewStyle={previewStyle || 'vertical'}
        height={height || '600px'}
        initialEditType={initialEditType || 'markdown'}
        useCommandShortcut={useCommandShortcut || true}
        ref={editorRef}
        onChange={handleChange}
      />
    </div>
  );
};

export default WysiwygEditor;
