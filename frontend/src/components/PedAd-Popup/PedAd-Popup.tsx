import React, { useState } from 'react';
import './PedAd-Popup.css';
import close from '../../public/pet-ad/close-btn.svg';
import contato from '../../public/pet-ad/whatsapp.svg';
import profile from '../../public/menu/profile.svg';
import profileAccess from '../../public/pet-ad/profile-access.svg';
import dropdown from '../../public/dropdown/dropdown.svg';
import edit from '../../public/dropdown/edit.svg';
import report from '../../public/dropdown/report.svg';
import remove from '../../public/dropdown/remove.svg';

interface PedAdPopupProps {
  trigger: boolean;
  onClose: () => void;
  name: string;
  breed: string;
  age: number;
  description: string;
}

const PedAdPopup: React.FC<PedAdPopupProps> = ({ trigger, onClose, name, breed, age, description }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return trigger ? (
    <div className='popup-overlay'>
      <div className='popup'>
        <div className='popup-content'>
          <button className='close-btn' onClick={onClose}>
            <img src={close} alt="close button" />
          </button>
          <button className='dropdown-btn' onClick={toggleDropdown}>
            <img src={dropdown} alt="dropdown-menu" />
          </button>
          {dropdownVisible && (
            <div className='dropdown-menu'>
              <ul>
                <li>Editar
                  <img src={edit} alt="" />
                </li>
                <li>Denunciar
                  <img src={report} alt="" />
                </li>
                <li>Excluir
                  <img src={remove} alt="" />
                </li>
              </ul>
            </div>
          )}
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
            <img src={contato} alt="whatsapp-image" className='btn-image' />
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default PedAdPopup;
