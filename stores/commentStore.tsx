import { ChangeEvent } from 'react';
import { observable } from 'mobx';

import Axios from '@util/Axios';
import * as T from '@types';
import alertStore from './alertStore';
import postStore from './postStore';

export interface CommentStore {
  commentInfo: { comment: string, replyComment: string, modifierComment: string };
  commentList: T.Comment[];
  commentSize: number;
  modifierCommentId: number;
  replyCommentId: number;
  commentHandleChange(event: ChangeEvent<HTMLTextAreaElement>): void;
  setModifierCommentId(id: number, content: string): void;
  setReplyCommentId(id: number): void;
  addComment(postId: number, commentId: number, isReply: boolean): void;
  moreComment(postId: number): void;
  getComment(postId: number): Promise<void>;
  modifyComment(commentId: number, postId: number): void;
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
  setModifierCommentId(id, content) {
    this.modifierCommentId = id;
    this.commentInfo.modifierComment = content;
  },
  setReplyCommentId(id) {
    this.replyCommentId = id;
    this.commentInfo.replyComment = '';
  },
  addComment(postId, commentId, isReply) {
    if (!isReply && !this.commentInfo.comment.trim()) {
      alertStore.toggleAlertModal('댓글 내용을 입력해주세요!');
      return;
    }

    if (isReply && !this.commentInfo.replyComment.trim()) {
      alertStore.toggleAlertModal('답글 내용을 입력해주세요!');
      return;
    }

    Axios({
      method: T.RequestMethod.POST,
      url: '/api/post/comment',
      data: {
        postId,
        commentId: isReply ? commentId : null,
        comment: isReply ? this.commentInfo.replyComment : this.commentInfo.comment,
      },
      success: () => {
        postStore.getPost(postId, false);
        this.getComment(postId);
        this.setReplyCommentId(0);
        this.commentInfo.comment = '';
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
  modifyComment(commentId, postId) {
    Axios({
      method: T.RequestMethod.PUT,
      url: '/api/post/comment',
      data: {
        commentId,
        comment: this.commentInfo.modifierComment,
      },
      success: () => {
        postStore.getPost(postId, false);
        this.getComment(postId);
        this.setModifierCommentId(0, '');
      },
    });
  },

  deleteComment(commentId, postId) {
    Axios({
      method: T.RequestMethod.DELETE,
      url: '/api/post/comment',
      data: { commentId },
      success: () => {
        postStore.getPost(postId, false);
        this.getComment(postId);
      },
    });
  },
};

export const initialComment = {
  commentList: [] as T.Comment[],
};

export default observable(commentStore);
