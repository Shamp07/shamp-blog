import React from 'react';
import { observer } from 'mobx-react-lite';
import { NextPage } from 'next';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import useStores from '../../stores/useStores';
import CommentSection from '../../components/postView/CommentSection';

const PostView: NextPage = () => {
  const { PostStore, SidebarStore } = useStores();
  const { boardCategoryName } = SidebarStore;
  const { postView, deletePost } = PostStore;
  const router = useRouter();
  const {
    id, title, category, tags, time,
    commentCnt, likeCnt, viewCnt,
    content,
  } = postView;

  return (
    <>
      <Wrapper>
        <article>
          <ArticleHeader>
            <ArticleTitle>
              {title}
            </ArticleTitle>
            <ArticleMeta>
              <ArticleMetaLeft>
                <li>{boardCategoryName[category]}</li>
                <li>{tags}</li>
                <li>{time}</li>
              </ArticleMetaLeft>
              <ArticleMetaRight>
                <li>
                  조회
                  {' '}
                  {viewCnt}
                </li>
                <li>
                  댓글
                  {' '}
                  {commentCnt}
                </li>
                <li>
                  좋아요
                  {' '}
                  {likeCnt}
                </li>
              </ArticleMetaRight>
            </ArticleMeta>
          </ArticleHeader>
          <ArticleContent>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </ArticleContent>
          <ArticleBox>
            <Button size="small" color="primary" variant="outlined">
              <ThumbsUpIcon icon={faThumbsUp} />
              <span>
                좋아요 (
                {likeCnt}
                )
              </span>
            </Button>
          </ArticleBox>
          <ArticleFooter>
            <Button size="small" variant="outlined" color="secondary" onClick={() => deletePost(id, router)}>
              삭제
            </Button>
            <Button size="small" variant="outlined">
              수정
            </Button>
          </ArticleFooter>
        </article>
      </Wrapper>
      <CommentSection />
    </>
  );
};

PostView.getInitialProps = async ({ query, store }: any) => {
  const { PostStore, CommentStore } = store;
  const { getPost } = PostStore;
  const { getComment } = CommentStore;
  const id = query.id as string;

  await Promise.all([getPost(id), getComment(id)]);

  return {
    props: {},
  };
};

const Wrapper = styled.div`
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
`;

const ArticleHeader = styled.div`
  padding: 24px 16px;
  border-bottom: 1px solid #ebeef1;
`;

const ArticleTitle = styled.div`
  line-height: 36px;
  font-size: 24px;
  color: #1e2022;
  word-wrap: break-word;
  word-break: break-all;
  overflow: auto;
`;

const ArticleMeta = styled.div`
  margin-top: 9px;
  line-height: 17px;
  font-size: 14px;
  color: #7b858e;
  height: 24px;
`;

const ArticleMetaUl = styled.ul`
  list-style: none;
  height: 24px;
  
  & > li {
    display: inline-block;
    padding: 0 10px;
    color: #98a0a7;
  }
`;

const ArticleMetaLeft = styled(ArticleMetaUl)`
  @media (min-width: 768px) {
    float: left;
  }

  & > li {
    border-left: 1px solid #e6e6e6;
  }

  & > li:first-child {
    border-left: none;
    padding-left: 0;
    color: #2d79c7;
  }
`;

const ArticleMetaRight = styled(ArticleMetaUl)`
  @media (min-width: 768px) {
    float: right;
  }

  & > li:first-child {
    padding-left: 0;
  }

  & > li:last-child {
    padding-right: 0;
    border-right: none;
  }
  
  & > li {
    border-right: 1px solid #e6e6e6;
  }
`;

const ArticleContent = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 24px 16px;
  line-height: 24px;
  font-size: 16px;
  color: #1e2022;
  
  @media (min-width: 1064px) {
    padding-right: 24px;
    padding-left: 24px;
  }
`;

const ArticleBox = styled.div`
  border-top: 1px solid #ebeef1;
  border-bottom: 1px solid #ebeef1;
  text-align: center;
  padding: 12px 0;
`;

const ThumbsUpIcon = styled(FontAwesomeIcon)`
  width: 15px;
  vertical-align: middle;
  margin-bottom: 3px;
  margin-right: 5px;
`;

const ArticleFooter = styled.div`
  background: #f8f9fa;
  padding: 12px;
  text-align: right;
  
  & > button {
    margin-left: 5px;
  }
`;

export default observer(PostView);
