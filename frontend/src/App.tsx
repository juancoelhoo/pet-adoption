import { BrowserRouter, Routes, Route } from "react-router-dom";

import Template from "./pages/Template";
import Login from "./pages/Login";
import Posts from "./pages/Posts";

import './global.css';

export const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>} />
                    <Route path="/" element={<Template/>} />
                    <Route path="/posts" element={<Posts/>} />
                </Routes>
            </BrowserRouter>
        </>
    );
}
