import React from 'react';

import * as T from '@types';
import stores from '@stores';
import PostView from '@components/PostView';

const Post = () => <PostView />;

// Post.getInitialProps = async ({ query }: T.MyNextPageContext) => {
//   const { postStore, commentStore } = stores();
//   const { getPost } = postStore;
//   const { getComment } = commentStore;
//
//   const id = Number(query.id);
//
//   await Promise.all([getPost(id, false), getComment(id)]);
//
//   return {
//     props: {},
//   };
// };

export default Post;
