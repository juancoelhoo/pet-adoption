import React from 'react';
import './PetAd.css';
import nameimage from '../../public/pet-ad/pet-name.svg';
import breedimage from '../../public/pet-ad/pet-breed.svg';
import ageimage from '../../public/pet-ad/pet-age.svg';
import descimage from '../../public/pet-ad/pet-description.svg';

interface PetAdProps {
  onClick: () => void;
  name: string;
  breed: string;
  age: number;
  description: string;
  photoUrl: string;
}

const PetAd: React.FC<PetAdProps> = ({ onClick, name, breed, age, description, photoUrl }) => {
  return (
    <div className='pet-ad' onClick={onClick}>
      <div className="pet-photo">
        <img src={photoUrl} alt="pet-photo" />
      </div>
      <div className="pet-inf">
        <div className="pet-name">
          <img src={nameimage} alt="" />
          Nome: <span className="pet-info">{name}</span>
        </div>
        <div className="pet-breed">
          <img src={breedimage} alt="" />
          Raça: <span className="pet-info">{breed}</span>

        </div>
        <div className="pet-age">
          <img src={ageimage} alt="" />
          Idade: <span className="pet-info">{age} anos</span>
        </div>
        <div className="pet-description">
          <img src={descimage} alt="" />
          Descrição: <span className="pet-info">{description}</span>
        </div>
      </div>
    </div>
  );
}

export default PetAd;
