import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from '../contexts/AuthContext';

const useLogin = () => {
    const { setIsAuthenticated, setToken } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await api.post("/users/login", {
                email: email,
                password: password
            });
            document.cookie = `jwt=${response.data.token}; Max-Age=10000000; path=/;`;
            setToken(response.data.token);
            setIsAuthenticated(true);
            navigate("/posts");
        } catch (error) {
            setErrorMessage("Email ou senha inválidos. Por favor, tente novamente.");
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        errorMessage,
        handleSubmit
    };
};

export default useLogin;
