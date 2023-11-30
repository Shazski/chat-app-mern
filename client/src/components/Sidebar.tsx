import { AppContext } from "../context/appContext"
import { useContext } from 'react'
function Sidebar() {
    const rooms = ['first room', 'second room', 'third room']
    const { socket } = useContext(AppContext)
    socket.off('new-user').on('new-user', (payload) => {
        console.log(payload);
    })
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar
