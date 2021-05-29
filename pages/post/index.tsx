import React from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import { Button, TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

import Editor from '@components/posting/Editor';
import useStores from '@stores/useStores';

interface Props {
  isModify: boolean;
}

const Post = ({ isModify }: Props) => {
  const router = useRouter();
  const {
    SidebarStore, PostStore,
    SignStore, AlertStore,
  } = useStores();
  const { boardCategoryList } = SidebarStore;
  const {
    post, postHandleChange, addPost, modifyPost,
  } = PostStore;
  const { userData } = SignStore;
  const { toggleAlertModal } = AlertStore;
  const { category, tags, title } = post;

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
          {boardCategoryList.map((data: { name: string, path: string }) => (
            <MenuItem key={data.path} value={data.path}>
              {data.name}
            </MenuItem>
          ))}
        </TitleInput>
        <TitleInput name="tags" value={tags} onChange={postHandleChange} label="태그" variant="outlined" size="small" inputProps={{ maxLength: 33 }} />
        <TitleInput name="title" value={title} onChange={postHandleChange} label="제목" variant="outlined" size="small" inputProps={{ maxLength: 100 }} />
        <Editor />
      </Article>
      <Footer>
        <Button variant="contained" color="primary" onClick={router.back}>
          취소
        </Button>
        { isModify ? (
          <Button variant="contained" color="primary" onClick={() => modifyPost(router)}>
            수정
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={() => addPost(router)}>
            등록
          </Button>
        )}
      </Footer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
`;

const HeadSection = styled.div`
  background-color: #fff;
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
`;

const Article = styled.article`
  padding: 10px 10px;
`;

const Footer = styled(Article)`
  display: flex;
  padding-top: 0 !important;
  
  & > button:last-child {
    margin-left: auto;
  }
`;

export default observer(Post);
