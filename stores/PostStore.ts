import React from 'react';
import { action, makeObservable, observable } from 'mobx';
import { NextRouter } from 'next/dist/next-server/lib/router/router';
import AlertStore from './AlertStore';
import Axios from '../util/Axios';

interface PostType {
  id: number,
  category: string,
  tags: string
  title: string,
  content: string,
  count: number,
  page: number,
}

export interface PostListType {
  rownum: number;
  page: number;
  id: number;
  category: string;
  tags: string;
  title: string;
  content: string;
  crtDttm: string;
  likeCnt: number;
  commentCnt: number;
  time: string;
}

export interface PostViewType {
  id: number;
  category: string;
  tags: string;
  title: string;
  content: string;
  viewCnt: string;
  likeCnt: string;
  commentCnt: string;
  time: string;
  modifiedTime: string;
}

class PostStore {
  AlertStore: AlertStore;

  post: PostType;

  postView: PostViewType;

  postList: Array<PostListType>;

  constructor(initialData = initialPost, root: { AlertStore: AlertStore }) {
    this.AlertStore = root.AlertStore;
    this.postList = initialData.postList;
    this.postView = initialData.postView;
    this.post = initialData.post;
    makeObservable(this, {
      post: observable,
      postView: observable,
      postList: observable,
      postHandleChange: action,
      clearPost: action,
      addPost: action,
      getPostList: action,
      getPost: action,
      modifyPost: action,
      deletePost: action,
      addPostLike: action,
    });
  }

  postHandleChange = (
    event: string | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
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
  };

  movePage = (router: NextRouter, page: number): void => {
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
  };

  clearPost = (): void => {
    this.post = initialPost.post;
  };

  addPost = (router: NextRouter): void => {
    Axios({
      method: 'post',
      url: '/api/post',
      data: this.post,
      success: router.back,
    });
  };

  getPostList = async (
    category: string, tag: string | undefined, page: number = 1,
  ): Promise<void> => {
    await Axios({
      method: 'get',
      url: `${process.env.BASE_PATH}/api/post/list`,
      data: { category, tag, page },
      success: (response) => {
        const { result } = response.data;
        this.postList = result;
      },
    });
  };

  getPost = async (id: number, isModify: boolean): Promise<void> => {
    await Axios({
      method: 'get',
      url: `${process.env.BASE_PATH}/api/post`,
      data: { id },
      success: (response) => {
        const { result } = response.data;
        if (isModify) this.post = result;
        else this.postView = result;
      },
    });
  };

  modifyPost = (router: NextRouter): void => {
    Axios({
      method: 'put',
      url: '/api/post',
      data: this.post,
      success: router.back,
    });
  };

  deletePost = (id: number, router: NextRouter): void => {
    Axios({
      method: 'delete',
      url: '/api/post',
      data: { id },
      success: router.back,
    });
  };

  addPostLike = (postId: number): void => {
    Axios({
      method: 'post',
      url: '/api/post/like',
      data: { postId },
      success: (response) => {
        const { code } = response.data;
        if (code === 2) {
          const { message } = response.data;
          this.AlertStore.toggleAlertModal(message);
        }
        this.getPost(postId, false);
      },
    });
  };
}

export const initialPost = {
  postList: [] as Array<PostListType>,
  postView: {} as PostViewType,
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

export default PostStore;
