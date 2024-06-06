import React from 'react';
import "./Menu.css";

import logo from '../../public/logo.svg';
import ads from '../../public/menu/advertisement.svg';
import report from '../../public/menu/report.svg';
import search from '../../public/menu/search.svg';
import logout from '../../public/menu/logout.svg';
import profile from '../../public/menu/profile.svg';
import config from "../../public/menu/config.svg";

const Menu = () => {
  return (
    <div className='bar'>
        <div className="itens">
            <div className="title_logo">
                <img className='logo' src={logo} alt="logo" />
                <h1 className='title'>Pet Adopt</h1>
            </div>
            <div className="menu">
                Menu
                <div className="menu-items">
                    <div className="ads">
                        <img src={ads} alt="ads-logo" />
                        <a href="/">Anúncios</a>
                    </div>
                    <div className="search">
                        <img src={search} alt="search-logo" />
                        <a href="/">Pesquisar</a>
                    </div>
                    <div className="reports">
                        <img src={report} alt="" />
                        <a href="/">Denúncia</a>
                    </div>
                </div>
                <div className="options">
                Opções
                    <div className="log-out">
                        <img src={logout} alt="logout-image"/>
                        <a href="/">Desconectar</a>
                    </div>
                </div>
                <div className="profile-access">
                    <img src={profile} alt="profile-photo" />
                    name
                    <img className='config' src={config} alt="" />
                </div>
            </div>
        </div>
    </div>
  );
};

export default Menu;
