import React, { useState } from "react";
import axios from "axios";
import DescriptionPage from "../../components/DescriptionTemplate";
import './styles.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3333/users/login", {
                email: email,
                password: password
            });
            // Sucesso no login
            document.cookie = `jwt=${response.data.token}; path=/;`;
            window.location.href = "/"; // Redirecionar para a página inicial após o login
        } catch (error) {
            setErrorMessage("Email ou senha inválidos. Por favor, tente novamente.");
        }
    };

    return (
        <div className="login-page">
            <DescriptionPage />
            <div className="login-section">
                <h2 className="login-title">LOGIN</h2>
                <form className="login-form" onSubmit={handleSubmit}>
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
                    <div className="button-group">
                        <button type="submit" className="access-button">Acessar</button>
                        <div className="signup">
                            <a href="/signup">Se cadastrar</a>
                        </div>
                    </div>
                    {errorMessage && <p style={{ color: 'red', fontFamily: 'Quicksand' }}>{errorMessage}</p>}
                </form>
            </div>
        </div>
    );
}

export default Login;
