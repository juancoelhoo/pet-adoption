import { useState } from 'react';

import dropdown from '../../public/dropdown/dropdown.svg';
import dogimage from '../../public/pet-ad/pet-ad.svg';
import nameimage from '../../public/pet-ad/pet-name.svg';
import breedimage from '../../public/pet-ad/pet-breed.svg';
import ageimage from '../../public/pet-ad/pet-age.svg';
import descimage from '../../public/pet-ad/pet-description.svg';
import edit from '../../public/dropdown/edit.svg';
import report from '../../public/dropdown/report.svg';
import remove from '../../public/dropdown/remove.svg';

import './ProfileAd.css';
import { api } from '../../services/api';

interface ProfileAdProps {
  id: number;
  name: string;
  photoUrl: string;
  showButton?: boolean;
}

const ProfileAd: React.FC<ProfileAdProps> = ({ id, name, photoUrl, showButton }) =>{
  const [dropdownVisible, setDropdownVisible] = useState(false);
  

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  async function deletePost() {
    await api.delete(`/posts/${id}`);
    window.location.reload();
  }

  return (
    <div className='profile-ad'>
     {showButton !== false && (
  <button className='dropdown-btn' onClick={toggleDropdown}>
    <img src={dropdown} alt="dropdown-menu" />
  </button>
)}

{dropdownVisible && showButton !== false && (
  <div className='dropdown-menu'>
    <ul>
      <li onClick={deletePost}>
        Excluir
        <img src={remove} alt="" />
      </li>
    </ul>
  </div>
)}
      
      <div className='profileadphoto'>
      <img src={photoUrl} alt="pet-photo"/>
      </div>
      <div className="profile-pet-inf">
        <div className="line"></div>
        <div className="pet-name">
          <span className="profile-pet-info">{name}</span>
        </div>
      </div>  
    </div>
  );
}

export default ProfileAd;
