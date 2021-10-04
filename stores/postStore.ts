import { ChangeEvent } from 'react';
import { observable } from 'mobx';
import { NextRouter } from 'next/dist/next-server/lib/router/router';

import Axios from '@utilities/axios';
import * as T from '@types';
import utilStore from './utilStore';

export interface PostStore {
  form: T.PostForm;
  posts: T.Post[];
  article: T.Article | null;
  formHandleChange(event: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
  movePage(router: NextRouter, page: number): void;
  addPost(): void;
  getPostList(category: string, tag: string, page: number): Promise<void>;
  getPost(id: number, isModify: boolean): Promise<void>;
  modifyPost(): void;
  deletePost(id: number): void;
  likePost(id: number): void;
}

const postStore: PostStore = {
  form: {
    category: '',
    tags: '',
    title: '',
    content: '',
  },
  posts: [],
  article: null,
  formHandleChange(event) {
    if (typeof event === 'string') {
      this.form = {
        ...this.form,
        content: event,
      };
    } else {
      this.form = {
        ...this.form,
        [event.target.name]: event.target.value,
      };
    }
  },
  movePage(router, page) {
    const boardParams = router.query.category as Array<string>;
    let pathUrl = `/category/${boardParams[0]}`;

    // url 에 태그가 존재할시
    if (boardParams.length > 1) {
      pathUrl = pathUrl.concat(`/${boardParams[1]}`);
    }

    router.push({
      pathname: pathUrl,
      query: { page },
    });
  },
  addPost() {
    Axios({
      method: T.RequestMethod.POST,
      url: '/api/post',
      data: this.form,
    });
  },
  async getPostList(category, tag, page) {
    await Axios({
      method: T.RequestMethod.GET,
      url: `${process.env.BASE_PATH}/api/post/list`,
      data: { category, tag, page },
      success: (response) => {
        const { result } = response.data;
        this.posts = result;
      },
    });
  },
  async getPost(id, isModify) {
    await Axios({
      method: T.RequestMethod.GET,
      url: `${process.env.BASE_PATH}/api/post`,
      data: { id },
      success: (response) => {
        const { result } = response.data;
        if (isModify) this.form = result;
        else this.article = result;
      },
    });
  },
  modifyPost() {
    Axios({
      method: T.RequestMethod.PUT,
      url: '/api/post',
      data: this.form,
    });
  },
  deletePost(id) {
    Axios({
      method: T.RequestMethod.DELETE,
      url: '/api/post',
      data: { id },
    });
  },
  likePost(id) {
    Axios({
      method: T.RequestMethod.POST,
      url: '/api/post/like',
      data: { id },
      success: (response) => {
        const { code } = response.data;
        if (code === 2) {
          const { message } = response.data;
          utilStore.openPopup(T.Popup.ALERT, message);
        }
        this.getPost(id, false);
      },
    });
  },
};

export const initialPost: {
  post: T.Post | null;
  posts: T.Post[],
  article: T.Article | null;
} = {
  post: null,
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
