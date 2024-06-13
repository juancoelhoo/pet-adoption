import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DescriptionPage from "../../components/DescriptionTemplate";
import "./styles.css";

const SignUp: React.FC = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage("As senhas não coincidem. Por favor, tente novamente.");
            setSuccessMessage("");
        } else {
            setErrorMessage("");
            try {
                const response = await axios.post("http://localhost:3333/users", {
                    name: nome,
                    email: email,
                    password: password
                });
                setSuccessMessage("Cadastro realizado com sucesso!");
                setNome("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
            } catch (error) {
                setErrorMessage("Erro ao realizar cadastro. Por favor, tente novamente.");
                setSuccessMessage("");
            }
        }
    };

    const goToLogin = () => {
        navigate("/login");
    };

    return (
        <div className="signup-page">
            <DescriptionPage />
            <div className="signup-section">
                <h2 className="signup-title">CADASTRO</h2>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <label htmlFor="nome">Nome:</label>
                    <input 
                        type="text" 
                        id="nome" 
                        placeholder="Por favor, preencha com seu nome." 
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        placeholder="Por favor, preencha com seu email." 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="password">Senha:</label>
                    <input 
                        type="password" 
                        id="password" 
                        placeholder="Por favor, preencha com sua senha." 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label htmlFor="confirm-password">Confirmar senha:</label>
                    <input 
                        type="password" 
                        id="confirm-password" 
                        placeholder="Por favor, confirme sua senha." 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="access-button">Finalizar cadastro</button>
                    <div className="message">
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                    </div>
                </form>
                <div className="signup-links">
                    <a href="/login">Já tem uma conta? Faça login</a>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
