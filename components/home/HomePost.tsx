import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

export interface HomePostProp {
  data: PostInterface;
}

export interface PostInterface {
  id: number,
  title: string,
  commentCnt: number,
}

const HomePost: React.FC<HomePostProp> = ({ data }: HomePostProp) => {
  const { id, title } = data;
  return (
    <Link href={`/post/${id}`}>
      <Wrapper>
        <div>
          {title}
        </div>
      </Wrapper>
    </Link>
  );
};

const Wrapper = styled.div`
  display: flex;
  line-height: 35px;
  color: #2d79c7;
  font-size: 16px;
  padding: 0 5px;
  cursor: pointer;
  transition: background-color 0.2s;
  border-radius: 4px;
  font-weight: 500;
  
  & > div {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;  
    max-width: 90%;
    margin-right: 5px;
  }
  
  &:hover {
    background-color: #e6e6e6;
  }
`;

export default HomePost;
