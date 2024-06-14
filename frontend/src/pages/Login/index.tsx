import React from "react";
import DescriptionPage from "../../components/DescriptionTemplate";
import useLogin from "../../hooks/useLogin";
import './styles.css';

const Login: React.FC = () => {
    const { email, setEmail, password, setPassword, errorMessage, handleSubmit } = useLogin();

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
