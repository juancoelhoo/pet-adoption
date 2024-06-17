import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PetAd.css';
import dogimage from '../../public/pet-ad/pet-ad.svg';
import nameimage from '../../public/pet-ad/pet-name.svg';
import breedimage from '../../public/pet-ad/pet-breed.svg';
import ageimage from '../../public/pet-ad/pet-age.svg';
import descimage from '../../public/pet-ad/pet-description.svg';
import likeimage from '../../public/pet-ad/like.svg'; // Importe a imagem de curtida

function PetAd() {
  const [likes, setLikes] = useState(0);

  // Fetch initial likes from the backend when the component mounts
  useEffect(() => {
    axios.get('http://localhost:3333/reactions')
      .then(response => {
        setLikes(response.data.likes);
      })
      .catch(error => {
        console.error('Error fetching likes:', error);
      });
  }, []);

  // Handle the like button click
  const handleLike = async () => {
    try {
      const response = await axios.post('http://localhost:3333/reactions/toggleLike', {
        userId: 1, // Substitua pelo userId real
        postId: 1  // Substitua pelo postId real
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
