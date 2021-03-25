import React from 'react';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useStores from '../../stores/useStores';
import { RootStore } from '../../stores';
import { PostListType } from '../../stores/PostStore';

interface BoardPostProps {
  data: PostListType;
}

const BoardPost = ({ data }: BoardPostProps) => {
  const router = useRouter();
  const routerParams = router.query.board as Array<string>;
  const { SidebarStore } = useStores() as RootStore;
  const { getCategoryName } = SidebarStore;
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
          <Link href={`/category/${routerParams[0]}/post/${id}`}>
            <PostLinkSpan>
              <span>{title}</span>
              {commentCnt > 0 && (
                <span>
                  [
                  {commentCnt}
                  ]
                </span>
              )}
            </PostLinkSpan>
          </Link>
        </PostTitle>
        <div>
          <PostInfoUl>
            <li>
              <span>{getCategoryName(category)}</span>
            </li>
            <li>
              <span>{tags}</span>
            </li>
            <li>
              <span>{time}</span>
            </li>
          </PostInfoUl>
        </div>
      </ArticleContent>
    </Article>
  );
};

const PostLinkSpan = styled.span`
  cursor: pointer;
  display: flex;

  & > span:first-of-type {
    color: #000;
    margin-right: 5px;
    max-width: 80%;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
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
  & > span:first-of-type {
    padding-right: 5px;
  }
  
  & > span:last-child {
    color: #2d79c7;    
  }
`;

const PostInfoUl = styled.ul`
  list-style: none;
  margin-top: 5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  
  & > li { 
    display: inline-block;
    color: #98a0a7;
    padding: 0 8px;
    border-left: 1px solid #e6e6e6;
    font-size: 14px;
    
    &:first-of-type {
      border: none;
      padding-left: 0;
      color: #2d79c7;
    }
  }
`;

const ThumbsUp = styled(FontAwesomeIcon)`
  height: 16px;
`;

export default BoardPost;
