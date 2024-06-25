import React from 'react';
import { Link } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';

import logo from '../../public/logo.svg';
import ads from '../../public/menu/advertisement.svg';
import report from '../../public/menu/report.svg';
import search from '../../public/menu/search.svg';
import logoutImg from '../../public/menu/logout.svg';
import config from "../../public/menu/config.svg";

import "./Menu.css";

const Menu = () => {
    const { logout, loggedUser } = useAuth();

  return (
    <div className='bar'>     
        <div className="menu">
            <div className="title_logo">
                <img className='logo' src={logo} alt="logo" />
                <h1 className='title'>Pet Adopt</h1>
            </div>
            <div className="buttons">
                <div className="menu-items">
                    Menu
                    <div className="ads">
                        <img src={ads} alt="ads-logo" />
                        <Link to="/posts">Anúncios</Link>
                    </div>
                    <div className="search">
                        <img src={search} alt="search-logo" />
                        <Link to="#">Pesquisar</Link>
                    </div>
                    {loggedUser?.permissions == 1 /*isAdmin*/ && (
                        <div className="reports">
                            <img src={report} alt="" />
                            <Link to="/complaints">Denúncias</Link>
                        </div>
                    )}
                </div>
                <div className="options">
                Opções
                    <div className="log-out">
                        <img src={logoutImg} alt="logout-image"/>
                        <button onClick={logout}>Desconectar</button>
                    </div>
                </div>
            </div>
            <div className="profile-access">
                <div>
                    <img src={loggedUser?.profilePhoto} alt="profile-photo" />
                    <p>{loggedUser?.name}</p>
                </div>
                <Link to="/profile"><img className='config' src={config} alt=""/></Link>
            </div>
        </div>
    </div>
  );
};

export default Menu;
