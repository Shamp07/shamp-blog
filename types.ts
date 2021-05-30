import { RootStore } from '@stores';

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
  message: string,
  fromUserId: number,
}

export enum ChatPage {
  LOBBY = 0,
  ROOM = 1,
}
