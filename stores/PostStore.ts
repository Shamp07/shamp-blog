import React from 'react';
import { action, makeObservable, observable } from 'mobx';
import axios from 'axios';
import { NextRouter } from 'next/dist/next-server/lib/router/router';
import AlertStore from './AlertStore';

interface PostInterface {
  id: number,
  category: string,
  tags: string
  title: string,
  content: string,
  count: number,
  page: number,
}

class PostStore {
  AlertStore: AlertStore;

  post: PostInterface;

  postView;

  postList;

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

  postHandleChange = (event: string | React.ChangeEvent<HTMLInputElement>): void => {
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
    axios.post('/api/post', this.post)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          router.back();
        } else {
          this.AlertStore.toggleAlertModal(data.message);
        }
      })
      .catch((response) => {
        console.error(response);
      });
  };

  getPostList = async (
    category: string, tag: string | undefined, page: number = 1,
  ): Promise<void> => {
    await axios.get(`${process.env.BASE_PATH}/api/post/list`, {
      params: {
        category,
        tag,
        page,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          this.postList = data.result;
        } else {
          console.warn(data.message);
        }
      })
      .catch((response) => {
        console.error(response);
      });
  };

  getPost = async (id: number, isModify: boolean): Promise<void> => {
    await axios.get(`${process.env.BASE_PATH}/api/post`, {
      params: {
        id,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (isModify) this.post = data.result;
          else this.postView = data.result;
        } else {
          console.warn(data.message);
        }
      })
      .catch((response) => {
        console.error(response);
      });
  };

  modifyPost = (router: NextRouter): void => {
    axios.put('/api/post', this.post)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          router.back();
        } else {
          this.AlertStore.toggleAlertModal(data.message);
        }
      })
      .catch((response) => {
        console.error(response);
      });
  };

  deletePost = (id: number, router: NextRouter): void => {
    axios.delete('/api/post', {
      params: {
        id,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          router.back();
        } else {
          this.AlertStore.toggleAlertModal(data.message);
        }
      })
      .catch((response) => {
        console.error(response);
      });
  };

  addPostLike = (postId: number): void => {
    axios.post('/api/post/like', {
      postId,
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 2) {
            this.AlertStore.toggleAlertModal(data.message);
          }
          this.getPost(postId, false);
        } else {
          this.AlertStore.toggleAlertModal(data.message);
        }
      })
      .catch((response) => {
        console.error(response);
      });
  };
}

export const initialPost = {
  postList: [],
  postView: {},
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
