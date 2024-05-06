import React from 'react';
import './styles.css';
import IMAGE from './teste.jpg';
import Login from './components/Login';  

export const App = () => {
  const handleLogin = (username: string, password: string) => {
    console.log('Login Attempt:', username, password);
    // Aqui você integrará com a API do backend mais tarde
  };

  return (
    <>
      <h1>Pet Adoption - {process.env.NODE_ENV} {process.env.name}</h1>
      <Login onLogin={handleLogin} />  {/* Posicionamento do componente de login */}
      <img src={IMAGE} alt="Teste" width="300" height="400" />
    </>
  );
};
