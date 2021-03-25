import React from 'react';
import { Button } from '@material-ui/core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react-lite';
import useStores from '../../stores/useStores';
import { RootStore } from '../../stores';

const ArticleContent = () => {
  const { PostStore, SignStore } = useStores() as RootStore;
  const { postView, addPostLike } = PostStore;
  const { id, likeCnt, content } = postView;
  const { userData } = SignStore;

  return (
    <div>
      <ArticleText>
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </ArticleText>
      <ArticleBox>
        <Button size="small" color="primary" variant="outlined" onClick={() => addPostLike(id)} disabled={!userData}>
          <ThumbsUpIcon icon={faThumbsUp} />
          <span>
            좋아요 (
            {likeCnt}
            )
          </span>
        </Button>
      </ArticleBox>
    </div>
  );
};

const ArticleText = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 24px 16px;
  line-height: 2;
  font-size: 14px;
  color: #1e2022;
  word-break: break-all;

  @media (min-width: 1064px) {
    font-size: 16px;
  }
  
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
    background: #2e3440;
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

export default observer(ArticleContent);
