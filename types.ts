import { RootStore } from '@stores';
import { NextApiRequest } from 'next';
import { AppProps } from 'next/app';
import { AxiosResponse } from 'axios';

export interface MyAppProps extends AppProps {
  initialMobxState: RootStore;
}

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

export interface AxiosType {
  method: RequestMethod,
  url: string,
  data?: any,
  success?: (response: AxiosResponse) => void,
  fail?: (response: AxiosResponse) => void,
  complete?: (response: AxiosResponse) => void,
}

export enum Auth {
  USER = 'user',
  ADMIN = 'admin',
}

export enum CategoryType {
  HOME = 'HOME',
  PROFILE = 'PROFILE',
  LIFE = 'LIFE',
  NOTICE = 'NOTICE',
  ALL = 'ALL',
  BEST = 'BEST',
  JAVASCRIPT = 'JAVASCRIPT',
  TYPESCRIPT = 'TYPESCRIPT',
  REACT = 'REACT',
  REACT_NATIVE = 'REACT_NATIVE',
  NODEJS = 'NODEJS',
  ETC = 'ETC',
}

export enum CategoryPath {
  HOME = '',
  PROFILE = 'profile',
  LIFE = 'life',
  NOTICE = 'notice',
  ALL = 'all',
  BEST = 'best',
  JAVASCRIPT = 'javascript',
  TYPESCRIPT = 'typescript',
  REACT = 'react',
  REACT_NATIVE = 'rn',
  NODEJS = 'nodejs',
  ETC = 'etc',
}

export interface Alert {
  total: number;
  id: number;
  content: string;
  postId: number;
  readFl: boolean;
  time: string;
}

export type Tag = string;

export interface Comment {
  rownum: number;
  total: number;
  id: number;
  postId: number;
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

export interface PostForm {
  category: string;
  tags: string;
  title: string;
  content: string;
}

export interface Post {
  rownum: number;
  page: number;
  id: number;
  category: CategoryType;
  tag: string;
  title: string;
  content: string;
  crtDttm: string;
  likeCnt: number;
  commentCnt: number;
  time: string;
}

export interface Article {
  id: number;
  category: CategoryType;
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

export enum Popup {
  ALERT = 'ALERT',
  CONFIRM = 'CONFIRM',

  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',

  PASSWORD_RESET = 'PASSWORD_RESET',
  EMAIL_VERIFY = 'EMAIL_VERIFY',
  ACCOUNT_DELETE = 'ACCOUNT_DELETE',
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
export enum Device {
  LARGE = 'large',
}
