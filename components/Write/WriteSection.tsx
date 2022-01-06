import React, {
  ChangeEvent, CSSProperties, KeyboardEvent, MouseEvent, useEffect,
} from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import { useMutation } from 'react-query';
import styled from '@emotion/styled';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '@uiw/react-md-editor/dist/markdown-editor.css';

import Button from '@atoms/Button';
import TextField from '@atoms/TextField';
import dsPalette from '@constants/ds-palette';
import Editor from './Editor';

interface Props {
  title: string;
  tag: string;
  tags: string[];
  content: string;
  onChange(event: ChangeEvent<HTMLInputElement>): void;
  onChangeContent(value: string | undefined): void;
  onKeyPress(event: KeyboardEvent<HTMLInputElement>): void;
  onDelete(event: MouseEvent<HTMLElement>): void;
}

const WriteSection = ({
  title,
  tag,
  tags,
  content,
  onChange,
  onChangeContent,
  onDelete,
  onKeyPress,
}: Props) => {
  const router = useRouter();

  const mutation = useMutation(() => axios.post('/api/post', { title, tags, content }));
  const putMutation = useMutation(() => axios.put(
    '/api/post',
    {
      id: router.query.id, title, tags, content,
    },
  ));

  useEffect(() => {
    if (mutation.isSuccess || putMutation.isSuccess) moveToHome();
  }, [mutation.isSuccess, putMutation.isSuccess]);

  const moveToHome = () => router.push('/');
  const onAddPost = () => {
    if (!title.trim() || !tags.length || !content.trim()) {
      return;
    }

    if (router.query.id) putMutation.mutate();
    else mutation.mutate();
  };

  return (
    <Root>
      <WriteForm>
        <TextField
          variant="outlined"
          name="title"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={onChange}
          customStyles={titleInputStyles}
          borderless
        />
        <TagForm>
          <TagWrapper>
            {tags.map((value) => <Tag key={value} onClick={onDelete}>{value}</Tag>)}
            <TextField
              variant="outlined"
              name="tag"
              placeholder="태그를 입력하세요"
              value={tag}
              onKeyPress={onKeyPress}
              onChange={onChange}
              customStyles={inputStyles}
              borderless
            />
          </TagWrapper>
        </TagForm>
        <Editor content={content} onChange={onChangeContent} />
      </WriteForm>
      <WriteFooter>
        <Button
          size="small"
          variant="text"
          customStyles={buttonStyles}
          onClick={moveToHome}
        >
          <Icon icon={faArrowLeft} />
          나가기
        </Button>
        <ButtonWrapper>
          <Button
            color="primary"
            size="small"
            variant="contained"
            customStyles={buttonStyles}
            onClick={onAddPost}
          >
            작성
          </Button>
        </ButtonWrapper>
      </WriteFooter>
    </Root>
  );
};

const Root = styled.div({
  display: 'flex',
  flex: '1 1 0%',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxShadow: 'rgb(0 0 0 / 2%) 0px 0px 8px',
  position: 'relative',
  zIndex: 1,
});

const WriteForm = styled.form({
  padding: '3rem',
  boxSizing: 'border-box',
});

const WriteFooter = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxSizing: 'border-box',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  height: '4rem',
  width: '100%',
  boxShadow: 'rgb(0 0 0 / 10%) 0px 0px 8px',
});

const Icon = styled(FontAwesomeIcon)({
  marginRight: '.5rem',
});

const ButtonWrapper = styled.div({
  display: 'flex',
});

const TagForm = styled.div({
  display: 'flex',
  alignItems: 'center',
  borderRadius: '4px',
  margin: '.75rem 0',
});

const TagWrapper = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  maxHeight: '132px',
  overflow: 'auto',
});

const Tag = styled.div({
  marginBottom: '.875rem',
  background: 'rgb(241, 243, 245)',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  height: '2rem',
  borderRadius: '1rem',
  display: 'inlineFlex',
  alignItems: 'center',
  marginRight: '.875rem',
  color: dsPalette.themePrimary.toString(),
  textDecoration: 'none',
  fontWeight: 500,
  fontSize: '1rem',
  cursor: 'pointer',
});

const buttonStyles: CSSProperties = {
  height: '2.5rem',
  fontSize: '1.125rem',
  padding: '0 1.25rem',
};

const inputStyles: CSSProperties = {
  padding: 0,
  fontSize: '1.125rem',
  marginBottom: '.55rem',
  marginTop: '.2rem',
};

const titleInputStyles: CSSProperties = {
  ...inputStyles,
  fontSize: '2.75rem',
  fontWeight: 800,
};

export default observer(WriteSection);
