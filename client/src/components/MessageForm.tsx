import { IoIosSend } from "react-icons/io";
function MessageForm() {
  return (
    <>
        <div className="messagebox border h-5/6">

        </div>
        <div className="inputbox h-1/6 mt-8 w-full">
            <form action="" className="md:flex w-full">
                <input type="text" name="message" id="message" placeholder="Your message.." className=" border-gray-400 border ps-2 outline-none rounded-md h-12 w-1/2 md:w-5/6" />
                <button className="border bg-yellow-500 rounded-md h-12 w-20 ms-4 md:ms-12"><IoIosSend className="text-white text-4xl ms-5" /> </button>
            </form>
        </div>
    </>
  )
}

export default MessageForm
