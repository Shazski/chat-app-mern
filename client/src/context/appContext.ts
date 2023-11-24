import io from "socket.io-client"
import { config } from "dotenv"
config()
const SOCKET_URL:string = String(process.env.SOCKET_URL)
import React from "react"
export const socket = io(SOCKET_URL)

//app context
export const AppContext = React.createContext()

