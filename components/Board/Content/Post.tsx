import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

import stores from '@stores';
import dsPalette from '@constants/ds-palette';
import * as T from '@types';
import { MediaQuery } from '@styles';

interface Props {
  data: T.Post;
}

const Post = ({ data }: Props) => {
  const router = useRouter();
  if (!router.query.category) return null;

  const { sidebarStore } = stores();
  const {
    id, title, category,
    commentCnt, tag, time, likeCnt,
  } = data;

  const boardPath = router.query.category[0];
  const isExistComment = Number(commentCnt) > 0;

  const commentCount = useMemo(() => (
    isExistComment ? (
      <span>
        [
        {commentCnt}
        ]
      </span>
    ) : null
  ), [isExistComment]);

  const CategoryName = useMemo(() => sidebarStore.getCategoryName(category), [category]);

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
          <Link href={`/category/${boardPath}/post/${id}`}>
            <PostLinkSpan>
              <span>{title}</span>
              {commentCount}
            </PostLinkSpan>
          </Link>
        </PostTitle>
        <div>
          <PostInfoUl>
            <li>
              <span>{CategoryName}</span>
            </li>
            <li>
              <span>{tag}</span>
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

const PostLinkSpan = styled.span({
  cursor: 'pointer',
  display: 'flex',
  lineHeight: '20px',

  '& > span:first-of-type': {
    marginRight: '5px',
    maxWidth: '80%',
    display: 'inline-block',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },

  '& > span:nth-of-type(2)': {
    color: dsPalette.themePrimary.toString(),
  },
});

const Article = styled.article`
  position: relative;
  display: table;
  table-layout: fixed;
  width: 100%;
  min-height: 78px;
  box-sizing: border-box;
  border-top: 1px solid #ebeef1;
  padding: 8px 0;
  &:hover {
    background-color: #f8f9fa;
  }
`;

const Vote = styled.div({
  display: 'table-cell',
  verticalAlign: 'middle',
  textAlign: 'center',
  color: '#7b858e',
  width: '72px',

  [MediaQuery[T.Device.LARGE]]: {
    width: '48px',
  },

  '& > div:last-child': {
    marginTop: '5px',
    lineHeight: '17px',
    fontSize: '14px',
    color: '#7b858e',
  },
});

const ArticleContent = styled.div`
  vertical-align: middle;
  display: table-cell;
`;

const PostTitle = styled.div`
  & > span:first-of-type {
    padding-right: 5px;
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
    line-height: 1;

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

export default Post;
