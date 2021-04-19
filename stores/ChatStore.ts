import { makeObservable } from 'mobx';
import React from 'react';
import socketio from 'socket.io-client';
import makeAnnotations from '../util/Mobx';
import Axios from '../util/Axios';
import AlertStore from './AlertStore';

export interface ChatType {
  fromUserId: number;
  toUserId: number;
  message: string;
  time: string;
}

export interface ChatRoomType {
  id: number;
  fromUserId: number;
  fromUserName: string;
  toUserName: string;
  message: string;
  time: string;
}

class ChatStore {
  AlertStore: AlertStore;

  isChatOpen = false;

  chatRoomList: Array<ChatRoomType> = [];

  chat = '';

  chatList: Array<ChatType> = [];

  chatSocket: SocketIOClient.Socket | null = null;

  socketId = '';

  constructor(root: { AlertStore: AlertStore }) {
    this.AlertStore = root.AlertStore;
    makeObservable(this, makeAnnotations<this>({
      observables: ['isChatOpen', 'chat', 'chatList', 'chatRoomList'],
      actions: ['openChat', 'onChangeChat'],
    }));
  }

  openChat = (loggedIn: boolean): void => {
    if (!this.isChatOpen) {
      if (!loggedIn) {
        this.AlertStore.toggleAlertModal('채팅은 로그인 이후 이용하실 수 있습니다! 비회원은 곧 지원 예정입니다.');
        return;
      }
      this.getChatRoomList();
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
        toUserId: 0,
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
    Axios({
      method: 'get',
      url: '/api/chat/room',
      success: (response) => {
        const { result } = response.data;
        this.chatRoomList = result;
      },
    });
  };

  onChangeChat = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.chat = event.target.value;
  };

  sendChat = (userId: number) => {
    if (!this.chatSocket) return;
    this.chatSocket.emit('send_message', {
      message: this.chat,
      socketId: this.socketId,
    });

    this.chatList.push({
      fromUserId: userId,
      toUserId: 0,
      message: this.chat,
      time: '',
    });

    this.chat = '';
  };
}

export default ChatStore;
