import { BrowserRouter, Routes, Route } from "react-router-dom";

import Template from "./pages/Template";

import './global.css';

export const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Template/>} />
                </Routes>
            </BrowserRouter>
        </>
    );
}
