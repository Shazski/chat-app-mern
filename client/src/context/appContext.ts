import io from "socket.io-client";
const SOCKET_URL: string = "http://127.0.0.1:3000";
import React from "react";
import { AppContextProps } from "../types/types";
export const socket = io(SOCKET_URL, { transports: ["websocket", "polling"] });

//app context
export const AppContext = React.createContext<AppContextProps>({
  socket,
  currentRoom: [],
  setCurrentRoom: () => {},
  members: [],
  setMembers: () => {},
  messages: [],
  setMessages: () => {},
  privateMemberMsg: {},
  setPrivateMemberMsg: () => {},
  rooms: [],
  setRooms: () => {},
  newMessages: {},
  setNewMessages: () => {}
});
