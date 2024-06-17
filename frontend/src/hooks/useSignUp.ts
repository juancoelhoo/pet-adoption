import { useState } from "react";
import api from "../api/api";

const useSignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage("As senhas não coincidem. Por favor, tente novamente.");
            setSuccessMessage("");
        } else {
            setErrorMessage("");
            try {
                await api.post("/users", {
                    name: name,
                    email: email,
                    password: password
                });
                setSuccessMessage("Cadastro realizado com sucesso!");
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
            } catch (error) {
                setErrorMessage("Erro ao realizar cadastro. Por favor, tente novamente.");
                setSuccessMessage("");
            }
        }
    };

    return {
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        errorMessage,
        successMessage,
        handleSubmit
    };
};

export default useSignUp;
