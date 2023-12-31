import { Link, useNavigate } from 'react-router-dom';
import homeImage from "../../assets/friendspng.png"
import chatLogo from "../../assets/chatLogo.png"
import profile from "../../assets/profilepic.jpg"
import { IoIosAdd } from "react-icons/io";
import { useSignupUserMutation } from '../../services/appApi';
import { useRef, useState, ChangeEvent, FormEvent, FC } from 'react';
import { SignUpFormTypes } from '../../types/types'
const Signup: FC = () => {
    const navigate = useNavigate()
    const passwordRef = useRef<HTMLInputElement>(null)
    const confirmPassowrdRef = useRef<HTMLInputElement>(null)
    const profileRef = useRef<HTMLInputElement>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [loadings, setLoadings] = useState<boolean>(false)
    const [passwordError, setPasswordError] = useState<string>("")
    const [signUpUser, { isLoading }] = useSignupUserMutation()
    const [formData, setFormData] = useState<SignUpFormTypes>({
        userName: "",
        email: "",
        password: "",
        profilePic: "",
    })
    const handleFileUpload: () => void = () => {
        profileRef.current?.click()
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget
        const file: any = event.target.files
        if (name === 'profilePic' && file) {
            setImagePreview(URL.createObjectURL(file[0]))
            setFormData({
                ...formData,
                [name]: file[0],
            })
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    }

    const imageUpload = async (image: File) => {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'drtyu0yv');
        try {
            let res = await fetch('https://api.cloudinary.com/v1_1/dvjggxcc1/image/upload', {
                method: 'post',
                body: formData,
            })
            const urlData = await res.json()
            setLoadings(false)
            return urlData.url
        } catch (err) {
            setLoadings(false)
            console.error(err)
        }
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (passwordRef.current?.value !== confirmPassowrdRef.current?.value) {
            setFormData({
                userName: "",
                email: "",
                password: "",
                confirmPassword: "",
                profilePic: ""
            })
            setPasswordError('Passwords do not match');
            setImagePreview(null)
        } else {
            let userName = formData.userName
            let email = formData.email
            let password = formData.password
            setLoadings(true)
            const profilePic = await imageUpload(formData.profilePic)
            setPasswordError("")
            setImagePreview(null)
            signUpUser({
                userName, email, profilePic, password
            }).then(({ data }: any) => {
                if (data) {
                    navigate('/chat')
                } else {
                    navigate('/signup')
                }
            })
            setFormData({
                userName: "",
                email: "",
                password: "",
                confirmPassword: "",
                profilePic: ""
            })
        }

    }
    return (
        <div >

            <div className="flex min-h-full flex-1 items-center  px-6 py-12 lg:px-8 bg-gray-900">
                <div className='w-full'>

                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            className="mx-auto h-10 w-auto"
                            src={chatLogo}
                            alt="Your Company"
                        />
                        <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                            Chat APP
                        </h2>
                        <h2 className="mt-3 text-center text-xl font-semibold leading-9 tracking-tight text-white">
                            Sign Up to your account
                        </h2>

                    </div>
                    <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
                        {passwordError && <p className='text-red-600 text-center'>{passwordError}</p>}
                        <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                            <div className='flex justify-center relative hover:cursor-pointer' onClick={handleFileUpload}>
                                <input className='hidden' type="file" ref={profileRef} name="profilePic" id="profilePic" accept='image/png, image/jpeg' required onChange={handleChange} />
                                <img src={imagePreview || profile} alt="" className='rounded-full w-1/6 h-1/6 text-center relative' />
                                <IoIosAdd size={20} style={{ color: 'white', position: "absolute", top: 50, left: 200 }} className="rounded-full bg-green-700 hover:cursor-pointer" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                    User Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="userName"
                                        name="userName"
                                        type="text"
                                        required
                                        className="block w-full rounded-md ps-2 outline-none border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={handleChange}
                                        value={formData?.userName}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData?.email}
                                        required
                                        className="block w-full rounded-md outline-none border-0 py-1.5 ps-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                        Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        ref={passwordRef}
                                        id="password"
                                        value={formData?.password}
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md outline-none border-0 py-1.5 ps-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm  font-medium leading-6 text-white">
                                        Confirm  Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        ref={confirmPassowrdRef}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        value={formData?.confirmPassword}
                                        autoComplete="confirm-password"
                                        required
                                        className="block w-full rounded-md border-0 outline-none py-1.5 ps-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    {isLoading || loadings ? "loading..." : "Sign Up"}
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Already have an account?{' '}
                            <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Sign In
                            </Link>
                        </p>
                    </div>

                </div>
                <div className='w-3/4 hidden  md:flex justify-center'>
                    <img src={homeImage} alt="chatLogo" />
                </div>
            </div>
        </div>
    )
}
export default Signup