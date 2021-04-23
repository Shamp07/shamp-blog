import { makeObservable } from 'mobx';
import React from 'react';
import socketio from 'socket.io-client';
import makeAnnotations from '../util/Mobx';
import Axios from '../util/Axios';
import AlertStore from './AlertStore';

export interface ChatType {
  id: number;
  fromUserName?: string;
  fromUserId: number;
  message: string;
  time: string;
}

export interface ChatRoomType {
  id: number;
  fromUserId: number;
  fromUserName: string;
  toUserId: number;
  toUserName: string;
  message: string;
  time: string;
}

class ChatStore {
  AlertStore: AlertStore;

  isChatOpen = false;

  isChatLoading = true;

  chatRoomList: Array<ChatRoomType> = [];

  // 0: ChatLobby
  // 1: ChatRoom
  chatPage = 0;

  chat = '';

  chatList: Array<ChatType> = [];

  chatTempId = 0;

  chatSocket: SocketIOClient.Socket | null = null;

  socketId = '';

  constructor(root: { AlertStore: AlertStore }) {
    this.AlertStore = root.AlertStore;
    makeObservable(this, makeAnnotations<this>({
      observables: [
        'isChatOpen', 'chat', 'chatList', 'chatRoomList',
        'chatPage', 'isChatLoading',
      ],
      actions: [
        'openChat', 'onChangeChat', 'getChatList', 'moveChatPage',
        'sendChat',
      ],
    }));
  }

  openChat = (loggedIn: boolean, isAdmin: boolean): void => {
    if (!this.isChatOpen) {
      if (!loggedIn) {
        this.AlertStore.toggleAlertModal('채팅은 로그인 이후 이용하실 수 있습니다! 비회원은 곧 지원 예정입니다.');
        return;
      }

      if (isAdmin) {
        this.chatPage = 0;
        this.getChatRoomList();
      } else {
        this.chatPage = 1;
      }

      this.getSocketId();
    }
    this.isChatOpen = !this.isChatOpen;
  };

  connectSocket = (userId: number) => {
    this.chatSocket = socketio.connect('http://localhost');
    this.chatSocket.emit('get_socket_id');
    this.chatSocket.on('send_socket_id', this.updateSocketId);
    this.chatSocket.on('receive_message', (message: string) => {
      this.chatList.push({
        fromUserId: userId,
        message,
        time: '',
      });
    });
  };

  getSocketId = () => {
    Axios({
      method: 'get',
      url: '/api/chat/socket',
      data: {
        userId: 0,
      },
      success: (response) => {
        const { result } = response.data;
        this.socketId = result;
      },
    });
  };

  updateSocketId = (socketId: string) => {
    Axios({
      method: 'put',
      url: '/api/chat/socket',
      data: {
        socketId,
      },
    });
  };

  getChatRoomList = () => {
    this.isChatLoading = true;
    Axios({
      method: 'get',
      url: '/api/chat/room',
      success: (response) => {
        const { result } = response.data;
        this.chatRoomList = result;
        this.isChatLoading = false;
      },
    });
  };

  getChatList = (userId: number) => {
    this.isChatLoading = true;
    Axios({
      method: 'get',
      url: '/api/chat',
      data: {
        userId,
      },
      success: (response) => {
        const { result } = response.data;
        this.chatList = result;
        this.isChatLoading = false;
      },
    });
  };

  onChangeChat = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.chat = event.target.value;
  };

  moveChatPage = (page: number, userId: number) => {
    if (page === 0) {
      this.getChatRoomList();
    } else if (page === 1) {
      this.getChatList(userId);
    }
    this.chatPage = page;
  };

  sendChat = (userId: number) => {
    if (!this.chatSocket) return;
    this.chatSocket.emit('send_message', {
      message: this.chat,
      socketId: this.socketId,
    });

    this.chatList = [
      ...this.chatList,
      {
        id: this.chatTempId,
        fromUserId: userId,
        message: this.chat,
        time: '',
      },
    ];

    console.log([...this.chatList ]);


    this.chatTempId -= 1;
    this.chat = '';
  };
}

export default ChatStore;
