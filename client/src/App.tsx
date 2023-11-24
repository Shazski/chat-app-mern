import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useState } from "react"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Signup"
import Chat from "./pages/Chat/Chat"
import Navigation from "./components/Navigation"
import { useSelector } from "react-redux"
import { AppContext, socket } from "./context/appContext"

function App() {
  const user = useSelector((state: any) => state.user)
  const [rooms, setRooms] = useState<string[]>([])
  const [currentRoom, setCurrentRoom] = useState<string[]>([])
  const [members, setMembers] = useState<string[]>([])
  const [messages, setMessages] = useState<string[]>([])
  const [privateMemberMsg, setPrivateMemberMsg] = useState({})
  const [newMessages, setNewMessages] = useState({})
  return (
    <AppContext.Provider value={{ socket, currentRoom, setCurrentRoom, members, setMembers, messages, setMessages, privateMemberMsg, setPrivateMemberMsg, rooms, setRooms, newMessages, setNewMessages }}>
      <Router>
        <Navigation />
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={user ? <Navigate to="/chat" /> : <Login />} />
          <Route path='/signup' element={user ? <Navigate to="/chat" /> : <Signup />} />
          <Route path='/chat' element={!user ? <Navigate to="/login" /> : <Chat />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  )
}

export default App
