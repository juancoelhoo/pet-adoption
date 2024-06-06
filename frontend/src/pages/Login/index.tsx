import React from "react";
import DescriptionPage from "../../components/DescriptionTemplate";
import './styles.css'

const Login = () => {
    return(
        <div className="login-page">
            <DescriptionPage />
            <div className="login-section">
                <h2 className="login-title">LOGIN</h2>
                <form className="login-form">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" placeholder="Por favor, preencha com seu email." />
                    <label htmlFor="password">Senha:</label>
                    <input type="password" id="password" placeholder="Por favor, preencha com sua senha." />
                    <div className="button-group">
                        <button type="submit" className="access-button">Acessar</button>
                        <div className="signup">
                            <a href="/signup">Se cadastrar</a>
                    </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login; 