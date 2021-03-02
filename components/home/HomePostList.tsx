import React from 'react';
import HomePost from './HomePost';
import { HomePostType } from '../../stores/HomeStore';

interface HomePostListProps {
  array: Array<HomePostType>;
}

const HomePostList = ({ array }: HomePostListProps) => (
  <div>
    {array.map(
      (data: HomePostType) => <HomePost data={data} key={data.id} />,
    )}
  </div>
);

export default HomePostList;
