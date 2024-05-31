import React from 'react';
import Menu from '../../components/Menu/Menu';
import './Advertisement.css';
import ad from '../../public/advertisement/advertisement.svg';

const Advertisement = () => {
  return (
    <div className="advertisement-container">
      <Menu />
      <div className="ad-screen">
        <img src={ad} alt="ad-logo" />
        Anúncios
      </div>
    </div>
  );
};

export default Advertisement;
