import React, {
  forwardRef, useRef, useCallback, MutableRefObject,
} from 'react';
import dynamic from 'next/dynamic';
import { Editor as EditorType, EditorProps } from '@toast-ui/react-editor';
import axios from 'axios';

import { Props as WrappedEditorProps } from './WrappedEditor';

interface EditorPropsWithHandlers extends EditorProps {
  onChange(value: string): void;
}

const Editor = dynamic<WrappedEditorProps>(() => import('./WrappedEditor'), { ssr: false });
const EditorWithForwardedRef = forwardRef<EditorType | undefined, EditorPropsWithHandlers>(
  (props, ref) => (
    <Editor {...props} forwardedRef={ref as MutableRefObject<EditorType>} />
  ),
);

interface Props extends EditorProps {
  content: string;
  onChange(value: string): void;
}

const WysiwygEditor = ({ content, onChange }: Props) => {
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
      initialValue={content}
      placeholder="내용을 입력해주세요..."
      useCommandShortcut
      hideModeSwitch
      initialEditType="markdown"
      height="70vh"
      ref={editorRef}
      onChange={handleChange}
      hooks={{
        async addImageBlobHook(blob, callback) {
          const formData = new FormData();
          formData.append('image', blob);
          const { data } = await axios.post('/api/files/url', formData, {
            headers: {
              'Content-type': 'multipart/form-data',
            },
          });
          callback(data.result);
          return false;
        },
      }}
    />
  );
};

export default WysiwygEditor;
