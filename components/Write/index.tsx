import React, {
  MouseEvent, ChangeEvent, KeyboardEvent, CSSProperties,
} from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import dsPalette from '@constants/ds-palette';
import TextField from '@atoms/TextField';
import Button from '@atoms/Button';
import Editor from './Editor';
import Viewer from './Viewer';

interface Form {
  inputs: {
    title: string;
    tag: string;
    content: string;
  };
  tags: string[];
  onChange(event: ChangeEvent<HTMLInputElement>): void;
  onChangeContent(value: string): void;
  onKeyPress(event: KeyboardEvent<HTMLInputElement>): void;
  onDelete(event: MouseEvent<HTMLElement>): void;
}

const Write = () => {
  const router = useRouter();

  const form = useLocalObservable<Form>(() => ({
    inputs: {
      title: '',
      tag: '',
      content: '',
    },
    tags: [],
    onChange(event) {
      this.inputs = {
        ...this.inputs,
        [event.target.name]: event.target.value,
      };
    },
    onChangeContent(value: string) {
      this.inputs.content = value;
    },
    onKeyPress(event) {
      const { tags, inputs: { tag } } = this;
      if (event.key === 'Enter' && tag) {
        if (!tags.includes(this.inputs.tag)) tags.push(tag);
        this.inputs.tag = '';
      }
    },
    onDelete(event) {
      const idx = this.tags.indexOf(event.currentTarget.innerText);
      if (idx > -1) {
        this.tags.splice(idx, 1);
      }
    },
  }));

  const moveHome = () => router.push('/');

  return (
    <Root>
      <WriteSection>
        <WriteForm>
          <TextField
            variant="outlined"
            name="title"
            placeholder="제목을 입력하세요"
            value={form.inputs.title}
            onChange={form.onChange}
            customStyles={titleInputStyles}
            borderless
          />
          <TagForm>
            <TagWrapper>
              {form.tags.map((tag) => <Tag onClick={form.onDelete}>{tag}</Tag>)}
              <TextField
                variant="outlined"
                name="tag"
                placeholder="태그를 입력하세요"
                value={form.inputs.tag}
                onKeyPress={form.onKeyPress}
                onChange={form.onChange}
                customStyles={tagInputStyles}
                borderless
              />
            </TagWrapper>
          </TagForm>
          <Editor onChange={form.onChangeContent} />
        </WriteForm>
        <WriteFooter>
          <Button
            size="small"
            variant="text"
            customStyles={buttonStyles}
            onClick={moveHome}
          >
            <Icon icon={faArrowLeft} />
            나가기
          </Button>
          <ButtonWrapper>
            <Button
              color="primary"
              size="small"
              variant="outlined"
              customStyles={buttonStyles}
            >
              임시저장
            </Button>
            <Button
              color="primary"
              size="small"
              variant="contained"
              customStyles={buttonStyles}
            >
              작성
            </Button>
          </ButtonWrapper>
        </WriteFooter>
      </WriteSection>
      <ViewerSection>
        <PostViewer>
          <Title>{form.inputs.title}</Title>
          <Viewer content={form.inputs.content} />
        </PostViewer>
      </ViewerSection>
    </Root>
  );
};

const Root = styled.div({
  display: 'flex',
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  background: dsPalette.themeWhite.toString(),
});

const WriteForm = styled.form({
  padding: '3rem',
  boxSizing: 'border-box',
});

const WriteSection = styled.div({
  display: 'flex',
  flex: '1 1 0%',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxShadow: 'rgb(0 0 0 / 2%) 0px 0px 8px',
  position: 'relative',
  zIndex: 1,
});

const ViewerSection = styled.div({
  display: 'flex',
  flex: '1 1 0%',
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

const PostViewer = styled.div({
  flex: '1 1 0%',
  padding: '3rem',
  background: dsPalette.write.viewerBackground.toString(),
  overflow: 'auto',
});

const Title = styled.h1({
  fontSize: '2.75rem',
  marginBottom: '4rem',
  fontWeight: 800,
});

const TagForm = styled.div({
  display: 'flex',
  alignItems: 'center',
  borderRadius: '4px',
  marginBottom: '.75rem',
});

const TagWrapper = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
});

const Tag = styled.div({
  display: 'inline-flex',
  background: dsPalette.themePrimary.toString(),
  color: dsPalette.themeWhite.toString(),
  borderRadius: '1rem',
  fontSize: '1rem',
  padding: '4px 1rem',
  marginBottom: '.75rem',
  alignItems: 'center',
  cursor: 'pointer',
  marginRight: '.75rem',
  transition: 'all 0.125s ease-in 0s',
  animation: '0.125s ease-in-out 0s 1 normal forwards running iMKika',

});

const inputStyles: CSSProperties = {
  padding: 0,
  fontSize: '1.125rem',
  marginBottom: '.75rem',
};

const tagInputStyles: CSSProperties = {
  ...inputStyles,
  // height: '32px',
};

const titleInputStyles: CSSProperties = {
  ...inputStyles,
  fontSize: '2.75rem',
  fontWeight: 800,
};

const buttonStyles: CSSProperties = {
  height: '2.5rem',
  fontSize: '1.125rem',
  padding: '0 1.25rem',
};

export default observer(Write);
