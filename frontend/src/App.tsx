import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdvertisementScreen from "./pages/Advertisement/Advertisement";

import './global.css';

export const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AdvertisementScreen/>} />
                </Routes>
            </BrowserRouter>
        </>
    );
}
