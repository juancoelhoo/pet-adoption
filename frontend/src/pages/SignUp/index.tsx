import React from "react";
import DescriptionPage from "../../components/DescriptionTemplate";
import "./styles.css";

const signUp = () => {
    return (
    <div className="signup-page">
        <DescriptionPage />
        <div className="signup-section">
            <h2 className="signup-title">CADASTRO</h2>
            <form className="signup-form">
                <label htmlFor="nome">Nome:</label>
                <input type="nome" id="nome" placeholder="Por favor, preencha com seu nome." />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" placeholder="Por favor, preencha com seu email." />
                <label htmlFor="password">Senha:</label>
                <input type="password" id="password" placeholder="Por favor, preencha com sua senha." />
                <label htmlFor="confirma-senha">Confirmar senha:</label>
                <input type="confirma-senha" id="confirma-senha" placeholder="Por favor, confirme sua senha." />
                <button type="submit" className="access-button">Finalizar cadastro</button>
                <div className="signup">
                </div>
            </form>
        </div>
    </div>
    );
}

export default signUp;