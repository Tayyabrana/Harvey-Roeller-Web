import logo from './logo.svg';
import './App.css';
import Earth from "./pages/Earth";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/earth" element={<Earth/>}/>

            </Routes>
        </BrowserRouter>
    );
}

export default App;
