import './ProfileAd.css';
import dogimage from '../../public/pet-ad/pet-ad.svg';
import nameimage from '../../public/pet-ad/pet-name.svg';
import breedimage from '../../public/pet-ad/pet-breed.svg';
import ageimage from '../../public/pet-ad/pet-age.svg';
import descimage from '../../public/pet-ad/pet-description.svg';
import dropdown from '../../public/dropdown/dropdown.svg';
import edit from '../../public/dropdown/edit.svg';
import report from '../../public/dropdown/report.svg';
import remove from '../../public/dropdown/remove.svg';
import { useState } from 'react';

function ProfileAd() {

  const [dropdownVisible, setDropdownVisible] = useState(false);

const toggleDropdown = () => {
  setDropdownVisible(!dropdownVisible);
};

  return (
    <div className='profile-ad'>
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
      <img src={dogimage} alt="pet-photo" />
      <div className="profile-pet-inf">
        <div className="line"></div>
        <div className="pet-name">
          <span className="profile-pet-info">caramelo</span>
        </div>
      </div>  
    </div>
  );
}

export default ProfileAd;
