import { socket } from "../context/appContext";

export interface SignUpFormTypes {
    userName: string;
    email:string,
    password: string;
    confirmPassword?:string,
    profilePic: any
}
export interface loginFormTypes {
    email:string,
    password: string;
}

export interface AppContextProps {
    socket: typeof socket;
    currentRoom: string;
    setCurrentRoom: React.Dispatch<React.SetStateAction<string>>;
    members: string[];
    setMembers: React.Dispatch<React.SetStateAction<string[]>>;
    messages: string[];
    setMessages: React.Dispatch<React.SetStateAction<string[]>>;
    privateMemberMsg: Record<string, any>; 
    setPrivateMemberMsg: React.Dispatch<React.SetStateAction<Record<string, any>>>;
    rooms: string[];
    setRooms: React.Dispatch<React.SetStateAction<string[]>>;
    newMessages: Record<string, any>; 
    setNewMessages: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  }