import { ChangeEvent } from 'react';
import { observable } from 'mobx';
import { NextRouter } from 'next/dist/next-server/lib/router/router';

import Axios from '@util/Axios';
import * as T from '@types';
import alertStore from './alertStore';

const postStore = observable({
  post: {},
  postView: {},
  postList: [],
  postHandleChange(
    event: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
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
  movePage(router: NextRouter, page: number) {
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
  addPost(router: NextRouter) {
    Axios({
      method: T.RequestMethod.POST,
      url: '/api/post',
      data: this.post,
      success: router.back,
    });
  },
  // async await
  getPostList(
    category: string, tag: string, page: number,
  ) {
    Axios({
      method: T.RequestMethod.GET,
      url: `${process.env.BASE_PATH}/api/post/list`,
      data: { category, tag, page },
      success: (response) => {
        const { result } = response.data;
        this.postList = result;
      },
    });
  },
  // async await
  getPost(id: number, isModify: boolean) {
    Axios({
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
  modifyPost(router: NextRouter) {
    Axios({
      method: T.RequestMethod.PUT,
      url: '/api/post',
      data: this.post,
      success: router.back,
    });
  },
  deletePost(id: number, router: NextRouter) {
    Axios({
      method: T.RequestMethod.DELETE,
      url: '/api/post',
      data: { id },
      success: router.back,
    });
  },
  addPostLike(postId: number) {
    Axios({
      method: T.RequestMethod.POST,
      url: '/api/post/like',
      data: { postId },
      success: (response) => {
        const { code } = response.data;
        if (code === 2) {
          const { message } = response.data;
          alertStore.toggleAlertModal(message);
        }
        this.getPost(postId, false);
      },
    });
  },
});

export const initialPost = {
  postList: [] as T.PostList[],
  postView: {} as T.PostView | undefined,
  post: {
    id: 0,
    category: '',
    tags: '',
    title: '',
    content: '',
    count: 0,
    page: 0,
  },
};

export default postStore;
