import React from 'react';
import Link from 'next/Link';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react';
import useStores from '../../stores/useStores';

const BoardHead: React.FC = () => {
  const router = useRouter();
  const { SidebarStore } = useStores();
  const { bottomCategoryName } = SidebarStore;
  const { board } = router.query;

  return (
    <Wrapper>
      <HeadSection>
        <SubTitle>
          <h2>
            {bottomCategoryName[board]}
          </h2>
          <AbsoluteUl>
            <li>
              <Link href="/post">
                <CustomIcon icon={faPen} />
              </Link>
            </li>
          </AbsoluteUl>
        </SubTitle>
      </HeadSection>
      <HeadSection>
        <BoardTag>
          <li>
            <Link href="best">
              인기글
            </Link>
          </li>
          <li>
            <Link href="best">
              전체
            </Link>
          </li>
          <li>
            <Link href="best">
              전체
            </Link>
          </li>
          <li>
            <Link href="best">
              전체
            </Link>
          </li>
          <li>
            <Link href="best">
              전체
            </Link>
          </li>
        </BoardTag>
      </HeadSection>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
  margin-bottom: 8px;
`;

const BoardTag = styled.ul`
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
    padding: 5px 5px;
    text-align: center;
    text-decoration: none;
    color: #000;
    background-color: #e6e6e6;
    border-radius: 12px;
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
