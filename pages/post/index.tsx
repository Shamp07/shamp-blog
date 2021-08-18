import React, { useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import { TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

import Editor from '@components/posting/Editor';
import Button from '@atoms/Button';
import stores from '@stores';
import * as T from '@types';
import { MediaQuery } from '@styles';

interface Props {
  isModify: boolean;
}

const Post = ({ isModify }: Props) => {
  const router = useRouter();
  const {
    SidebarStore, PostStore,
    SignStore, AlertStore,
  } = stores();
  const { boardCategoryList } = SidebarStore;
  const {
    post, postHandleChange, addPost, modifyPost,
  } = PostStore;
  const { userData } = SignStore;
  const { toggleAlertModal } = AlertStore;
  const { category, tags, title } = post;

  const boardCategories = useMemo(() => (
    boardCategoryList.map((data: { name: string, path: string }) => (
      <MenuItem key={data.path} value={data.path}>
        {data.name}
      </MenuItem>
    ))
  ), [boardCategoryList]);

  const submitText = useMemo(() => (isModify ? '수정' : '등록'), []);

  const onSubmit = useCallback(() => {
    if (isModify) modifyPost(router);
    else addPost(router);
  }, []);

  if (!userData?.adminFl) {
    router.push('/').then(() => toggleAlertModal('글 작성 권한이 없습니다.'));
    return null;
  }

  return (
    <Wrapper>
      <HeadSection>
        <SubTitle>
          <h2>
            글 작성
          </h2>
        </SubTitle>
      </HeadSection>
      <Article>
        <TitleInput
          select
          label="카테고리"
          value={category}
          onChange={postHandleChange}
          name="category"
          variant="outlined"
          size="small"
        >
          {boardCategories}
        </TitleInput>
        <TitleInput
          name="tags"
          value={tags}
          onChange={postHandleChange}
          label="태그"
          variant="outlined"
          size="small"
          inputProps={{ maxLength: 33 }}
        />
        <TitleInput
          name="title"
          value={title}
          onChange={postHandleChange}
          label="제목"
          variant="outlined"
          size="small"
          inputProps={{ maxLength: 100 }}
        />
        <Editor />
      </Article>
      <Footer>
        <Button
          size={T.ButtonSize.SMALL}
          variant="contained"
          color="default"
          onClick={router.back}
        >
          취소
        </Button>
        <Button
          size={T.ButtonSize.SMALL}
          variant="contained"
          color="primary"
          onClick={onSubmit}
        >
          {submitText}
        </Button>
      </Footer>
    </Wrapper>
  );
};

const Wrapper = styled.div({
  backgroundColor: '#fff',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, .15)',
  borderRadius: '14px',
  overflow: 'hidden',

  '& .MuiInputBase-root': {
    borderRadius: '10px',
    overflow: 'hidden',
  },

  '& .MuiPaper-rounded': {
    borderRadius: '10px',
  },

  [MediaQuery[T.Device.LARGE]]: {
    borderRadius: 0,
  },
});

const HeadSection = styled.div`
  background-color: #fff;
  line-height: 1;
`;

const SubTitle = styled.div`
  font-size: 18px;
  padding: 18px 0;
  border-bottom: solid 1px #e6e6e6;

  & > h2 {
    padding-left: 16px;
    font-size: 18px;
  }
`;

const TitleInput = styled(TextField)`
  width: 100%;
  margin-bottom: 10px !important;
  border-radius: 10px;
`;

const Article = styled.article`
  padding: 24px;
`;

const Footer = styled(Article)`
  display: flex;
  padding-top: 0 !important;

  & > button:last-child {
    margin-left: auto;
  }
`;

export default observer(Post);
