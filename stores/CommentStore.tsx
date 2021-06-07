import React from 'react';
import { makeObservable } from 'mobx';

import Axios from '@util/Axios';
import makeAnnotations from '@util/Mobx';
import * as T from '@types';
import PostStore from './PostStore';
import AlertStore from './AlertStore';

class CommentStore {
  PostStore: PostStore;

  AlertStore: AlertStore;

  commentInfo = {
    comment: '',
    replyComment: '',
    modifierComment: '',
  };

  commentList: T.Comment[] = [];

  commentSize = 15;

  modifierCommentId = 0;

  replyCommentId = 0;

  constructor(initialData = initialComment, root: {
    PostStore: PostStore, AlertStore: AlertStore,
  }) {
    this.PostStore = root.PostStore;
    this.AlertStore = root.AlertStore;
    this.commentList = initialData.commentList;
    makeObservable(this, makeAnnotations<this>({
      observables: [
        'commentInfo', 'commentList', 'commentSize',
        'modifierCommentId', 'replyCommentId',
      ],
      actions: [
        'commentHandleChange', 'setModifierCommentId',
        'setReplyCommentId', 'addComment', 'moreComment',
        'getComment', 'modifyComment', 'deleteComment',
      ],
    }));
  }

  commentHandleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value.length <= 1000) {
      this.commentInfo = {
        ...this.commentInfo,
        [event.target.name]: event.target.value,
      };
    }
  };

  setModifierCommentId = (id: number, content: string): void => {
    this.modifierCommentId = id;
    this.commentInfo.modifierComment = content;
  };

  setReplyCommentId = (id: number): void => {
    this.replyCommentId = id;
    this.commentInfo.replyComment = '';
  };

  addComment = (postId: number, commentId: number, isReply: boolean): void => {
    if (!isReply && !this.commentInfo.comment.trim()) {
      this.AlertStore.toggleAlertModal('댓글 내용을 입력해주세요!');
      return;
    }

    if (isReply && !this.commentInfo.replyComment.trim()) {
      this.AlertStore.toggleAlertModal('답글 내용을 입력해주세요!');
      return;
    }

    Axios({
      method: 'post',
      url: '/api/post/comment',
      data: {
        postId,
        commentId: isReply ? commentId : null,
        comment: isReply ? this.commentInfo.replyComment : this.commentInfo.comment,
      },
      success: () => {
        this.PostStore.getPost(postId, false);
        this.getComment(postId);
        this.setReplyCommentId(0);
        this.commentInfo.comment = '';
      },
    });
  };

  moreComment = (postId: number): void => {
    this.getComment(postId);
    this.commentSize += 15;
  };

  getComment = async (postId: number): Promise<void> => {
    await Axios({
      method: 'get',
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
  };

  modifyComment = (commentId: number, postId: number): void => {
    Axios({
      method: 'put',
      url: '/api/post/comment',
      data: {
        commentId,
        comment: this.commentInfo.modifierComment,
      },
      success: () => {
        this.PostStore.getPost(postId, false);
        this.getComment(postId);
        this.setModifierCommentId(0, '');
      },
    });
  };

  deleteComment = (commentId: number, postId: number): void => {
    Axios({
      method: 'delete',
      url: '/api/post/comment',
      data: { commentId },
      success: () => {
        this.PostStore.getPost(postId, false);
        this.getComment(postId);
      },
    });
  };
}

export const initialComment = {
  commentList: [] as T.Comment[],
};

export default CommentStore;
