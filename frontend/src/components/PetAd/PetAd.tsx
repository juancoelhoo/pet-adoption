import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import './PetAd.css';
import dogimage from '../../public/pet-ad/pet-ad.svg';
import nameimage from '../../public/pet-ad/pet-name.svg';
import breedimage from '../../public/pet-ad/pet-breed.svg';
import ageimage from '../../public/pet-ad/pet-age.svg';
import descimage from '../../public/pet-ad/pet-description.svg';
import likeimage from '../../public/pet-ad/like.svg'; 

function PetAd() {
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    api.get('/reactions')
      .then(response => {
        setLikes(response.data.likes);
      })
      .catch(error => {
        console.error('Error fetching likes:', error);
      });
  }, []);

  const handleLike = async () => {
    try {
      const response = await api.post('/reactions/toggleLike', {
        userId: 1, 
        postId: 1  
      });
      setLikes(response.data.likes);
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };
  

  return (
    <div className='pet-ad'>
      <img src={dogimage} alt="pet-photo" />
      <div className="pet-inf">
        <div className="pet-name">
          <img src={nameimage} alt="" />
          Nome: <span className="pet-info">Caramelo</span>
        </div>
        <div className="pet-breed">
          <img src={breedimage} alt="" />
          Raça: <span className="pet-info">Pastor Alemão</span>
        </div>
        <div className="pet-age">
          <img src={ageimage} alt="" />
          Idade: <span className="pet-info">2 anos</span>
        </div>
        <div className="pet-description">
          <img src={descimage} alt="" />
          Descrição: <span className="pet-info">Lorem, ipsum dolor sit amet</span>
        </div>
        <div className="pet-likes">
          <button onClick={handleLike}>
            <img src={likeimage} alt="Curtir" className="like-icon" />
          </button>
          <span>{likes} curtidas</span>
        </div>
      </div>
    </div>
  );
}

export default PetAd;
