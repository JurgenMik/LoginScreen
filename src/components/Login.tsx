import React, {useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {FaRegUser} from 'react-icons/fa';
import {BsKey} from 'react-icons/bs';
import {LoginInterface} from '../Interfaces/LoginInterface';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const location = useLocation();

    const [login, setLogin] = useState<LoginInterface>({
        username: location.state === null ? '' : location.state.username,
        password: '',
        usernameError: '',
        passwordError: '',
        auth: false,
    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setLogin({...login, [e.target.name] : e.target.value});
    }

    const validate = () => {
        let usernameError = "";
        let passwordError = "";

        if (!login.username) {
            usernameError = 'Username cannot be empty';
        }
        if (!login.password) {
            passwordError = 'Password cannot be empty'
        }

        if (passwordError) {
            setLogin({...login, passwordError : passwordError});
            return false;
        }

        if (usernameError) {
            setLogin({...login, usernameError : usernameError});
            return false;
        }
        return true;
    }

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid : boolean = validate();
        if (isValid) {
            axios.post<LoginInterface>("http://localhost:3002/login",
                {
                    username: login.username,
                    password: login.password
                }
                ).then(response => {
                    if (response.data.auth) {
                        navigate('/profile', {state: login});
                    }
            }).catch(error => {
                    console.log(error);
                })
            setLogin({...login, username : '', password : '',
                usernameError : '', passwordError : ''});
        }
    }

    return (
        <div className="sm:w-1/3 w-3/4 h-1/2 ml-auto mr-auto mt-24">
            <div className="w-full flex justify-center">
                <h1 className="text-4xl font-bold">
                    Login
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
                                value={login.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="text-red-600">
                            {login.usernameError}
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
                                value={login.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="text-red-600">
                            {login.passwordError}
                        </div>
                    </div>
                    <div className="w-full flex flex-col mt-6 text-white">
                        <button type="submit" className="bg-indigo-800 p-2">
                            Login
                        </button>
                        <Link to="/register" className="bg-indigo-800 p-2 text-center mt-6">
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;