import { flow, observable } from 'mobx';

import * as T from '@types';
import axios from 'axios';

export interface PostStore {
  posts: T.Post[];
  article: T.Article | null;
  getPosts(): Promise<void>;
  getPost(titleId: T.Post['titleId']): Promise<void>;
}

const postStore: PostStore = {
  posts: [],
  article: null,
  getPosts: flow(function* (this: PostStore) {
    const { data } = yield axios.get(`${process.env.BASE_PATH}/api/post/list`);
    this.posts = data.result;
  }),
  getPost: flow(function* (this: PostStore, titleId) {
    const { data } = yield axios.get(`${process.env.BASE_PATH}/api/post`, { params: { titleId } });
    this.article = data.result;
  }),
};

export const initialPost: Pick<PostStore, 'posts' | 'article'> = {
  posts: [],
  article: null,
};

export default (() => {
  let instance: PostStore | undefined;
  const initialize = (initialState = initialPost) => ({
    ...postStore,
    ...initialState,
  });
  return (initialState = initialPost) => {
    if (!instance) {
      instance = initialize(initialState);
    }
    return observable(instance);
  };
})();
