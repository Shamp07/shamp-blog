import React from 'react';
import { action, makeObservable, observable } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';

interface PostInterface {
  id: number,
  category: string,
  tags: string
  title: string,
  content: string,
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

  @action addPost = (router: { back: () => void }): void => {
    axios.post('/api/post', this.post)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          toast.success(data.message);
          router.back();
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => {
        toast.error(response);
      });
  };

  @action getPostList = async (category: string, tag: string | undefined): Promise<any> => {
    await axios.get('http://localhost:3000/api/post/list', {
      params: {
        category,
        tag,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          this.postList = data.result;
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => {
        toast.error(response);
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
          toast.error(data.message);
        }
      })
      .catch((response) => {
        toast.error(response);
      });
  };

  @action modifyPost = (router: { back: () => void }): void => {
    axios.put('/api/post', this.post)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          toast.success(data.message);
          router.back();
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => {
        toast.error(response);
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
          toast.success(data.message);
          router.back();
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => {
        toast.error(response);
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
          if (data.code === 1) {
            toast.success(data.message);
          } else if (data.code === 2) {
            toast.warning(data.message);
          }
          this.getPost(postId, false);
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => {
        toast.error(response);
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
  },
};

export default PostStore;
