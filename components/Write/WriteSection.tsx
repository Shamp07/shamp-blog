import React, {
  ChangeEvent, CSSProperties, KeyboardEvent, MouseEvent,
} from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import Button from '@atoms/Button';
import TextField from '@atoms/TextField';
import Editor from '@components/Write/Editor';
import dsPalette from '@constants/ds-palette';
import { useRouter } from 'next/router';

interface Props {
  title: string;
  tag: string;
  tags: string[];
  onChange(event: ChangeEvent<HTMLInputElement>): void;
  onChangeContent(value: string): void;
  onKeyPress(event: KeyboardEvent<HTMLInputElement>): void;
  onDelete(event: MouseEvent<HTMLElement>): void;
}

const WriteSection = ({
  title,
  tag,
  tags,
  onChange,
  onChangeContent,
  onDelete,
  onKeyPress,
}: Props) => {
  const router = useRouter();
  const moveToHome = () => router.push('/');

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
            {tags.map((value) => <Tag onClick={onDelete}>{value}</Tag>)}
            <TextField
              variant="outlined"
              name="tag"
              placeholder="태그를 입력하세요"
              value={tag}
              onKeyPress={onKeyPress}
              onChange={onChange}
              customStyles={tagInputStyles}
              borderless
            />
          </TagWrapper>
        </TagForm>
        <Editor onChange={onChangeContent} />
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
  display: 'inline-flex',
  background: dsPalette.themePrimary.toString(),
  color: dsPalette.themeWhite.toString(),
  borderRadius: '1rem',
  fontSize: '1rem',
  padding: '4px 1rem',
  marginBottom: '.75rem',
  wordBreak: 'break-all',
  alignItems: 'center',
  cursor: 'pointer',
  marginRight: '.75rem',
  transition: 'all .125s ease-in 0s',
  animation: '.125s ease-in-out 0s 1 normal forwards running iMKika',
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

const tagInputStyles: CSSProperties = {
  ...inputStyles,
  // height: '32px',
};

const titleInputStyles: CSSProperties = {
  ...inputStyles,
  fontSize: '2.75rem',
  fontWeight: 800,
};

export default WriteSection;
