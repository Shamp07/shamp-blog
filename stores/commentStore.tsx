import { ChangeEvent } from 'react';
import { observable } from 'mobx';

import Axios from '@utilities/axios';
import * as T from '@types';
import postStore from './postStore';
import utilStore from "@stores/utilStore";

export interface CommentStore {
  commentInfo: { comment: string, replyComment: string, modifierComment: string };
  commentList: T.Comment[];
  commentSize: number;
  modifierCommentId: number;
  replyCommentId: number;
  commentHandleChange(event: ChangeEvent<HTMLTextAreaElement>): void;
  setModifierCommentId(id: number): void;
  setReplyCommentId(id: number): void;
  addComment(postId: number, comment: string, commentId: number, isReply: boolean): void;
  moreComment(postId: number): void;
  getComment(postId: number): Promise<void>;
  modifyComment(commentId: number, postId: number, comment: string): void;
  deleteComment(commentId: number, postId: number): void;
}

const commentStore: CommentStore = {
  commentInfo: {
    comment: '',
    replyComment: '',
    modifierComment: '',
  },
  commentList: [],
  commentSize: 15,
  modifierCommentId: 0,
  replyCommentId: 0,
  commentHandleChange(event) {
    if (event.target.value.length <= 1000) {
      this.commentInfo = {
        ...this.commentInfo,
        [event.target.name]: event.target.value,
      };
    }
  },
  setModifierCommentId(id) {
    this.modifierCommentId = id;
  },
  setReplyCommentId(id) {
    this.replyCommentId = id;
  },
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
        this.setReplyCommentId(0);
      },
    });
  },
  moreComment(postId) {
    this.getComment(postId);
    this.commentSize += 15;
  },
  async getComment(postId) {
    await Axios({
      method: T.RequestMethod.GET,
      url: `${process.env.BASE_PATH}/api/post/comment`,
      data: {
        postId,
        commentSize: this.commentSize,
      },
      success: (response) => {
        const { result } = response.data;
        this.commentList = result;
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
        this.setModifierCommentId(0);
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
  commentList: T.Comment[];
} = {
  commentList: [],
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
