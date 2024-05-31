import { BrowserRouter, Routes, Route } from "react-router-dom";

import Advertisement from "./pages/Advertisement/Advertisement";

import './global.css';

export const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Advertisement/>} />
                </Routes>
            </BrowserRouter>
        </>
    );
}
