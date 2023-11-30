import { IoIosSend } from "react-icons/io";
import { useState, useContext, FormEvent, ChangeEvent, useEffect, useRef } from 'react'
import { AppContext } from "../context/appContext";
import { useSelector } from "react-redux";
function MessageForm() {
  const [message, setMessage] = useState<string>("")
  const user = useSelector((state: any) => state.user)
  const { socket, currentRoom, setMessages, messages } = useContext(AppContext)
  const getFormattedDate = () => {
    const date: Date = new Date()
    const year: number = date.getFullYear()
    let month: string = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;
    let day: string = date.getDate().toString()
    day = day.length > 1 ? day : "0" + day;
    return month + '/' + day + '/' + year
  }

  const todayDate = getFormattedDate();

  socket.off('room-messages').on("room-messages", (roomMessages) => {
    setMessages(roomMessages)
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!message) return
    const today = new Date();
    const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ":" + minutes;
    const roomId = currentRoom;
    socket.emit('message-room', roomId, message, user, time, todayDate);
    setMessage("")
  }
  const messageBoxRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div className="messagebox rounded-md h-5/6 overflow-auto scrollbar bg-gray-800" ref={messageBoxRef}>
        {user && messages?.map((message: any, idx: number) => (
          <div className="t" key={idx}>
            <p className="text-white text-center mt-2">{message?._id}</p>
            {message?.messagesByDate.map(({ content, time, from: sender }: { content: string, time: string, from: { userName: string, profilePic: string } }, idx: number) => (
              <div key={idx} className="m-1 text-white">
                <div className={`flex w-full ${sender.userName === user.userName ? 'justify-end' : 'justify-start'}`}>
                  {/* <p className={`bg-gray-500 rounded-md ${sender.userName === user.userName ? 'text-right' : 'text-left'} px-1`}>{ sender.userName === user.userName ? "me" : sender?.userName}</p> */}
                </div>
                <div className={`text-xs flex w-full ${sender.userName === user.userName ? 'justify-end' : 'justify-start'} ${sender.userName === user.userName ? '' : ''}`}>
                  {sender.userName !== user.userName && <img src={sender.profilePic} alt="" className="rounded-full w-7 h-7" />}
                  <p className={`px-2 py-2 text-sm ${sender.userName === user.userName ? 'text-center bg-green-500 rounded-md pt-1' : 'bg-gray-600 rounded-md'}  pt-1`}>{content}</p>
                </div>
                <p className={`text-xs ${sender.userName === user.userName ? "text-right" : 'text-left'} `}>{time}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="inputbox h-1/6 mt-2 w-full">
        <form autoComplete="off" action="" onSubmit={handleSubmit} className="md:flex w-full bg-gray-700 font-mono rounded-md text-white">
          <input type="text" name="message" id="message" placeholder="Your message.." value={message} onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)} className=" ps-2 outline-none rounded-md h-12 w-1/2 md:w-5/6 bg-gray-700" />
          <button className="  rounded-md h-12 w-20 md:ms-12"><IoIosSend className="text-blue-600 text-4xl ms-4" /> </button>
        </form>
      </div>
    </>
  )
}

export default MessageForm
