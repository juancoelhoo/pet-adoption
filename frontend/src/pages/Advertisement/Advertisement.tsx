import React from 'react';
import Menu from '../../components/Menu/Menu';
import './Advertisement.css';
import ad from '../../public/advertisement/advertisement.svg';

const AdvertisementScreen = () => {
  return (
    <div className="advertisement-container">
      <Menu />
      <div className="ad-screen">
        <img src={ad} alt="ad-logo" />
        Anúncios
        <div className="teste">
        </div>
      </div>
    </div>
  );
};

export default AdvertisementScreen;
