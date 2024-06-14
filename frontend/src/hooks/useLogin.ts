import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3333/users/login", {
                email: email,
                password: password
            });
            document.cookie = `jwt=${response.data.token}; path=/;`;
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
