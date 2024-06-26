import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { api } from '../services/api';
import { User } from '../domain/entities/User';

interface AuthContextProps {
    isLoading: boolean;
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    setToken: (value: string) => void;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    token: string;
    loggedUser: User | null;
    loadLoggedUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [loggedUser, setLoggedUser] = useState<User | null>(null);
    const [token, setToken] = useState<string>("");
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = document.cookie.split('; ').find(row => row.startsWith('jwt='));

        if (token) {
            setToken(token);
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        loadLoggedUser();
    }, [token]);

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post("http://localhost:3333/users/login", {
                email,
                password
            });
            document.cookie = `jwt=${response.data.token}; path=/;`;
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Failed to login", error);
        }
    };

    const logout = () => {
        document.cookie = 'jwt=; Max-Age=0; path=/;';
        setIsAuthenticated(false);
    };

    async function loadLoggedUser() {
        try {
            const res = await api.get("/users/loggedUser");
            console.log(res.data.user);
            
            setLoggedUser(res.data.user);

            if (res.data.user.id) {
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error("Error fetching logged user", error);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, setIsAuthenticated, token, loggedUser, setToken, isLoading, loadLoggedUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
