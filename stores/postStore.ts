import { ChangeEvent } from 'react';
import { observable } from 'mobx';

import Axios from '@utilities/axios';
import * as T from '@types';
import utilStore from './utilStore';

export interface PostStore {
  form: T.PostForm;
  posts: T.Post[];
  article: T.Article | null;
  formHandleChange(event: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
  clearForm(): void;
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
  clearForm() {
    this.form = {
      category: '',
      tags: '',
      title: '',
      content: '',
    };
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
  form: T.PostForm;
  posts: T.Post[];
  article: T.Article | null;
} = {
  form: {
    category: '',
    tags: '',
    title: '',
    content: '',
  },
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
