import React, { useEffect, useState } from 'react';
import Menu from '../../components/Menu/Menu';
import PetAd from '../../components/PetAd/PetAd';
import PedAdPopup from '../../components/PedAd-Popup/PedAd-Popup';
import adSvg from '../../public/advertisement/advertisement.svg';
import './Advertisement.css';
import { api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

interface Ad {
  id: number;
  name: string;
  breed: string;
  age: number;
  description: string;
  photoUrl: string;
}

const AdvertisementPage: React.FC = () => {
  const { token } = useAuth();
  const [ads, setAds] = useState<Ad[]>([]);
  const [popupState, setPopupState] = useState({
    trigger: false,
    name: '',
    breed: '',
    age: 0,
    description: '',
    photoUrl: '',
    id: 0,
  });

  useEffect(() => {
    loadAds();
  }, []);

  async function loadAds() {
    try {
      const response = await api.get("/posts/all", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAds(response.data.body);
    } catch (e) {
      console.log(e);
    }
  }

  const openPopup = (name: string, breed: string, age: number, description: string, photoUrl: string, id: number) => {
    setPopupState({
      trigger: true,
      name,
      breed,
      age,
      description,
      photoUrl,
      id
    });
  };

  const closePopup = () => {
    setPopupState({
      ...popupState,
      trigger: false,
    });
  };

  return (
    <div className="advertisement-container">
      <Menu />
      <div className="ad-screen">
        <div className="page-title">
          <img src={adSvg} alt="ad-logo" />
          <span>An�ncios</span>
        </div>
        <div className="pet-ads">
          {ads.map((ad) => (
            <PetAd
              key={ad.id}
              onClick={() => openPopup(ad.name, ad.breed, ad.age, ad.description, ad.photoUrl, ad.id)}
              name={ad.name}
              breed={ad.breed}
              age={ad.age}
              description={ad.description}
              photoUrl={ad.photoUrl}
            />
          ))}
        </div>
        <PedAdPopup
          trigger={popupState.trigger}
          onClose={closePopup}
          name={popupState.name}
          breed={popupState.breed}
          age={popupState.age}
          description={popupState.description}
          photoUrl={popupState.photoUrl}
          id={popupState.id}
        />
      </div>
    </div>
  );
};

export default AdvertisementPage;
