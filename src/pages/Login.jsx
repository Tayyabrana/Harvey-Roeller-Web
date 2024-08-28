import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import icon from "../assets/login_icon.png"
import authentication from "../api/authentication";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('Unexpected error occurred!');

    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            let u = sessionStorage.getItem("USER");
            if (u) {
                navigate('/home', { replace: true })
            }
        };
        getData();
    }, []);

    const handleLogin = async () => {
        setError(false);
        if (email.length >= 1 && password.length >= 1) {
            try {
                const res = await authentication.login({ email, password });
                sessionStorage.setItem('LOGGED', 'YES');
                sessionStorage.setItem('USER', JSON.stringify(res.user));
                navigate('/home', {replace: true});
            } catch (e) {
                setError(true);
                setErrorMessage('Email or Password is Incorrect!');
            }
        } else {
            setError(true);
            setErrorMessage('Please Enter the Email and Password');
        }
    };

    return (
        <div className="min-h-screen bg-orange-500 flex flex-col justify-center items-center p-6">
            <div className="flex flex-col items-center">
                <h1 className="text-white text-3xl font-bold mb-4">Welcome Back!</h1>
                <img
                    src={icon}
                    alt="Login Icon"
                    className="h-32 mb-8"
                />
            </div>
            {error && (
                <div className="bg-red-700 text-white py-2 px-4 rounded mb-4">
                    {errorMessage}
                </div>
            )}
            <div className="w-full max-w-md">
                <input
                    type="email"
                    className="w-full p-3 mb-4 border rounded shadow"
                    placeholder="Enter Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="w-full p-3 mb-4 border rounded shadow"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-200"
                    onClick={handleLogin}
                >
                    Log In
                </button>
            </div>
            <div className="mt-4 text-white flex items-center">
                <span>Don't have an account?</span>
                <button
                    className="ml-2 text-black font-bold hover:underline"
                    onClick={() =>navigate('/signup', {replace: true})}
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default Login;
