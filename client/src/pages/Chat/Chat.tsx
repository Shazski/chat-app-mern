import MessageForm from "../../components/MessageForm"
import Sidebar from "../../components/Sidebar"

function Chat() {
  return (
    <>
      <div className="md:flex">
        <div className="md:w-1/4">
          <Sidebar />
        </div>
        <div className="md:w-2/4 items-center h-screen  md:mx-16 mt-16 md:h-[75vh]">
          <MessageForm />
        </div>
      </div>
    </>
  )
}

export default Chat
