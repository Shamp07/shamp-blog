import React from 'react';
import styled from 'styled-components';
import { Button, TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { NextPage } from 'next/types';
import Editor from '../../components/posting/Editor';
import useStores from '../../stores/useStores';

const Post: NextPage = () => {
  const router = useRouter();
  const { SidebarStore, PostStore } = useStores();
  const { boardCategoryList } = SidebarStore;
  const { post, postHandleChange, addPost } = PostStore;

  const {
    category, tags, title,
  } = post;

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
        <TitleInput name="tags" value={tags} onChange={postHandleChange} label="태그" variant="outlined" size="small" />
        <TitleInput name="title" value={title} onChange={postHandleChange} label="제목" variant="outlined" size="small" />
        <Editor />
      </Article>
      <Footer>
        <Button variant="contained" color="primary" onClick={() => router.back()}>
          취소
        </Button>
        <Button variant="contained" color="primary" onClick={() => addPost(router)}>
          등록
        </Button>
      </Footer>
    </Wrapper>
  );
};

Post.getInitialProps = async (ctx: any) => {
  console.log(ctx);

  return {
    props: {},
  };
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
  padding-top: 0 !important;
  
  & > button:last-child {
    float: right;
  }
`;

export default observer(Post);
