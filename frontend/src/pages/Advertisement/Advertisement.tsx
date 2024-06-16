import React, { useState } from 'react';
import Menu from '../../components/Menu/Menu';
import PetAd from '../../components/PetAd/PetAd';
import PedAdPopup from '../../components/PedAd-Popup/PedAd-Popup';

import './Advertisement.css';
import ad from '../../public/advertisement/advertisement.svg';

const AdvertisementScreen: React.FC = () => {
  const [popupState, setPopupState] = useState({
    trigger: false,
    name: '',
    breed: '',
    age: 0,
    description: '',
  });

  const openPopup = (name: string, breed: string, age: number, description: string) => {
    setPopupState({
      trigger: true,
      name,
      breed,
      age,
      description
    });
  };

  const closePopup = () => {
    setPopupState({
      ...popupState,
      trigger: false
    });
  };

  return (
    <div className="advertisement-container">
      <Menu />
      <div className="ad-screen">
        <div className="post-title">
          <img src={ad} alt="ad-logo" />
          Anúncios
        </div>
        <div className="pet-ads">
          <PetAd
            onClick={(name, breed, age, description) => openPopup(name, breed, age, description)}
            name="biscoito"
            breed="Pastor alemao"
            age={2}
            description="Lorem ipsum dolor sit amet"
          />
          <PetAd
            onClick={(name, breed, age, description) => openPopup(name, breed, age, description)}
            name="leao"
            breed="poodle"
            age={4}
            description="Lorem ipsum dolor sit amet"
          />
          <PetAd
            onClick={(name, breed, age, description) => openPopup(name, breed, age, description)}
            name="bolo"
            breed="pincher"
            age={4}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut."
          />
          <PedAdPopup
            trigger={popupState.trigger}
            onClose={closePopup}
            name={popupState.name}
            breed={popupState.breed}
            age={popupState.age}
            description={popupState.description}
          />
        </div>
      </div>
    </div>
  );
};

export default AdvertisementScreen;
