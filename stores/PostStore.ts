import React from 'react';
import { action, makeObservable, observable } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';

interface PostInterface {
  category: string,
  tags: string
  title: string,
  content: string,
}

class PostStore {
  root: any;

  @observable post: PostInterface = {
    category: '',
    tags: '',
    title: '',
    content: '',
  };

  constructor(root: any) {
    makeObservable(this);
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

  @action addPost = async (): Promise<void> => {
    await axios.post('/api/post', this.post)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => {
        toast.error(response);
      });
  };
}

export default PostStore;
