import React from 'react';
import { action, observable } from 'mobx';
import axios from 'axios';

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
    this.root = root;
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

  @action addPost = (): void => {
    axios.post('/api/board/post', this.post)
      .then((response) => {
        console.log(response);
      })
      .catch((response) => {
        console.error(response);
      });
  };
}

export default PostStore;
