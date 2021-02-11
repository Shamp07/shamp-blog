import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { NextPage } from 'next';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useStores from '../../stores/useStores';
import CommentSection from './CommentSection';
import ArticleFooter from './ArticleFooter';

const PostView: NextPage = () => {
  const { PostStore, SidebarStore, SignStore } = useStores();
  const { boardCategoryName } = SidebarStore;
  const { postView, addPostLike, clearPostView } = PostStore;
  const { userData } = SignStore;
  const {
    id, title, category, tags, time,
    commentCnt, likeCnt, viewCnt,
    content, modifiedTime,
  } = postView;

  useEffect(() => () => {
    clearPostView();
  });

  let userId: number | undefined;
  let isAdmin: boolean = false;
  if (userData) {
    userId = userData.id;
    isAdmin = userData.adminFl;
  }

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
                <li>
                  {modifiedTime || time}
                </li>
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
            <Button size="small" color="primary" variant="outlined" onClick={() => addPostLike(id, userId)} disabled={!userId}>
              <ThumbsUpIcon icon={faThumbsUp} />
              <span>
                좋아요 (
                {likeCnt}
                )
              </span>
            </Button>
          </ArticleBox>
          {isAdmin && <ArticleFooter />}
        </article>
      </Wrapper>
      <CommentSection />
    </>
  );
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
  font-weight: bold;
  color: #1e2022;
  word-wrap: break-word;
  word-break: break-all;
  overflow: auto;
`;

const ArticleMeta = styled.div`
  margin-top: 9px;
  line-height: 20px;
  font-size: 14px;
  color: #7b858e;
  
  &:after {
    content: "";
    display: block;
    clear: both;
  }
`;

const ArticleMetaUl = styled.ul`
  list-style: none;
  
  & > li {
    display: inline-block;
    vertical-align: middle;
    padding: 0 10px;
    color: #98a0a7;
    word-break: break-all;
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
  line-height: 1.42;
  font-size: 16px;
  color: #1e2022;
  word-break: break-all;
  
  @media (min-width: 1064px) {
    padding-right: 24px;
    padding-left: 24px;
  }

  & p {
    margin: 0;
    padding: 0;
    outline: 0;
  }
  
  & ul {
    padding-left: 1.5em;
  }
  
  & img {
    max-width: 100%;
  }
  
  & pre.ql-syntax {
    background-color: #23241f;
    color: #f8f8f2;
    overflow: auto;
    margin-bottom: 5px;
    margin-top: 5px;
    padding: 5px 10px;
    border-radius: 3px;
    font-size: 14px;
    font-family: 'JetBrains Mono', 'Noto Sans KR', serif !important;
    line-height: 1.5;
    
    & * {
      font-family: 'JetBrains Mono', 'Noto Sans KR', serif !important;  
    }
  }
  
  & ol, & ul {
    padding-left: 1.5em;
    counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
  }

  & ol > li, & ul > li {
    list-style-type: none;
  }

  & ol li:not(.ql-direction-rtl), & ul li:not(.ql-direction-rtl) {
    padding-left: 1.5em;
  }

  & ol li {
    counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
    counter-increment: list-0;
  }

  & li:not(.ql-direction-rtl):before {
    margin-left: -1.5em;
    margin-right: .3em;
    text-align: right;
  }

  & ol li:before {
    content: counter(list-0,decimal) ". ";
  }

  & li:before {
    display: inline-block;
    white-space: nowrap;
    width: 1.2em;
  }

  & li.ql-indent-1:not(.ql-direction-rtl) {
    padding-left: 4.5em;
  }

  & ol li.ql-indent-1 {
    counter-reset: list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
  }

  & ol li.ql-indent-1 {
    counter-increment: list-1;
  }
  
  & ol li.ql-indent-1:before {
    content: counter(list-1,lower-alpha) ". ";
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

export default observer(PostView);
