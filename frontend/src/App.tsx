import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdvertisementScreen from "./pages/Advertisement/Advertisement";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Posts from "./pages/Posts";

import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './hoc/PrivateRoute';
import PublicRoute from './hoc/PublicRoute';


import './global.css';

export const App = () => {
    return (
        <>
        <AuthProvider>
                <BrowserRouter>
                    <Routes>
                    <Route path="/login" element={<PublicRoute element={<Login />} />} />
                    <Route path="/signup" element={<PublicRoute element={<SignUp />} />} />
                    {/*<Route path="/posts" element={<Posts/>} />*/}
                    <Route path="/posts" element={<PrivateRoute element={<AdvertisementScreen />} />} />
                    </Routes>
                </BrowserRouter>
        </AuthProvider>
        </>
    );
}
