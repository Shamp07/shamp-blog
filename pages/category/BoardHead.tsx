import React from 'react';
import Link from 'next/Link';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../components/StoreProvider';
import BoardTag from './BoardTag';

const BoardHead: React.FC = () => {
  const router = useRouter();
  const { SidebarStore, CategoryStore } = useStores();
  const { boardCategoryName } = SidebarStore;
  const { categoryTags } = CategoryStore;
  const boardParams = router.query.board as Array<string>;
  const boardPath = boardParams[0];
  const boardTag = boardParams[1];

  return (
    <Wrapper>
      <HeadSection>
        <SubTitle>
          <h2>
            {boardCategoryName[boardPath]}
          </h2>
          <AbsoluteUl>
            <li>
              <Link href="../post">
                <span>
                  <CustomIcon icon={faPen} />
                </span>
              </Link>
            </li>
          </AbsoluteUl>
        </SubTitle>
      </HeadSection>
      <HeadSection>
        <CategoryTag>
          <CategoryTagBest active={boardTag === 'best'}>
            <Link href={`/category/${boardPath}/best`}>
              인기글
            </Link>
          </CategoryTagBest>
          <CategoryTagList active={boardTag === undefined}>
            <Link href={`/category/${boardPath}/`}>
              전체
            </Link>
          </CategoryTagList>
          {categoryTags.map(
            (data: string) => <BoardTag category={data} />,
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
  height: 48px;
  overflow: auto;
  white-space:nowrap;

  & > li {
    display: inline-block;
    padding: 10px 0 10px 12px;
    width: 75px;
  }

  & > li:last-child {
    padding-right: 10px;
  }

  & > li > a {
    display: inline-block;
    width: 65px;
    padding: 4px 5px;
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
  height: 20px;
`;

const AbsoluteUl = styled.ul`
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 16px;
  margin-right: 16px;
  list-style: none;
  
  & > li {
    display: inline-block;
    color: #2d79c7;
    cursor: pointer;
  }
`;

export default observer(BoardHead);
