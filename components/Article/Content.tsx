import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

import stores from '@stores';
import Button from '@atoms/Button';
import * as T from '@types';
import { MediaQuery } from '@styles';

const Content = () => {
  const { postStore, signStore } = stores();
  const { postView } = postStore;
  if (!postView) return null;

  const { id, likeCnt, content } = postView;
  const { userData } = signStore;

  const onLike = useCallback(() => {
    postStore.addPostLike(id);
  }, []);

  return (
    <div>
      <ArticleText>
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </ArticleText>
      <ArticleBox>
        <Button
          size={T.ButtonSize.SMALL}
          color="primary"
          variant="outlined"
          onClick={onLike}
          disabled={!userData}
        >
          <ThumbsUpIcon icon={faThumbsUp} />
          <span>
            좋아요
            {' '}
            {likeCnt}
          </span>
        </Button>
      </ArticleBox>
    </div>
  );
};

const ArticleText = styled.article({
  width: '100%',
  boxSizing: 'border-box',
  padding: '24px',
  lineHeight: 2,
  fontSize: '16px',
  color: '#1e2022',
  wordBreak: 'keep-all',

  [MediaQuery[T.Device.LARGE]]: {
    fontSize: '14px',
    padding: '24px 16px',
  },

  '& p': {
    margin: 0,
    padding: 0,
    outline: 0,
  },

  '& ul': {
    paddingLeft: '1.5em',
  },

  '& img': {
    maxWidth: '100%',
  },

  '& pre.ql-syntax': {
    backgroundColor: '#2e3440',
    color: '#f8f8f2',
    overflow: 'auto',
    marginBottom: '5px',
    marginTop: '5px',
    padding: '16px',
    borderRadius: '10px',
    fontSize: '14px',
    fontFamily: 'JetBrains Mono, Noto Sans KR, serif !important',
    lineHeight: 1.5,

    '& *': {
      fontFamily: 'JetBrains Mono, Noto Sans KR, serif !important',
    },
  },

  '& ol, & ul': {
    paddingLeft: '1.5em',
    counterReset: 'list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9',
  },

  '& ol > li, & ul > li': {
    listStyleType: 'none',
  },

  '& ol li:not(.ql-direction-rtl), & ul li:not(.ql-direction-rtl)': {
    paddingLeft: '1.5em',
  },

  '& ol li': {
    counterReset: 'list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9',
    counterIncrement: 'list-0',
  },

  '& li:not(.ql-direction-rtl):before': {
    marginLeft: '-1.5em',
    marginRight: '.3em',
    textAlign: 'right',
  },

  '& ol li:before': {
    content: 'counter(list-0,decimal) ". "',
  },

  '& li:before': {
    display: 'inline-block',
    whiteSpace: 'nowrap',
    width: '1.2em',
  },

  '& li.ql-indent-1:not(.ql-direction-rtl)': {
    paddingLeft: '4.5em',
  },

  '& ol li.ql-indent-1': {
    counterReset: 'list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9',
    counterIncrement: 'list-1',
  },

  '& ol li.ql-indent-1:before': {
    content: 'counter(list-1,lower-alpha) ". "',
  },
});

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

export default observer(Content);
