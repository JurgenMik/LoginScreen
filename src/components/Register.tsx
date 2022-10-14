import React from 'react';
import {FaRegUser} from "react-icons/fa";
import {BsKey} from "react-icons/bs";
import {AiOutlineMail} from "react-icons/ai";

function Register() {
    return (
        <div className="sm:w-1/3 w-3/4 h-1/2 ml-auto mr-auto mt-24">
            <div className="w-full flex justify-center">
                <h1 className="text-4xl font-bold">
                    Register
                </h1>
            </div>
            <div className="w-full flex flex-col justify-center items-center pt-4">
                <form className="sm:w-1/2 w-full">
                    <div className="mt-6 border-b border-gray-400">
                        <label className="text-sm font-semibold">
                            Username
                        </label>
                        <div className="flex flex-row items-center">
                            <FaRegUser className="text-gray-400" />
                            <input
                                className="w-full p-3"
                                name="username"
                                placeholder="Type your username"
                            />
                        </div>
                    </div>
                    <div className="mt-4 border-b border-gray-400">
                        <label className="text-sm font-semibold">
                            Password
                        </label>
                        <div className="flex flex-row items-center">
                            <BsKey className="text-gray-400" />
                            <input
                                className="w-full p-3"
                                name="password"
                                placeholder="Type your password"
                            />
                        </div>
                    </div>
                    <div className="mt-6 border-b border-gray-400">
                        <label className="text-sm font-semibold">
                            Email
                        </label>
                        <div className="flex flex-row items-center">
                            <AiOutlineMail className="text-gray-400 text-lg" />
                            <input
                                className="w-full p-3"
                                type="email"
                                name="username"
                                placeholder="Type your email"
                            />
                        </div>
                    </div>
                    <div className="w-full flex flex-col mt-6 text-white">
                        <button className="bg-indigo-800 p-2">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;