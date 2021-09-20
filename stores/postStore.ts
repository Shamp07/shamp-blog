import { ChangeEvent } from 'react';
import { observable } from 'mobx';
import { NextRouter } from 'next/dist/next-server/lib/router/router';

import Axios from '@utilities/axios';
import * as T from '@types';
import utilStore from './utilStore';

export interface PostStore {
  post: T.Post | undefined;
  postView: T.PostView | undefined;
  postList: T.PostList[];
  postHandleChange(event: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
  movePage(router: NextRouter, page: number): void;
  clearPost(): void;
  addPost(router: NextRouter): void;
  getPostList(category: string, tag: string, page: number): Promise<void>;
  getPost(id: number, isModify: boolean): Promise<void>;
  modifyPost(router: NextRouter): void;
  deletePost(id: number, router: NextRouter): void;
  addPostLike(postId: number): void;
}

const postStore: PostStore = {
  post: undefined,
  postView: undefined,
  postList: [],
  postHandleChange(event) {
    if (this.post === undefined) return;

    if (typeof event === 'string') {
      this.post = {
        ...this.post,
        content: event,
      };
    } else {
      this.post = {
        ...this.post,
        [event.target.name]: event.target.value,
      };
    }
  },
  movePage(router, page) {
    const boardParams = router.query.board as Array<string>;
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
  clearPost() {
    this.post = initialPost.post;
  },
  addPost(router) {
    Axios({
      method: T.RequestMethod.POST,
      url: '/api/post',
      data: this.post,
      success: router.back,
    });
  },
  async getPostList(category, tag, page) {
    await Axios({
      method: T.RequestMethod.GET,
      url: `${process.env.BASE_PATH}/api/post/list`,
      data: { category, tag, page },
      success: (response) => {
        const { result } = response.data;
        this.postList = result;
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
        if (isModify) this.post = result;
        else this.postView = result;
      },
    });
  },
  modifyPost(router) {
    Axios({
      method: T.RequestMethod.PUT,
      url: '/api/post',
      data: this.post,
      success: router.back,
    });
  },
  deletePost(id, router) {
    Axios({
      method: T.RequestMethod.DELETE,
      url: '/api/post',
      data: { id },
      success: router.back,
    });
  },
  addPostLike(postId) {
    Axios({
      method: T.RequestMethod.POST,
      url: '/api/post/like',
      data: { postId },
      success: (response) => {
        const { code } = response.data;
        if (code === 2) {
          const { message } = response.data;
          utilStore.openPopup(T.Popup.ALERT, message);
        }
        this.getPost(postId, false);
      },
    });
  },
};

export const initialPost: {
  post: T.Post | undefined;
  postView: T.PostView | undefined;
  postList: T.PostList[],
} = {
  post: undefined,
  postView: undefined,
  postList: [],
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
