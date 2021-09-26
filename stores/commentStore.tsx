import { observable } from 'mobx';

import Axios from '@utilities/axios';
import * as T from '@types';
import utilStore from '@stores/utilStore';
import postStore from './postStore';

export interface CommentStore {
  comments: T.Comment[];
  size: number;
  addComment(postId: number, comment: string, commentId: number, isReply: boolean): void;
  moreComment(postId: number): void;
  getComment(postId: number): Promise<void>;
  modifyComment(commentId: number, postId: number, comment: string): void;
  deleteComment(commentId: number, postId: number): void;
}

const commentStore: CommentStore = {
  comments: [],
  size: 15,
  addComment(postId, comment, commentId, isReply) {
    Axios({
      method: T.RequestMethod.POST,
      url: '/api/post/comment',
      data: {
        postId,
        comment,
        commentId: isReply ? commentId : null,
      },
      success: () => {
        this.getComment(postId);
      },
    });
  },
  moreComment(postId) {
    this.getComment(postId);
    this.size += 15;
  },
  async getComment(postId) {
    await Axios({
      method: T.RequestMethod.GET,
      url: `${process.env.BASE_PATH}/api/post/comment`,
      data: {
        postId,
        commentSize: this.size,
      },
      success: (response) => {
        const { result } = response.data;
        this.comments = result;
      },
    });
  },
  modifyComment(commentId, postId, comment) {
    Axios({
      method: T.RequestMethod.PUT,
      url: '/api/post/comment',
      data: {
        commentId,
        comment,
      },
      success: () => {
        this.getComment(postId);
        this.setModifyId(0);
      },
    });
  },
  deleteComment(commentId, postId) {
    Axios({
      method: T.RequestMethod.DELETE,
      url: '/api/post/comment',
      data: { commentId },
      success: (response) => {
        if (response.data.code === 2) {
          utilStore.openPopup(T.Popup.ALERT, response.data.message);
        } else {
          postStore().getPost(postId, false);
          this.getComment(postId);
        }
      },
    });
  },
};

export const initialComment: {
  comments: T.Comment[];
} = {
  comments: [],
};

export default (() => {
  let instance: CommentStore | undefined;
  const initialize = (initialState = initialComment) => ({
    ...commentStore,
    ...initialState,
  });
  return (initialState = initialComment) => {
    if (!instance) {
      instance = initialize(initialState);
    }
    return observable(instance);
  };
})();
