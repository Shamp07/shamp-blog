import { flow, observable } from 'mobx';

import * as T from '@types';
import axios from 'axios';

export interface PostStore {
  article: T.Article | null;
  getPosts(): Promise<T.Post[]>;
  getTemporaryPosts(): Promise<T.Post[]>;
  getPost(titleId: T.Post['titleId']): Promise<void>;
}

const postStore: PostStore = {
  article: null,
  getPosts: flow(function* (this: PostStore) {
    const { data } = yield axios.get(`${process.env.BASE_PATH}/api/post/list`);
    return data.result;
  }),
  getTemporaryPosts: flow(function* (this: PostStore) {
    const { data } = yield axios.get(`${process.env.BASE_PATH}/api/post/list/temporary`);
    return data.result;
  }),
  getPost: flow(function* (this: PostStore, titleId) {
    const { data } = yield axios.get(`${process.env.BASE_PATH}/api/post`, { params: { titleId } });
    this.article = data.result;
  }),
};

export const initialPost: Pick<PostStore, 'article'> = {
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
