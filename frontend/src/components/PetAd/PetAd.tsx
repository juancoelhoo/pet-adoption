import React, { useState, useEffect } from 'react';
import './PetAd.css';
import dogimage from '../../public/pet-ad/pet-ad.svg';
import nameimage from '../../public/pet-ad/pet-name.svg';
import breedimage from '../../public/pet-ad/pet-breed.svg';
import ageimage from '../../public/pet-ad/pet-age.svg';
import descimage from '../../public/pet-ad/pet-description.svg';
import likeimage from '../../public/pet-ad/like.svg'; 

interface PetAdProps {
  onClick: (name: string, breed: string, age: number, description: string) => void;
  name: string;
  breed: string;
  age: number;
  description: string;
}

const PetAd: React.FC<PetAdProps> = ({ onClick, name, breed, age, description}) => {
  return (
    <div className='pet-ad' onClick={() => onClick(name, breed, age, description)}>
      <img src={dogimage} alt="pet-photo" />
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
        <div className="pet-likes">
          <button onClick={() => {} /*handleLike*/}>
            <img src={likeimage} alt="Curtir" className="like-icon" />
          </button>
          <span>{/*likes*/} curtidas</span>
        </div>
      </div>
    </div>
  );
}

export default PetAd;
