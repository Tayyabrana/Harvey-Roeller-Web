import React, { useEffect, useState } from 'react';
import {replace, useNavigate} from "react-router-dom";
import bg from "../assets/bg.jpg"

const Home = () => {

    const [user, setUser] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            let u = sessionStorage.getItem("USER");
            if (u) {
                setUser(JSON.parse(u));
            } else {
                navigate('/', { replace: true })
            }
        };
        getData();
    }, []);

    return (
        <div className="flex flex-col items-center w-full h-screen bg-cover" style={{ backgroundImage: `url(${bg})` }}>
            <h1 className="text-white mt-10 font-extrabold text-xl sm:text-2xl md:text-3xl">
                Welcome Back {user?.name}!
            </h1>
            <button
                className="bg-white px-6 py-4 rounded-full mt-40 sm:mt-60 md:mt-72 text-black font-bold text-lg hover:bg-gray-200 transition"
                onClick={() => navigate("/earth")}
            >
                Show Globe
            </button>
        </div>
    );
};

export default Home;
