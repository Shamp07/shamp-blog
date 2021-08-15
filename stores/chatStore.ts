// import { RefObject, ChangeEvent, KeyboardEvent } from 'react';
// import { makeObservable } from 'mobx';
// import dayjs from 'dayjs';
//
// import makeAnnotations from '@util/Mobx';
// import * as T from '@types';
// import Axios from '@util/Axios';
// import AlertStore from './AlertStore';
//
// class ChatStore {
//   AlertStore: AlertStore;
//
//   isChatOpen = false;
//
//   isChatLoading = true;
//
//   chatPage = T.ChatPage.LOBBY;
//
//   chat = '';
//
//   chatRoom: T.ChatRoomType = {};
//
//   chatList: T.Chat[] = [];
//
//   toUserId = -1;
//
//   toUserName = 'Shamp';
//
//   chatTempId = 0;
//
//   chatSocket: SocketIOClient.Socket | null = null;
//
//   socketId = '';
//
//   scrollRef: RefObject<HTMLDivElement> | null = null;
//
//   constructor(root: { AlertStore: AlertStore }) {
//     this.AlertStore = root.AlertStore;
//     makeObservable(this, makeAnnotations<this>({
//       observables: [
//         'isChatOpen', 'chat', 'chatList', 'chatPage',
//         'isChatLoading', 'scrollRef', 'chatRoom',
//       ],
//       actions: [
//         'openChat', 'onChangeChat', 'getChatList', 'moveChatPage',
//         'sendChat', 'setScrollRef', 'clearChatList', 'receiveChat',
//         'insertChatRoom', 'readChat', 'scrollToBottom',
//       ],
//       computeds: ['chatRoomList', 'displayedChatList', 'notReadChatCount'],
//     }));
//   }
//
//   get chatRoomList() {
//     return Object.keys(this.chatRoom)
//       .map((id) => this.chatRoom[Number(id)])
//       .sort(({ timeStamp: pts }, { timeStamp: ts }) => Number(ts) - Number(pts));
//   }
//
//   get notReadChatCount() {
//     let count = 0;
//     Object.keys(this.chatRoom)
//       .forEach((id) => {
//         count += Number(this.chatRoom[Number(id)].notReadChatCount);
//       });
//     return count;
//   }
//
//   get displayedChatList() {
//     let beforeTime = '';
//     let beforeFromUserId = -1;
//
//     return this.chatList.map((data, index) => {
//       // 첫 메시지 시간 설정하는 부분
//       if (index === 0 && this.chatList[index].id === 0) {
//         if (this.chatList[index + 1]) {
//           return {
//             ...data,
//             displayedTime: this.chatList[index + 1].time,
//           };
//         }
//
//         return {
//           ...data,
//           displayedTime: this.getChatTime(),
//         };
//       }
//
//       const { fromUserId, time } = data;
//       // 전 메시지와 보낸시간이 같고, 전에 보낸 송신자가 동일하면 메시지 축양형으로 설정
//       const isSimple = (beforeTime === time && beforeFromUserId === fromUserId);
//
//       beforeTime = time;
//       beforeFromUserId = fromUserId;
//
//       return {
//         ...data,
//         isSimple,
//         displayedTime: time,
//       };
//     });
//   }
//
//   openChat = async (
//     // loggedIn: boolean, isAdmin: boolean,
//   ) => {
//     this.AlertStore.toggleAlertModal('지원 준비 중 이에요!');
//
//     // if (!this.isChatOpen) {
//     //   if (!loggedIn) {
//     //     this.AlertStore.toggleAlertModal('채팅은 로그인 이후 이용하실 수 있습니다! 비회원은 곧 지원 예정입니다.');
//     //     return;
//     //   }
//     //
//     //   if (isAdmin) {
//     //     this.setChatPage(T.ChatPage.LOBBY);
//     //     this.getChatRoomList();
//     //   } else {
//     //     this.setChatPage(T.ChatPage.ROOM);
//     //     this.loading(() => this.loadChatList(0));
//     //   }
//     // }
//     // this.isChatOpen = !this.isChatOpen;
//   };
//
//   loadChatList = async (userId: number) => {
//     this.isChatLoading = true;
//     this.toUserId = userId;
//     this.readChat(userId);
//     await this.getChatList(userId);
//     setTimeout(this.scrollToBottom, 0);
//     this.isChatLoading = false;
//   };
//
//   readChat = (userId: number) => {
//     this.chatRoom[userId].notReadChatCount = 0;
//   };
//
//   connectSocket = (
//   //  userId: number
//   ) => {
//     // TODO: CHATTING
//     // this.chatSocket = socketio.connect('http://localhost');
//     // this.chatSocket.emit('connect_client', userId);
//     // this.chatSocket.on('receive_message', this.receiveChat);
//   };
//
//   receiveChat = ({ message, fromUserId }: T.ReceiveMessage) => {
//     if (this.toUserId === fromUserId && this.isChatOpen) {
//       this.chatTempId -= 1;
//       this.chatList = [
//         ...this.chatList,
//         {
//           id: this.chatTempId,
//           fromUserId,
//           fromUserName: this.toUserName,
//           message,
//           time: this.getChatTime(),
//           displayedTime: '',
//         },
//       ];
//       this.scrollToBottom();
//     } else if (this.chatPage === T.ChatPage.LOBBY) {
//       this.insertChatRoom(fromUserId, message);
//     } else if (this.chatPage === T.ChatPage.ROOM) {
//       this.chatRoom[fromUserId].notReadChatCount = Number(
//         this.chatRoom[fromUserId].notReadChatCount,
//       ) + 1;
//     }
//   };
//
//   insertChatRoom = (fromUserId: number, message: string) => {
//     this.chatRoom = {
//       ...this.chatRoom,
//       [fromUserId]: {
//         ...this.chatRoom[fromUserId],
//         message,
//         timeStamp: Number(this.getChatTimeStamp()),
//         time: this.getChatTime(),
//         notReadChatCount: Number(this.chatRoom[fromUserId].notReadChatCount) + 1,
//       },
//     };
//   };
//
//   onChangeChat = (event: ChangeEvent<HTMLTextAreaElement>) => {
//     this.chat = event.target.value;
//   };
//
//   moveChatPage = async (page: number, userId: number, userName: string) => {
//     this.toUserName = userName;
//     if (page === T.ChatPage.LOBBY) {
//       await this.getChatRoomList();
//     } else if (page === T.ChatPage.ROOM) {
//       await this.loadChatList(userId);
//     }
//     this.chatPage = page;
//   };
//
//   sendChat = async (userId: number) => {
//     if (!this.chat) return;
//     if (!this.chatSocket) return;
//
//     this.chatSocket.emit('send_message', {
//       message: this.chat,
//       toUserId: this.toUserId,
//       fromUserId: userId,
//     });
//
//     const time = this.getChatTime();
//     await this.addChat(userId, this.toUserId, time);
//     this.scrollToBottom();
//
//     this.chatTempId -= 1;
//     this.chat = '';
//   };
//
//   onKeyPressChat = async (
//     event: KeyboardEvent<HTMLTextAreaElement>,
//     userId: number,
//   ) => {
//     if (event.key === 'Enter') {
//       await this.sendChat(userId);
//       event.preventDefault();
//     }
//   };
//
//   addChat = async (userId: number, toUserId: number, time: string) => {
//     await Axios({
//       method: T.RequestMethod.POST,
//       url: '/api/chat',
//       data: {
//         userId: toUserId,
//         message: this.chat,
//       },
//       success: () => {
//         this.chatList = [
//           ...this.chatList,
//           {
//             id: this.getTempChatId(),
//             fromUserName: '',
//             fromUserId: userId,
//             message: this.chat,
//             time,
//           },
//         ];
//       },
//     });
//   };
//
//   getChatList = async (userId: number) => {
//     this.clearChatList();
//     await Axios({
//       method: T.RequestMethod.GET,
//       url: '/api/chat',
//       data: {
//         userId,
//       },
//       success: (response) => {
//         const { result } = response.data;
//         this.chatList = [
//           ...this.chatList,
//           ...result,
//         ];
//       },
//     });
//   };
//
//   getChatRoomList = () => {
//     this.isChatLoading = true;
//     Axios({
//       method: T.RequestMethod.GET,
//       url: '/api/chat/room',
//       success: (response) => {
//         const { result } = response.data;
//         result.forEach((data: T.ChatRoomList) => {
//           const { opponentUserId } = data;
//
//           this.chatRoom[Number(opponentUserId)] = data;
//         });
//         this.isChatLoading = false;
//       },
//     });
//   };
//
//   setChatPage = (page: T.ChatPage) => {
//     this.chatPage = page;
//   };
//
//   scrollToBottom = () => {
//     const { scrollRef } = this;
//     if (scrollRef?.current) {
//       const { scrollHeight, clientHeight } = scrollRef.current;
//       scrollRef.current.scrollTop = scrollHeight - clientHeight;
//     }
//   };
//
//   loading = (callback: Function) => async () => {
//     const { setIsChatLoading } = this;
//     setIsChatLoading(true);
//     await callback();
//     setIsChatLoading(false);
//   };
//
//   setIsChatLoading = (value: boolean) => {
//     this.isChatLoading = value;
//   };
//
//   clearChatList = () => {
//     this.chatList = [{
//       id: 0,
//       fromUserName: 'Shamp',
//       fromUserId: 0,
//       message: '안녕하세요. 블로그에 관련된 건의사항이나, 질문들을 자유롭게 보내주세요!',
//       time: '',
//     }];
//   };
//
//   getTempChatId = () => {
//     this.chatTempId -= 1;
//     return this.chatTempId;
//   };
//
//   setScrollRef = (ref: RefObject<HTMLDivElement>) => {
//     this.scrollRef = ref;
//   };
//
//   // date util
//   getChatTime = () => dayjs().format('hh:mm A');
//
//   getChatTimeStamp = () => dayjs().format('YYYYMMDDHHmmss');
// }
//
// export default ChatStore;
