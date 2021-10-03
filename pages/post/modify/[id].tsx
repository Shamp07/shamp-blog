import React from 'react';
import { NextPageContext } from 'next';

import stores from '@stores';
import Posting from '@components/Posting';

const ModifyPost = () => <Posting isModify />;

ModifyPost.getInitialProps = async ({ query }: NextPageContext) => {
  const { postStore } = stores();

  const id = Number(query.id);
  await postStore.getPost(id, true);

  return {
    props: {},
  };
};

export default ModifyPost;
