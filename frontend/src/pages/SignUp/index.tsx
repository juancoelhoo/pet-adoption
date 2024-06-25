import React from "react";
import DescriptionPage from "../../components/DescriptionTemplate";
import useSignUp from "../../hooks/useSignUp";
import "./styles.css";
import { Link } from "react-router-dom";

const SignUp: React.FC = () => {
    const {
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
    } = useSignUp();

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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}"
                        title="A senha deve possuir entre 8 e 16 caracteres, pelo menos uma letra maiúscula, uma letra minúscula, um dígito e um caractere especial (@, $, !, %, *, ?, &)"
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
                        {errorMessage && <p style={{ color: 'red', fontFamily: 'Quicksand' }}>{errorMessage}</p>}
                        {successMessage && <p style={{ color: 'green', fontFamily: 'Quicksand' }}>{successMessage}</p>}
                    </div>
                </form>
                <div className="signup-links">
                    <Link to="/">Já tem uma conta? Faça login</Link>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
