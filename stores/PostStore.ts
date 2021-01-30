import React from 'react';
import { action, makeObservable, observable } from 'mobx';
import axios from 'axios';
import Router from 'next/dist/next-server/lib/router/router';

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
  @observable post: PostInterface;

  @observable postView;

  @observable postList;

  constructor(initialData = initialPost) {
    makeObservable(this);
    this.postList = initialData.postList;
    this.postView = initialData.postView;
    this.post = initialData.post;
  }

  @action postHandleChange = (event: string | React.ChangeEvent<HTMLInputElement>): void => {
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

  @action movePage = (router: Router, page: number) => {
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

  @action clearPost = () => {
    this.post = {
      id: 0,
      category: '',
      tags: '',
      title: '',
      content: '',
      count: 0,
      page: 0,
    };
  };

  @action addPost = (router: { back: () => void }): void => {
    axios.post('/api/post', this.post)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          router.back();
        } else {
          console.warn(data.message);
        }
      })
      .catch((response) => {
        console.error(response);
      });
  };

  @action getPostList = async (
    category: string, tag: string | undefined, page: number = 1,
  ): Promise<any> => {
    await axios.get('http://localhost:3000/api/post/list', {
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

  @action getPost = async (id: number, isModify: boolean): Promise<any> => {
    await axios.get('http://localhost:3000/api/post', {
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

  @action modifyPost = (router: { back: () => void }): void => {
    axios.put('/api/post', this.post)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          router.back();
        } else {
          console.warn(data.message);
        }
      })
      .catch((response) => {
        console.error(response);
      });
  };

  @action deletePost = (id: number, router: { back: () => void }): void => {
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
          console.warn(data.message);
        }
      })
      .catch((response) => {
        console.error(response);
      });
  };

  @action addPostLike = (postId: number, userId: number): void => {
    axios.post('/api/post/like', {
      postId,
      userId,
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 2) {
            console.warn(data.message);
          }
          this.getPost(postId, false);
        } else {
          console.warn(data.message);
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
