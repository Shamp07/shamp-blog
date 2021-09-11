import { RefObject, ChangeEvent, KeyboardEvent } from 'react';
import { observable } from 'mobx';
import dayjs from 'dayjs';

import * as T from '@types';
import Axios from '@utilities/axios';
import alertStore from './alertStore';

export interface ChatStore {
  isChatOpen: boolean;
  isChatLoading: boolean;
  chatPage: T.ChatPage;
  chat: string;
  chatRoom: T.ChatRoomType;
  chatList: T.Chat[];
  toUserId: number;
  toUserName: string;
  chatTempId: number;
  chatSocket: SocketIOClient.Socket | null;
  socketId: string;
  scrollRef: RefObject<HTMLDivElement> | null;
  chatRoomList: any[];
  notReadChatCount: number;
  displayedChatList: any[];
  openChat(): Promise<void>;
  loadChatList(userId: number): Promise<void>;
  readChat(userId: number): void;
  connectSocket(): void;
  receiveChat({ message, fromUserId }: T.ReceiveMessage): void;
  insertChatRoom(fromUserId: number, message: string): void;
  onChangeChat(event: ChangeEvent<HTMLTextAreaElement>): void;
  moveChatPage(page: number, userId: number, userName: string): void;
  sendChat(userId: number): void;
  onKeyPressChat(event: KeyboardEvent<HTMLTextAreaElement>, userId: number): void;
  addChat(userId: number, toUserId: number, time: string): void;
  getChatList(userId: number): void;
  getChatRoomList(): void;
  setChatPage(page: T.ChatPage): void;
  scrollToBottom(): void;
  loading(callback: Function): void;
  setIsChatLoading(value: boolean): void;
  clearChatList(): void;
  getTempChatId(): void;
  setScrollRef(ref: RefObject<HTMLDivElement>): void;
  getChatTime(): string;
  getChatTimeStamp(): string;
}

const chatStore: ChatStore = {
  isChatOpen: false,
  isChatLoading: true,
  chatPage: T.ChatPage.LOBBY,
  chat: '',
  chatRoom: {},
  chatList: [],
  toUserId: -1,
  toUserName: 'Shamp',
  chatTempId: 0,
  chatSocket: null,
  socketId: '',
  scrollRef: null,
  get chatRoomList() {
    return Object.keys(this.chatRoom)
      .map((id) => this.chatRoom[Number(id)])
      .sort(({ timeStamp: pts }, { timeStamp: ts }) => Number(ts) - Number(pts));
  },
  get notReadChatCount() {
    let count = 0;
    Object.keys(this.chatRoom)
      .forEach((id) => {
        count += Number(this.chatRoom[Number(id)].notReadChatCount);
      });
    return count;
  },
  get displayedChatList() {
    let beforeTime = '';
    let beforeFromUserId = -1;

    return this.chatList.map((data, index) => {
      // 첫 메시지 시간 설정하는 부분
      if (index === 0 && this.chatList[index].id === 0) {
        if (this.chatList[index + 1]) {
          return {
            ...data,
            displayedTime: this.chatList[index + 1].time,
          };
        }

        return {
          ...data,
          displayedTime: this.getChatTime(),
        };
      }

      const { fromUserId, time } = data;
      // 전 메시지와 보낸시간이 같고, 전에 보낸 송신자가 동일하면 메시지 축양형으로 설정
      const isSimple = (beforeTime === time && beforeFromUserId === fromUserId);

      beforeTime = time;
      beforeFromUserId = fromUserId;

      return {
        ...data,
        isSimple,
        displayedTime: time,
      };
    });
  },
  async openChat() {
    alertStore.toggleAlertModal('지원 준비 중 이에요!');

    // if (!this.isChatOpen) {
    //   if (!loggedIn) {
    //     this.AlertStore.toggleAlertModal('채팅은 로그인 이후 이용하실 수 있습니다! 비회원은 곧 지원 예정입니다.');
    //     return;
    //   }
    //
    //   if (isAdmin) {
    //     this.setChatPage(T.ChatPage.LOBBY);
    //     this.getChatRoomList();
    //   } else {
    //     this.setChatPage(T.ChatPage.ROOM);
    //     this.loading(() => this.loadChatList(0));
    //   }
    // }
    // this.isChatOpen = !this.isChatOpen;
  },
  async loadChatList(userId) {
    this.isChatLoading = true;
    this.toUserId = userId;
    this.readChat(userId);
    await this.getChatList(userId);
    setTimeout(this.scrollToBottom, 0);
    this.isChatLoading = false;
  },
  readChat(userId) {
    this.chatRoom[userId].notReadChatCount = 0;
  },
  connectSocket() {
    // TODO: CHATTING
    // this.chatSocket = socketio.connect('http://localhost');
    // this.chatSocket.emit('connect_client', userId);
    // this.chatSocket.on('receive_message', this.receiveChat);
  },
  receiveChat({ message, fromUserId }) {
    if (this.toUserId === fromUserId && this.isChatOpen) {
      this.chatTempId -= 1;
      this.chatList = [
        ...this.chatList,
        {
          id: this.chatTempId,
          fromUserId,
          fromUserName: this.toUserName,
          message,
          time: this.getChatTime(),
          displayedTime: '',
        },
      ];
      this.scrollToBottom();
    } else if (this.chatPage === T.ChatPage.LOBBY) {
      this.insertChatRoom(fromUserId, message);
    } else if (this.chatPage === T.ChatPage.ROOM) {
      this.chatRoom[fromUserId].notReadChatCount = Number(
        this.chatRoom[fromUserId].notReadChatCount,
      ) + 1;
    }
  },
  insertChatRoom() {
    // this.chatRoom = {
    //   ...this.chatRoom,
    //   [fromUserId]: {
    //     ...this.chatRoom[fromUserId],
    //     message,
    //     timeStamp: Number(this.getChatTimeStamp()),
    //     time: this.getChatTime(),
    //     notReadChatCount: Number(this.chatRoom[fromUserId].notReadChatCount) + 1,
    //   },
    // };
  },
  onChangeChat(event) {
    this.chat = event.target.value;
  },
  async moveChatPage(page, userId, userName) {
    this.toUserName = userName;
    if (page === T.ChatPage.LOBBY) {
      await this.getChatRoomList();
    } else if (page === T.ChatPage.ROOM) {
      await this.loadChatList(userId);
    }
    this.chatPage = page;
  },
  async sendChat(userId) {
    if (!this.chat) return;
    if (!this.chatSocket) return;

    this.chatSocket.emit('send_message', {
      message: this.chat,
      toUserId: this.toUserId,
      fromUserId: userId,
    });

    const time = this.getChatTime();
    await this.addChat(userId, this.toUserId, time);
    this.scrollToBottom();

    this.chatTempId -= 1;
    this.chat = '';
  },
  async onKeyPressChat(event, userId) {
    if (event.key === 'Enter') {
      await this.sendChat(userId);
      event.preventDefault();
    }
  },
  async addChat(userId, toUserId) {
    await Axios({
      method: T.RequestMethod.POST,
      url: '/api/chat',
      data: {
        userId: toUserId,
        message: this.chat,
      },
      success: () => {
        // this.chatList = [
        //   ...this.chatList,
        //   {
        //     id: this.getTempChatId(),
        //     fromUserName: '',
        //     fromUserId: userId,
        //     message: this.chat,
        //     time,
        //   },
        // ];
      },
    });
  },
  async getChatList(userId) {
    this.clearChatList();
    await Axios({
      method: T.RequestMethod.GET,
      url: '/api/chat',
      data: {
        userId,
      },
      success: (response) => {
        const { result } = response.data;
        this.chatList = [
          ...this.chatList,
          ...result,
        ];
      },
    });
  },
  getChatRoomList() {
    this.isChatLoading = true;
    Axios({
      method: T.RequestMethod.GET,
      url: '/api/chat/room',
      success: (response) => {
        const { result } = response.data;
        result.forEach((data: T.ChatRoomList) => {
          const { opponentUserId } = data;

          this.chatRoom[Number(opponentUserId)] = data;
        });
        this.isChatLoading = false;
      },
    });
  },
  setChatPage(page) {
    this.chatPage = page;
  },
  scrollToBottom() {
    const { scrollRef } = this;
    if (scrollRef?.current) {
      const { scrollHeight, clientHeight } = scrollRef.current;
      scrollRef.current.scrollTop = scrollHeight - clientHeight;
    }
  },
  loading(callback: Function) {
    return async () => {
      const { setIsChatLoading } = this;
      setIsChatLoading(true);
      await callback();
      setIsChatLoading(false);
    };
  },
  setIsChatLoading(value: boolean) {
    this.isChatLoading = value;
  },
  clearChatList() {
    this.chatList = [{
      id: 0,
      fromUserName: 'Shamp',
      fromUserId: 0,
      message: '안녕하세요. 블로그에 관련된 건의사항이나, 질문들을 자유롭게 보내주세요!',
      time: '',
    }];
  },
  getTempChatId() {
    this.chatTempId -= 1;
    return this.chatTempId;
  },
  setScrollRef(ref: RefObject<HTMLDivElement>) {
    this.scrollRef = ref;
  },
  getChatTime() {
    return dayjs().format('hh:mm A');
  },
  getChatTimeStamp() {
    return dayjs().format('YYYYMMDDHHmmss');
  },
};

export default observable(chatStore);
