import { observable } from 'mobx';

import Axios from '@utilities/axios';
import * as T from '@types';
import utilStore from '@stores/utilStore';

export interface CommentStore {
  comments: T.Comment[];
  addComment(
    postId: number,
    comment: string,
    commentId: number,
    isReply: boolean,
    size: number
  ): void;
  getComment(postId: number, size: number): Promise<void>;
  modifyComment(commentId: number, postId: number, comment: string, size: number): void;
  deleteComment(commentId: number, postId: number, size: number): void;
}

const commentStore: CommentStore = {
  comments: [],
  addComment(postId, comment, commentId, isReply, size) {
    Axios({
      method: T.RequestMethod.POST,
      url: '/api/post/comment',
      data: {
        postId,
        comment,
        commentId: isReply ? commentId : null,
      },
      success: () => {
        this.getComment(postId, size);
      },
    });
  },
  async getComment(postId, size) {
    await Axios({
      method: T.RequestMethod.GET,
      url: `${process.env.BASE_PATH}/api/post/comment`,
      data: {
        postId,
        size,
      },
      success: (response) => {
        const { result } = response.data;
        this.comments = result;
      },
    });
  },
  modifyComment(commentId, postId, comment, size) {
    Axios({
      method: T.RequestMethod.PUT,
      url: '/api/post/comment',
      data: {
        commentId,
        comment,
      },
      success: () => {
        this.getComment(postId, size);
      },
    });
  },
  deleteComment(commentId, postId, size) {
    Axios({
      method: T.RequestMethod.DELETE,
      url: '/api/post/comment',
      data: { commentId },
      success: (response) => {
        if (response.data.code === 2) {
          utilStore.openPopup(T.Popup.ALERT, response.data.message);
        } else {
          this.getComment(postId, size);
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
