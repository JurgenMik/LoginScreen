import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {FaRegUser} from "react-icons/fa";
import {BsKey} from "react-icons/bs";
import {AiOutlineMail} from "react-icons/ai";
import {RegisterInterface} from "../Interfaces/RegisterInterface";

function Register() {
    const navigate = useNavigate();

    const [register, setRegister] = useState<RegisterInterface>({
        username: '',
        email: '',
        password: '',
        usernameError: '',
        emailError: '',
        passwordError: '',
    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setRegister({...register, [e.target.name] : e.target.value});
    }

    const validate = () => {
        let emailError = "";
        let usernameError = "";
        let passwordError = "";

        if (register.password.length <= 6) {
            passwordError = 'Password should be longer than 6 characters';
        }

        if (!register.username) {
            usernameError = 'name cannot be empty';
        }

        if (!register.email.includes('@')) {
            emailError = 'invalid Email';
        }

        if (emailError) {
            setRegister({...register, emailError : emailError});
            return false;
        }

        if (usernameError) {
            setRegister({...register, usernameError : usernameError});
            return false;
        }

        if (passwordError) {
            setRegister({...register, passwordError: passwordError});
            return false;
        }
        return true;
    }

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid : boolean = validate();
        if (isValid) {
            axios.post<RegisterInterface>("http://localhost:3002/signup",
                {
                    username: register.username,
                    password: register.password,
                    email: register.email
                }
            ).then(response => {
                navigate('/', { state: {...response.data} });
            })
            setRegister({...register, username : '', email : '', password : '', passwordError : '',
                emailError : '', usernameError : ''});
        }
    }

    return (
        <div className="sm:w-1/3 w-3/4 h-1/2 ml-auto mr-auto mt-24">
            <div className="w-full flex justify-center">
                <h1 className="text-4xl font-bold">
                    Register
                </h1>
            </div>
            <div className="w-full flex flex-col justify-center items-center pt-4">
                <form onSubmit={handleSubmit} className="sm:w-1/2 w-full">
                    <div className="mt-6 border-b border-gray-400">
                        <label className="text-sm font-semibold">
                            Username
                        </label>
                        <div className="flex flex-row items-center">
                            <FaRegUser className="text-gray-400" />
                            <input
                                className="w-full p-3"
                                type="text"
                                name="username"
                                placeholder="Type your username"
                                value={register.username}
                                onChange={handleChange}
                            />
                            <div className="text-red-600">
                                {register.usernameError}
                            </div>
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
                                type="password"
                                name="password"
                                placeholder="Type your password"
                                value={register.password}
                                onChange={handleChange}
                            />
                            <div className="text-red-600">
                                {register.passwordError}
                            </div>
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
                                name="email"
                                placeholder="Type your email"
                                value={register.email}
                                onChange={handleChange}
                            />
                            <div className="text-red-600">
                                {register.emailError}
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col mt-6 text-white">
                        <button type="submit" className="bg-indigo-800 p-2">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;