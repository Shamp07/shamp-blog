import React, {useCallback, useMemo} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import { Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import useStores from '@stores/useStores';
import BoardTag from './BoardTag';

const BoardHead = () => {
  const router = useRouter();
  if (!router.query.board) return null;

  const {
    SidebarStore, CategoryStore, SignStore,
    PostStore,
  } = useStores();
  const { getCategoryName } = SidebarStore;
  const { categoryTags } = CategoryStore;
  const { userData } = SignStore;
  const { clearPost } = PostStore;

  const boardPath = router.query.board[0];
  const boardTag = router.query.board[1];

  const isAdmin = Boolean(userData?.adminFl);

  const categoryName = useMemo(() => getCategoryName(boardPath), [boardPath]);

  const goPost = useCallback(() => {
    router.push('/post').then(clearPost);
  }, [router, clearPost]);

  const postButton = useMemo(() => (
    isAdmin ? (
      <AbsoluteUl>
        <li>
          <Button variant="contained" color="primary" onClick={goPost}>
            <span>
              <CustomIcon icon={faPen} />
            </span>
          </Button>
        </li>
      </AbsoluteUl>
    ) : null),
  [isAdmin]);

  return (
    <Wrapper>
      <HeadSection>
        <SubTitle>
          <h2>{categoryName}</h2>
          {postButton}
        </SubTitle>
      </HeadSection>
      <HeadSection>
        <CategoryTag>
          {((boardPath !== 'best') && (boardPath !== 'all')) && (
            <CategoryTagBest active={boardTag === 'best'}>
              <Link href={`/category/${boardPath}/best`}>인기글</Link>
            </CategoryTagBest>
          )}
          <CategoryTagList active={boardTag === undefined}>
            <Link href={`/category/${boardPath}/`}>전체</Link>
          </CategoryTagList>
          {categoryTags.map(
            (data) => <BoardTag key={data.tag} tag={data.tag} />,
          )}
        </CategoryTag>
      </HeadSection>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
  margin-bottom: 8px;
`;

const CategoryTag = styled.ul`
  list-style: none;
  overflow-x: visible;
  overflow-y: hidden;
  white-space:nowrap;

  &::-webkit-scrollbar {
    width: 10px;
    height: 6px;
    background: transparent;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #2d79c7;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: #ebeef1;;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  & > li {
    display: inline-block;
    padding: 10px 0 10px 12px;
  }

  & > li:last-child {
    padding-right: 10px;
  }

  & > li > a {
    display: inline-block;
    min-width: 45px;
    padding: 4px 15px;
    text-align: center;
    text-decoration: none;
    background-color: #e6e6e6;
    border-radius: 12px;
    font-size: 15px;
    font-weight: bold;
    color: #616161;
    transition: all 0.2s;
  }
`;

interface ActiveProp {
  isActive: boolean;
}

const CategoryTagList = styled.li<ActiveProp>(({ isActive }) => ({
  '& > a': {
    ...(isActive ? ({
      color: '#fff',
      backgroundColor: '#2d79c7',
    }) : undefined),
  },
}));

const CategoryTagBest = styled.li<ActiveProp>`
  & > a {
    border: #eeee00 1.5px solid;
    background-color: white !important;
    color: #eeee00 !important;

    ${(props) => (props.isActive ? 'color: #fff !important;' : null)}
    ${(props) => (props.isActive ? 'background-color: #eeee00 !important;' : null)}
  }
`;

const HeadSection = styled.div`
  &:first-of-type {
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
  }

  &:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  background-color: #fff;
`;

const SubTitle = styled.div`
  position: relative;
  font-size: 18px;
  padding: 18px 0;
  border-bottom: solid 1px #e6e6e6;

  & > h2 {
    padding-left: 16px;
    font-size: 18px;
  }

  & > li {
    cursor: pointer;
  }
`;

const CustomIcon = styled(FontAwesomeIcon)`
  width: 18px;
  height: 18px;
  vertical-align: text-bottom;
`;

const AbsoluteUl = styled.ul`
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 9px;
  margin-right: 10px;
  list-style: none;

  & > li {
    display: inline-block;
    color: #2d79c7;
    cursor: pointer;
  }
`;

export default observer(BoardHead);
