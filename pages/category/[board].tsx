import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import useStores from '../../stores/useStores';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/Link';

const Board: React.FC = () => {
  const router = useRouter();
  const { SidebarStore } = useStores();
  const { bottomCategoryName } = SidebarStore;
  const { board } = router.query;

  return (
    <div>
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
    </div>
  );
};

const HeadSection = styled.header`
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
`;

const SubTitle = styled.div`
  font-size: 18px;
  padding: 18px 0;
  
  & > h2 {
    padding-left: 16px;
    font-size: 18px;
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
  }
`;

export default Board;
