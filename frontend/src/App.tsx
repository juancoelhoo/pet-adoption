import { BrowserRouter, Routes, Route } from "react-router-dom";


import AdvertisementScreen from "./pages/Advertisement/Advertisement";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Posts from "./pages/Posts";


import './global.css';

export const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>} />
                    <Route path ="/signup" element= {<SignUp/>} />
                    {/*<Route path="/posts" element={<Posts/>} />*/}
                    <Route path="/posts" element={<AdvertisementScreen/>} />
                </Routes>
            </BrowserRouter>
        </>
    );
}
