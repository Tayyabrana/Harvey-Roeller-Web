import React, {useEffect, useState} from 'react';
import authentication from "../api/authentication";
import {useNavigate} from "react-router-dom";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setConfirmPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Unexpected error occurred!");

    const navigate = useNavigate()

    useEffect(() => {
        const getData = async () => {
            let u = sessionStorage.getItem("USER");
            if (u) {
                navigate('/home', { replace: true })
            }
        };
        getData();
    }, []);

    const register = async () => {
        setError(false);
        if (name.length >= 1) {
            if (email.length >= 1) {
                if (password.length >= 1) {
                    if (passwordConfirmation.length >= 1) {
                        try {
                            await authentication.signup({ user: { name, email, password, password_confirmation: passwordConfirmation } });
                            navigate('/', {replace: true});
                        } catch (e) {
                            setError(true);
                            setErrorMessage(e.errors[0]);
                        }
                    } else {
                        setError(true);
                        setErrorMessage("Please Re-Enter the Password");
                    }
                } else {
                    setError(true);
                    setErrorMessage("Please Enter the Password");
                }
            } else {
                setError(true);
                setErrorMessage("Please Enter the Email");
            }
        } else {
            setError(true);
            setErrorMessage("Please Enter the Name");
        }
    };

    return (
        <div className="min-h-screen bg-orange-500 flex flex-col justify-center items-center px-8 py-6">
            <div className="flex flex-col items-center">
                <h1 className="text-black text-3xl font-bold mb-4">Welcome!</h1>
            </div>
            {error && (
                <div className="bg-red-700 text-white py-2 px-4 rounded mb-4">
                    {errorMessage}
                </div>
            )}
            <div className="w-full max-w-md">
                <input
                    type="text"
                    className="w-full p-3 mb-4 border rounded shadow"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    className="w-full p-3 mb-4 border rounded shadow"
                    placeholder="Enter Your Email"
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
                <input
                    type="password"
                    className="w-full p-3 mb-4 border rounded shadow"
                    placeholder="Confirm Password"
                    value={passwordConfirmation}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                    className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-200"
                    onClick={register}
                >
                    Register
                </button>
            </div>
            <div className="mt-4 text-white flex items-center">
                <span>Already have an account?</span>
                <button
                    className="ml-2 text-black font-bold hover:underline"
                    onClick={() => navigate('/', {replace: true})}
                >
                    Sign in
                </button>
            </div>
        </div>
    );
};

export default SignUp;
