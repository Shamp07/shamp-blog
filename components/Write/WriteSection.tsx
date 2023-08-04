import React, {
  ChangeEvent, CSSProperties, KeyboardEvent, MouseEvent, useEffect,
} from 'react';
import { useRouter } from 'next/router';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useMutation } from 'react-query';
import styled from '@emotion/styled';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import Button from '@atoms/Button';
import TextField from '@atoms/TextField';
import dsPalette from '@constants/ds-palette';
import { Page } from '@utilities/route';
import Editor from './Editor';

interface WriteMutationVariables {
  id?: number;
  title: Props['title'];
  tags: Props['tags'];
  content: Props['content'];
  isTemporary: boolean;
}

interface Props {
  title: string;
  tag: string;
  tags: string[];
  content: string | null;
  onChange(event: ChangeEvent<HTMLInputElement>): void;
  onChangeContent(value: string): void;
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

  const state = useLocalObservable(() => ({
    isTemporary: false,
    setTemporary(value: boolean) {
      this.isTemporary = value;
    },
  }));

  const mutation = useMutation<unknown, Error, WriteMutationVariables>((data) => axios.post('/api/post', data));
  const putMutation = useMutation<unknown, Error, WriteMutationVariables>((data) => axios.put('/api/post', data));

  useEffect(() => {
    if (mutation.isSuccess || putMutation.isSuccess) {
      if (state.isTemporary) moveToTemporaries();
      else moveToHome();
    }
  }, [mutation.isSuccess, putMutation.isSuccess, state.isTemporary]);

  const moveToHome = () => router.push(Page.HOME);
  const moveToTemporaries = () => router.push(Page.TEMPORARIES);

  const addPost = (isTemporary: WriteMutationVariables['isTemporary']) => {
    if (!title.trim() || !tags.length || !content?.trim()) {
      return;
    }

    state.setTemporary(isTemporary);

    const data = {
      title, tags, content, isTemporary,
    };

    if (router.query.id) {
      const { id } = router.query;
      putMutation.mutate({ id: Number(id), ...data });
    } else {
      mutation.mutate(data);
    }
  };

  const onAddPost = () => addPost(false);
  const onTemporaryAddPost = () => addPost(true);

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
        {content !== null && <Editor content={content} onChange={onChangeContent} />}
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
            size="small"
            variant="text"
            customStyles={buttonStyles}
            onClick={onTemporaryAddPost}
          >
            임시저장
          </Button>
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
  boxShadow: 'rgb(0 0 0 / 2%) 0 0 8px',
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
  boxShadow: 'rgb(0 0 0 / 10%) 0 0 8px',
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
  background: dsPalette.tag.background.toString(),
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
