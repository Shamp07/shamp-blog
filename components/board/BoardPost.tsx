import React from 'react';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/Link';
import useStores from '../../stores/useStores';

const BoardPost = ({ data }: { data: BoardPostProps }) => {
  const { SidebarStore } = useStores();
  const { boardCategoryName } = SidebarStore;
  const {
    id, title, category,
    commentCnt, tags, time, likeCnt,
  } = data;

  return (
    <Article>
      <Vote>
        <div>
          <ThumbsUp icon={faThumbsUp} />
        </div>
        <div>{likeCnt}</div>
      </Vote>
      <ArticleContent>
        <PostTitle>
          <Link href={`/post/${id}`}>
            <PostLinkSpan>
              <span>{title}</span>
              <span>
                [
                {commentCnt}
                ]
              </span>
            </PostLinkSpan>
          </Link>
        </PostTitle>
        <PostInfo>
          <PostInfoUl>
            <li>
              <span>{boardCategoryName[category]}</span>
            </li>
            <li>
              <span>{tags}</span>
            </li>
            <li>
              <span>{time}</span>
            </li>
          </PostInfoUl>
        </PostInfo>
      </ArticleContent>
    </Article>
  );
};

const PostLinkSpan = styled.span`
  cursor: pointer;
  display: inline-block;

  & > span:first-child {
    color: #000;
    margin-right: 5px;
  }
`;

const Article = styled.article`
  position: relative;
  display: table;
  table-layout: fixed;
  width: 100%;
  min-height: 78px;
  box-sizing: border-box;
  border-top: 1px solid #ebeef1;
  background-color: #fff;
  padding: 8px 0;
  &:hover {
    background-color: #f8f9fa;
  }
`;

const Vote = styled.div`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  color: #7b858e;
  width: 72px;
  @media (max-width: 1064px) {
    width: 48px;
  }
    
  & > div:last-child {
    margin-top: 5px;
    line-height: 17px;
    font-size: 14px;
    color: #7b858e;
  }
`;

const ArticleContent = styled.div`
  vertical-align: middle;
  display: table-cell;

`;

const PostTitle = styled.div`
  & > span:first-child {
    padding-right: 5px;
  }
  
  & > span:last-child {
    color: #2d79c7;    
  }
`;

const PostInfo = styled.div`

`;

const PostInfoUl = styled.ul`
  list-style: none;
  margin-top: 5px;
  
  & > li { 
    display: inline-block;
    color: #98a0a7;
    padding: 0 8px;
    border-left: 1px solid #e6e6e6;
    font-size: 14px;
    
    &:first-child {
      border: none;
      padding-left: 0;
      color: #2d79c7;
    }
  }
`;

const ThumbsUp = styled(FontAwesomeIcon)`
  height: 16px;
`;

export interface BoardPostProps {
  id: number,
  title: string,
  category: string,
  commentCnt: number,
  tags: string,
  time: string,
  likeCnt: number,
}

export default BoardPost;
