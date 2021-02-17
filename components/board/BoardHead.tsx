import React from 'react';
import Link from 'next/link';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react-lite';
import { Button } from '@material-ui/core';
import useStores from '../../stores/useStores';
import BoardTag from './BoardTag';

const BoardHead: React.FC = () => {
  const router = useRouter();
  const {
    SidebarStore, CategoryStore, SignStore,
    PostStore,
  } = useStores();
  const { boardCategoryName } = SidebarStore;
  const { categoryTags } = CategoryStore;
  const { userData } = SignStore;
  const { clearPost } = PostStore;
  const boardParams = router.query.board as Array<string>;
  const boardPath = boardParams[0];
  const boardTag = boardParams[1];

  let isAdmin = false;
  if (userData) {
    isAdmin = userData.adminFl;
  }

  return (
    <Wrapper>
      <HeadSection>
        <SubTitle>
          <h2>
            {boardCategoryName[boardPath]}
          </h2>
          { isAdmin && (
            <AbsoluteUl>
              <li>
                <Button variant="contained" color="primary" onClick={() => router.push('/post').then(clearPost)}>
                  <span>
                    <CustomIcon icon={faPen} />
                  </span>
                </Button>
              </li>
            </AbsoluteUl>
          )}
        </SubTitle>
      </HeadSection>
      <HeadSection>
        <CategoryTag>
          {((boardPath !== 'best') && (boardPath !== 'all')) && (
            <CategoryTagBest active={boardTag === 'best'}>
              <Link href={`/category/${boardPath}/best`}>
                인기글
              </Link>
            </CategoryTagBest>
          )}
          <CategoryTagList active={boardTag === undefined}>
            <Link href={`/category/${boardPath}/`}>
              전체
            </Link>
          </CategoryTagList>
          {categoryTags.map(
            ({ tags }: any) => <BoardTag key={tags} category={tags} />,
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

interface TagInterface {
  active: boolean;
}

const CategoryTagList = styled.li<TagInterface>`
  & > a {
    ${(props) => (props.active ? 'color: #fff !important;' : null)}
    ${(props) => (props.active ? 'background-color: #2d79c7 !important;' : null)}
  }
`;

const CategoryTagBest = styled.li<TagInterface>`
  & > a {
    border: #eeee00 1.5px solid;
    background-color: white !important;
    color: #eeee00 !important;
    
    ${(props) => (props.active ? 'color: #fff !important;' : null)}
    ${(props) => (props.active ? 'background-color: #eeee00 !important;' : null)}
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
