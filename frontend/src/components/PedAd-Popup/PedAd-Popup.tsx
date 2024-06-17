import React from 'react';
import './PedAd-Popup.css';
import close from '../../public/pet-ad/close-btn.svg';
import contato from '../../public/pet-ad/whatsapp.svg';
import profile from '../../public/menu/profile.svg';
import profileAccess from '../../public/pet-ad/profile-access.svg'; // Assuming this is the correct import for profileAccess

interface PedAdPopupProps {
  trigger: boolean;
  onClose: () => void;
  name: string;
  breed: string;
  age: number;
  description: string;
}

const PedAdPopup: React.FC<PedAdPopupProps> = ({ trigger, onClose, name, breed, age, description }) => {
  return trigger ? (
    <div className='popup-overlay'>
      <div className='popup'>
        <div className='popup-content'>
          <button className='close-btn' onClick={onClose}>
            <img src={close} alt="close button" />
          </button>
          <h2>{name}</h2>
          <p><strong>Raça:</strong> {breed}</p>
          <p><strong>Idade:</strong> {age} anos</p>
          <p><strong>Descrição:</strong> {description}</p>
          <div className="profile">
            <div className="profile-user">
            <img src={profile} alt="profile-photo" />
            <span>Stephanie</span>
            </div>
            <img src={profileAccess} alt="profile-access" className="profile-access" />
          </div>
          <button className='contact'>
            Converse com o Dono
            <img src={contato} alt="whatsapp-image" className='btn-image'/>
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default PedAdPopup;
