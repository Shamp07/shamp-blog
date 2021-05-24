import React from 'react';

import { HomePostType } from '@stores/HomeStore';
import HomePost from './HomePost';

interface Props {
  list: HomePostType[];
}

const HomePostList = ({ list }: Props) => (
  <div>
    {list.map((data: HomePostType) => <HomePost data={data} key={data.id} />)}
  </div>
);

export default HomePostList;
