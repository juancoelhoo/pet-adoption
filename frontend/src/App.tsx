import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Posts from "./pages/Posts";

import './global.css';

export const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>} />
                    <Route path="/posts" element={<Posts/>} />
                </Routes>
            </BrowserRouter>
        </>
    );
}
