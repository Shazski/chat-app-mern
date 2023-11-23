import homeImage from "../../assets/homePageImage.jpg"
function home() {
    return (
        <>
            <div className="flex md:flex-row flex-col justify-start items-center w-full min-h-screen bg-gray-900">
                <div className="w-2/4 ms-16">
                    <h1 className="text-3xl font-bold font-mono text-white">Share the world with your friends</h1>
                    <h4 className="font-semibold font-serif mt-2 text-white">Chat App lets you connect with the world</h4>
                    <div className="flex justify-satrt mt-2 ">
                    <button className="bg-green-700 text-center rounded-md text-xs font-semibold text-white  h-7 w-1/6">Get Started </button>

                    </div>
                </div>
                <div className="md:w-2/4 items-center my-12 me-4">
                    <img src={homeImage} alt="your home page image" />
                </div>
            </div>
        </>
    )
}

export default home
