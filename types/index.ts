import { RootStore } from '@stores';
import { NextApiRequest } from 'next';
import { AppProps } from 'next/app';

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

export interface Response {
  code: number;
  result: any;
}

export enum Auth {
  USER = 'user',
  ADMIN = 'admin',
}

export type Tag = string;

export interface Post {
  rownum: number;
  page: number;
  id: number;
  tag: string;
  title: string;
  titleId: string;
  content: string;
  shortContent: string;
  thumbnail: string;
  crtDttm: string;
  likeCnt: number;
  time: string;
  modifiedTime: string;
}

export interface Article {
  id: number;
  tags: string[];
  title: string;
  content: string;
  shortContent: string;
  thumbnail: string;
  viewCnt: number;
  likeCnt: number;
  time: string;
  modifiedTime: string;
}

export type EditArticle = Pick<Article, 'id' | 'tags' | 'title' | 'content'>;

export interface User {
  id: number;
  name: string;
  verifyFl: boolean;
  adminFl: boolean;
  exp: number;
  iat: number;
}

export enum Device {
  MOBILE = 'mobile',
  TABLET = 'tablet',
  LAPTOP = 'laptop',
  DESKTOP = 'desktop',
}

export enum PopupType {
  CONFIRM,
}
