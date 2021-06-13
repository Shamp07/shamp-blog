import { RootStore } from '@stores';
import { NextApiRequest } from 'next';

export interface NextApiRequestToken extends NextApiRequest {
  decodedToken: AuthToken;
}

export interface AuthToken {
  id: number;
  email: string;
  name: string;
  adminFl: boolean;
  verifyFl: boolean;
  iat: number;
  exp: number;
}

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum Auth {
  USER = 'user',
  ADMIN = 'admin',
}

export type Store = RootStore;

export interface Alert {
  total: number;
  id: number;
  content: string;
  postId: number;
  readFl: boolean;
  time: string;
}

export interface Tag {
  tag: string;
}

export interface Comment {
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

export interface FootPrint {
  rownum: number;
  total: number;
  id: number;
  userId: number;
  userName: string;
  content: string;
  time: string;
  modifiedTime: string;
}

export interface HomePost {
  id: number;
  title: string;
  commentCnt: number;
}

export interface Post {
  id: number;
  category: string;
  tags: string;
  title: string;
  content: string;
  count: number;
  page: number;
}

export interface PostList {
  rownum: number;
  page: number;
  id: number;
  category: string;
  tag: string;
  title: string;
  content: string;
  crtDttm: string;
  likeCnt: number;
  commentCnt: number;
  time: string;
}

export interface PostView {
  id: number;
  category: string;
  tags: string;
  title: string;
  content: string;
  viewCnt: string;
  likeCnt: string;
  commentCnt: string;
  time: string;
  modifiedTime: string;
}

export interface User {
  id: number;
  name: string;
  verifyFl: boolean;
  adminFl: boolean;
  exp: number;
  iat: number;
}

export interface Chat {
  id: number;
  fromUserName: string;
  fromUserId: number;
  message: string;
  time: string;
  displayedTime?: string;
  isSimple?: boolean;
}

export interface ChatRoomList {
  id: number;
  fromUserId: number;
  fromUserName: string;
  toUserId: number;
  toUserName: string;
  opponentUserId: number;
  message: string;
  time: string;
  timeStamp: number;
  notReadChatCount: number;
}

export interface ChatRoomType {
  [userId: number]: ChatRoomList;
}

export interface ReceiveMessage {
  message: string;
  fromUserId: number;
}

export enum ChatPage {
  LOBBY = 0,
  ROOM = 1,
}

export enum ButtonSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}
