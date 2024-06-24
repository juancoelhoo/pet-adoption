import React, { useEffect, useState } from 'react';
import './PedAd-Popup.css';
import close from '../../public/pet-ad/close-btn.svg';
import contato from '../../public/pet-ad/whatsapp.svg';
import profile from '../../public/menu/profile.svg';
import profileAccess from '../../public/pet-ad/profile-access.svg';
import dropdown from '../../public/dropdown/dropdown.svg';
import edit from '../../public/dropdown/edit.svg';
import report from '../../public/dropdown/report.svg';
import remove from '../../public/dropdown/remove.svg';
import likeimage from '../../public/pet-ad/like.svg'; 
import { api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

interface PedAdPopupProps {
  trigger: boolean;
  onClose: () => void;
  name: string;
  breed: string;
  age: number;
  description: string;
  photoUrl: string;
  id: number;
}

const PedAdPopup: React.FC<PedAdPopupProps> = ({ trigger, onClose, name, breed, age, description, photoUrl, id }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [postLiked, setpostLiked] = useState(false);
  const [likes, setLikes] = useState();
  const { loggedUser } = useAuth();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleLike = () => {
    setpostLiked(!postLiked);
  }

  const getLike = async () => {
    try {
      const response = await api.get(`/reactions/total/${id}`, {
        headers: {
          postId: id
        }
      });
      setLikes(response.data.body.total)
    } catch (error) {
      console.error('Error handledling like:', error);
      alert('Failed to handle like.');
    }
  };

  useEffect(() => {
    if (id) {
      getLike();
    }
  }, [id]); 



  const handleLike = async () => {
    try {
      await api.post('/reactions/toggleLike', {
        userId: loggedUser?.id,
        postId: id,
      });
    } catch (error) {
      console.error('Error handledling like:', error);
      alert('Failed to handle like.');
      toggleLike();
    }
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
                <li>Denunciar
                  <img src={report} alt="" />
                </li>
              </ul>
            </div>
          )}
          <div className="post-picture">
            <img src={photoUrl} alt="" />
          </div>
          <p><b>Nome:</b> {name}</p>
          <p><b>Raça:</b> {breed}</p>
          <p><b>Idade:</b> {age} anos</p>
          <p><b>Descrição:</b> {description}</p>
          <div className="profile">
            <div className="profile-user">
              <img src={profile} alt="profile-photo" />
              <span>Stephanie</span>
            </div>
            <img src={profileAccess} alt="profile-access" className="profile-access" />
          </div>
          <button className='contact'>
            <p>Converse com o Dono</p>
            <img src={contato} alt="whatsapp-image" className='btn-image' />
          </button>
          <div className="pet-likes">
          <button onClick={async () => {await handleLike(), await toggleLike(), await getLike()}} className={postLiked ? 'postliked' : 'postnotliked'}>
            <img src={likeimage} alt="Curtir" className="like-icon" />
          </button>
          <span>{likes} Curtidas</span>
        </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default PedAdPopup;
