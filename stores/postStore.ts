import { observable } from 'mobx';

import * as T from '@types';
import axios from 'axios';

export interface PostStore {
  posts: T.Post[];
  article: T.Article | null;
  getPosts(): Promise<void>;
  getPost(id: number, isModify: boolean): Promise<void>;
  modifyPost(): void;
}

const postStore: PostStore = {
  posts: [],
  article: null,
  async getPosts() {
    const { data } = await axios.get(`${process.env.BASE_PATH}/api/post/list`);
    console.log(data.result);
    this.posts = data.result;
  },
  async getPost(id) {
    const { data } = await axios.get(`${process.env.BASE_PATH}/api/post`, { params: { id } });
    this.article = data.result;
  },
  modifyPost() {},
};

export const initialPost: {
  posts: T.Post[];
  article: T.Article | null;
} = {
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
