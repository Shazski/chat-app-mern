import { IoIosSend } from "react-icons/io";
import { useState, useContext, FormEvent, ChangeEvent, useEffect, useRef } from 'react'
import { AppContext } from "../context/appContext";
import { useSelector } from "react-redux";
function MessageForm() {
  const [message, setMessage] = useState<string>("")
  const user = useSelector((state: any) => state.user)
  const { socket, currentRoom, setMessages, messages, privateMemberMsg } = useContext(AppContext)
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
    // Scroll to the bottom of the message box when messages change
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [messages]);

  console.log(messages, "my message")
  return (
    <>
      <div className="messagebox border h-5/6 overflow-auto scrollbar" ref={messageBoxRef}>
      {user && messages?.map((message: any, idx: number) => (
  <div className="t" key={idx}>
    <p className="bg-red-700">{message?._id}</p>
    {message?.messagesByDate.map(({ content, time, from: sender }: { content: string, time: string, from: { userName: string, profilePic: string } }, idx: number) => (
      <div key={idx} className="m-1 text-white">
        <div className={`flex w-full ${sender.userName === user.userName ? 'justify-end' : 'justify-start'}`}>
          <p className={`bg-gray-700 ${sender.userName === user.userName ? 'text-right' : 'text-left'} ps-2`}>{sender?.userName}</p>
        </div>
        <div className={`text-xs flex w-full ${sender.userName === user.userName ? 'justify-end' : 'justify-start'} ${sender.userName === user.userName ? 'bg-green-500 rounded-md text-right' : 'bg-blue-500 rounded-md text-left'}`}>
          {sender.userName !== user.userName && <img src={sender.profilePic} alt="" className="rounded-full w-7 h-7" />}
          <p className={`ps-2  ${sender.userName === user.userName ? 'text-center' : ''} pt-1`}>{content}</p>
        </div>
        <p className="text-xs">{time}</p>
      </div>
    ))}
  </div>
))}
      </div>
      <div className="inputbox h-1/6 mt-8 w-full">
        <form action="" onSubmit={handleSubmit} className="md:flex w-full">
          <input type="text" name="message" id="message" placeholder="Your message.." value={message} onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)} className=" border-gray-400 border ps-2 outline-none rounded-md h-12 w-1/2 md:w-5/6" />
          <button className="border bg-yellow-500 rounded-md h-12 w-20 ms-4 md:ms-12"><IoIosSend className="text-white text-4xl ms-5" /> </button>
        </form>
      </div>
    </>
  )
}

export default MessageForm
