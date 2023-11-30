import { useSelector } from "react-redux"
import { AppContext } from "../context/appContext"
import { useContext, useEffect } from 'react'
function Sidebar() {
    const user = useSelector((state: any) => state.user)
    const { socket, setMembers, members, setCurrentRoom, setRooms, privateMemberMsg, rooms, setPrivateMemberMsg, currentRoom } = useContext(AppContext)
    socket.off('new-user').on('new-user', (payload) => {
        setMembers(payload)
    })
    useEffect(() => {
        if (user) {
            setCurrentRoom('general')
            getRooms()
            socket.emit('join-room', 'general');
            socket.emit('new-user')
        }
    }, [socket])

    const getRooms = () => {
        fetch('http://127.0.0.1:3000/rooms').then((res) => res.json()).then((data) => setRooms(data))
    }

    const joinRoom = async(room:string, isPublic:boolean = true) => {
        if(!user) {
            return
        }
        socket.emit("join-room", room);
        setCurrentRoom(room);

        if(isPublic) {
            setPrivateMemberMsg({})
        }
    }

    const orderIds = (id1:string, id2:string) => {
        if(id1 > id2) {
            return id1 + "_" + id2
        } else {
            return id2 + "_" + id1
        }
    }

    const handlePrivateMemberMsg = (member: {_id:string,userName:"string",profilePic:string,status:string,}) => {
        setPrivateMemberMsg(member);
        const roomId:string = orderIds(user._id, member._id)
        joinRoom(roomId, false)
    }
    return (
        <>
            <div>
                <div className="flex flex-col md:ms-14 mt-4 text-white">
                    <div >
                        <h1 className="font-semibold text-3xl ">Rooms</h1>
                    </div>
                    <div className="mt-3">
                        {rooms.map((value, idx) => (
                            <div className="text-white" key={idx}>
                                <h2 onClick={ () => joinRoom(value)}  className={` my-2  uppercase ps-2 h-9 -mt-px rounded-md cursor-pointer py-1 font-mono ${value === currentRoom ? 'bg-blue-600':'bg-gray-800'}`}>{value}</h2>
                            </div>
                        ))}
                    </div>
                        <h2 className="text-3xl mb-3">Members</h2>
                    <div className="h-64 overflow-auto scrollbar text-white">
                        {members.map((member: any) => (
                            <>
                            { user._id !== member._id &&
                            <div onClick={() => handlePrivateMemberMsg(member)} className={`flex h-12 ps-2 pt-1  my-2  -mt-px rounded-md cursor-pointer ${member._id === privateMemberMsg?._id ? 'bg-blue-600':'bg-gray-800'}`}>
                                <img src={member.profilePic} className="w-8 h-8 mt-1 rounded-full" alt="" />
                                <div className="ps-2 "  key={member?._id}><span className="font-mono">{member.userName}</span><p className="text-xs font-extralight">{member.status}</p></div>
                            </div>
                                
                            }
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar
