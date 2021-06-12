import React from 'react';

import { HomePost as Post } from '@types';
import HomePost from './HomePost';

interface Props {
  list: Post[];
}

const HomePostList = ({ list }: Props) => (
  <div>
    {list.map((data) => <HomePost data={data} key={data.id} />)}
  </div>
);

export default HomePostList;
