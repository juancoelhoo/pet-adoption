import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdvertisementScreen from "./pages/Advertisement/Advertisement";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ComplaintsPage from "./pages/Complaints";

import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

import './global.css';
import ProfileScreen from './pages/Profile/Profile';
import ProfileId from './pages/ProfileId/ProfileId'

export const App = () => {
    return (
        <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<PublicRoute element={<Login />} />} />
                        <Route path="/signup" element={<PublicRoute element={<SignUp />} />} />
                        <Route path="/posts" element={<PrivateRoute element={<AdvertisementScreen />} />} />
                        <Route path="/complaints" element={<PrivateRoute element={<ComplaintsPage />} />} />
                        <Route path="/profile" element={<PrivateRoute element={<ProfileScreen />} />} />
                        <Route path="/profile/:id" element={<PrivateRoute element={<ProfileId />} />} />
                    </Routes>
                </BrowserRouter>
        </AuthProvider>
    );
}
