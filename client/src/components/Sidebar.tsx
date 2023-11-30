import { useSelector } from "react-redux"
import { AppContext } from "../context/appContext"
import { useContext, useEffect } from 'react'
function Sidebar() {
    const user = useSelector((state:any) => state.user)
    const { socket, setMembers, members, setCurrentRoom, setRooms, privateMemberMsg, rooms, setPrivateMemberMsg, currentRoom } = useContext(AppContext)
    socket.off('new-user').on('new-user', (payload) => {
        setMembers(payload)
    })
    useEffect(() => {
        if(user) {
            setCurrentRoom('general')
            getRooms()
            socket.emit('join-room', 'general');
            socket.emit('new-user')
        }
    }, [socket])

    const getRooms = () => {
        fetch('http://127.0.0.1:3000/rooms').then((res) => res.json()).then((data) =>  setRooms(data))
    }
    return (
        <>
            <div>
                <div className="flex flex-col md:ms-14 mt-4">
                    <div>
                        <h1 className="font-semibold text-3xl ">Available Rooms</h1>
                    </div>
                    <div className="mt-3">
                        {rooms.map((value, idx) => (
                            <div className="" key={idx}>
                                <h2 className="border ps-2 h-9 border-gray-400 -mt-px rounded-md">{value}</h2>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h2>Members</h2>
                        {members.map((member:any) => (
                            <>
                            <div className=" border ps-2 h-9 border-gray-400 -mt-px rounded-md cursor-pointer" key={member?._id}>{member.userName}</div>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar
