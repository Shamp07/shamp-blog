import React from 'react';
import { action, makeObservable, observable } from 'mobx';
import axios, { axiosPromise } from 'axios';
import PostStore from './PostStore';
import AlertStore from './AlertStore';
import axiosWrap from '../util/axiosWrap';

export interface CommentType {
  rownum: number;
  total: number;
  id: number;
  userId: number;
  upperId: number;
  commentId: number;
  commentUserName: string;
  userName: string;
  content: string;
  isTag: boolean;
  time: string;
  modifiedTime: string;
}

class CommentStore {
  PostStore: PostStore;

  AlertStore: AlertStore;

  commentInfo = {
    comment: '',
    replyComment: '',
    modifierComment: '',
  };

  commentList: Array<CommentType> = [];

  commentSize = 15;

  modifierCommentId = 0;

  replyCommentId = 0;

  constructor(initialData = initialComment, root: {
    PostStore: PostStore, AlertStore: AlertStore
  }) {
    this.PostStore = root.PostStore;
    this.AlertStore = root.AlertStore;
    this.commentList = initialData.commentList;
    makeObservable(this, {
      commentInfo: observable,
      commentList: observable,
      commentSize: observable,
      modifierCommentId: observable,
      replyCommentId: observable,
      commentHandleChange: action,
      setModifierCommentId: action,
      setReplyCommentId: action,
      addComment: action,
      moreComment: action,
      getComment: action,
      modifyComment: action,
      deleteComment: action,
    });
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

    axiosWrap('post', '/api/post/comment', {
      postId,
      commentId: isReply ? commentId : null,
      comment: isReply ? this.commentInfo.replyComment : this.commentInfo.comment,
    }, false, (response: axiosPromise) => {
      const { data } = response;
      if (data.success) {
        this.commentInfo.comment = '';
        this.setReplyCommentId(0);
        this.getComment(postId);
        this.PostStore.getPost(postId, false);
      } else {
        this.AlertStore.toggleAlertModal(data.message);
      }
    });
  };

  moreComment = (postId: number): void => {
    this.commentSize += 15;
    this.getComment(postId);
  };

  getComment = async (postId: number): Promise<void> => {
    await axios.get(`${process.env.BASE_PATH}/api/post/comment`, {
      params: {
        postId,
        commentSize: this.commentSize,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          const { result } = data;
          this.commentList = result;
        } else {
          console.warn(data.message);
        }
      })
      .catch((response) => {
        console.error(response);
      });
  };

  modifyComment = (commentId: number, postId: number): void => {
    axios.put('/api/post/comment', {
      commentId,
      comment: this.commentInfo.modifierComment,
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          this.setModifierCommentId(0, '');
          this.PostStore.getPost(postId, false);
          this.getComment(postId);
        } else {
          this.AlertStore.toggleAlertModal(data.message);
        }
      })
      .catch((response) => {
        console.error(response);
      });
  };

  deleteComment = (commentId: number, postId: number): void => {
    axios.delete('/api/post/comment', {
      params: {
        commentId,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          this.getComment(postId);
          this.PostStore.getPost(postId, false);
        } else {
          this.AlertStore.toggleAlertModal(data.message);
        }
      })
      .catch((response) => {
        console.error(response);
      });
  };
}

export const initialComment = {
  commentList: [] as Array<CommentType>,
};

export default CommentStore;
