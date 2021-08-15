import { ChangeEvent } from 'react';
import { observable } from 'mobx';

import Axios from '@util/Axios';
import * as T from '@types';
import alertStore from './alertStore';
import postStore from './postStore';

const commentStore = observable({
  commentInfo: {
    comment: '',
    replyComment: '',
    modifierComment: '',
  },
  commentList: [],
  commentSize: 15,
  modifierCommentId: 0,
  replyCommentId: 0,
  commentHandleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    if (event.target.value.length <= 1000) {
      this.commentInfo = {
        ...this.commentInfo,
        [event.target.name]: event.target.value,
      };
    }
  },
  setModifierCommentId(id: number, content: string) {
    this.modifierCommentId = id;
    this.commentInfo.modifierComment = content;
  },
  setReplyCommentId(id: number) {
    this.replyCommentId = id;
    this.commentInfo.replyComment = '';
  },
  addComment(postId: number, commentId: number, isReply: boolean) {
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
  moreComment(postId: number) {
    this.getComment(postId);
    this.commentSize += 15;
  },
  // async await
  getComment(postId: number) {
    Axios({
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
  modifyComment(commentId: number, postId: number) {
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

  deleteComment(commentId: number, postId: number) {
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
});

export const initialComment = {
  commentList: [] as T.Comment[],
};

export default commentStore;
