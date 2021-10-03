import React from 'react';

import { HomePost } from '@types';
import Row from './Row';

interface Props {
  list: HomePost[];
}

const PostList = ({ list }: Props) => (
  <div>
    {list.map((data) => <Row data={data} key={data.id} />)}
  </div>
);

export default PostList;
