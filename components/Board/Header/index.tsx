import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import stores from '@stores';
import * as T from '@types';
import dsPalette from '@constants/ds-palette';
import Button from '@atoms/Button';
import { MediaQuery } from '@constants/styles';
// import { categoryName } from '@constants/category';
import Tag from './Tag';

const Header = () => {
  const router = useRouter();
  if (!router.query.category) return null;

  const { signStore, postStore } = stores();

  const { userData } = signStore;
  const { clearForm } = postStore;

  const category = router.query.category[0];
  const tag = router.query.category[1];

  const isAdmin = Boolean(userData?.adminFl);

  const goPost = useCallback(() => {
    router.push('/post').then(clearForm);
  }, []);

  const postButton = useMemo(() => (
    isAdmin ? (
      <PostButton
        size={T.ButtonSize.SMALL}
        variant="contained"
        color="primary"
        onClick={goPost}
      >
        <Icon icon={faPen} />
      </PostButton>
    ) : null
  ), [isAdmin]);

  return (
    <Root>
      <SubTitle>
        {/* <h2>{categoryName[category as T.CategoryPath]}</h2> */}
        {postButton}
      </SubTitle>
      <Tag category={category} tag={tag} />
    </Root>
  );
};

const Root = styled.header({
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, .15)',
  borderRadius: '14px',
  overflow: 'hidden',
  marginBottom: '16px',
  backgroundColor: '#fff',

  [MediaQuery[T.Device.TABLET]]: {
    borderRadius: 0,
  },
});

const SubTitle = styled.div`
  position: relative;
  font-size: 18px;
  padding: 20px 0;
  border-bottom: solid 1px #e6e6e6;

  & > h2 {
    padding-left: 16px;
    font-size: 18px;
    line-height: 1;
  }

  & > li {
    cursor: pointer;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  width: 18px;
  height: 18px;
  vertical-align: text-bottom;
`;

const PostButton = styled(Button)({
  '&&&': {
    position: 'absolute',
    top: 0,
    right: 0,
    marginTop: '10px',
    marginRight: '10px',
    listStyle: 'none',
    color: dsPalette.typeWhite.toString(),
  },
});

export default observer(Header);
