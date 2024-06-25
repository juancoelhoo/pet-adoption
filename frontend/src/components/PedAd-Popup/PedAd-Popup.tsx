import React, { useEffect, useState } from 'react';
import './PedAd-Popup.css';
import PostComplaintPopup from '../PostComplaints/PostComplaintPopup';
import { api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import close from '../../public/pet-ad/close-btn.svg';
import contato from '../../public/pet-ad/whatsapp.svg';
import profile from '../../public/menu/profile.svg';
import profileAccess from '../../public/pet-ad/profile-access.svg';
import dropdown from '../../public/dropdown/dropdown.svg';
import report from '../../public/dropdown/report.svg';
import remove from '../../public/dropdown/remove.svg';
import likeimage from '../../public/pet-ad/like.svg'; 
import { User } from '../../domain/entities/User';
import { Link } from 'react-router-dom';

interface PedAdPopupProps {
  trigger: boolean;
  onClose: (shouldReload: boolean) => void;
  name: string;
  breed: string;
  age: number;
  description: string;
  photoUrl: string;
  id: number;
  owner: User;
}

const PedAdPopup: React.FC<PedAdPopupProps> = ({
  trigger, onClose, name, breed, age, description, photoUrl, id, owner
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [postLiked, setPostLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [complaintPopupVisible, setComplaintPopupVisible] = useState(false);
  const [reason, setReason] = useState('');
  const { loggedUser } = useAuth();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleLike = () => {
    setPostLiked(!postLiked);
  };

  const getLike = async () => {
    try {
      const response = await api.get(`/reactions/total/${id}`);
      setLikes(response.data.body.total);
    } catch (error) {
      console.error('Error getting likes:', error);
      alert('Failed to get likes.');
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
      console.error('Error handling like:', error);
      alert('Failed to handle like.');
      toggleLike();
    }
  };

  const handleSubmit = async () => {
    try {
      await api.post('/complaints/', {
        reporterUserId: loggedUser?.id,
        reportedPostId: id,
        reason,
      });
      alert('Complaint submitted successfully.');
      setComplaintPopupVisible(false);
    } catch (error) {
      console.error('Error submitting complaint:', error);
      alert('Failed to submit complaint.');
    }
  };

  async function deletePost() {
    try {
      await api.delete(`/posts/${id}`);
      alert('Post deleted successfully.');
      onClose(true);
    } catch (error) {
      console.error('Error submitting complaint:', error);
      alert('Failed to submit complaint.');
    }
  }

  return trigger ? (
    <div className='popup-overlay'>
      <div className='popup'>
        <div className='popup-content'>
          <button className='close-btn' onClick={() => onClose(false)}>
            <img src={close} alt="close button" />
          </button>
          <button className='dropdown-btn' onClick={toggleDropdown}>
            <img src={dropdown} alt="dropdown-menu" />
          </button>
          {dropdownVisible && (
            <div className='dropdown-menu'>
              <ul>
                <li onClick={() => setComplaintPopupVisible(true)}>Denunciar
                  <img src={report} alt="" />
                </li>
                {loggedUser?.permissions == 1 /*isAdmin*/ && (
                  <li onClick={deletePost}>Excluir
                    <img src={remove} alt="excluir" />
                  </li>
                )}
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
            <Link to={`/profile/${owner.id}`} className="profile-user">
              <img src={owner.profilePhoto} alt="profile-photo" />
              <span>{owner.name}</span>
            </Link>
            <img src={profileAccess} alt="profile-access" className="profile-access" />
          </div>
          <a className='contact' href={`https://wa.me/55${owner.phone?.replace(" ", "").replace("-", "").trim()}`} target="_blank">
            <p>Converse com o Dono</p>
            <img src={contato} alt="whatsapp-image" className='btn-image' />
          </a>
          <div className="pet-likes">
            <button onClick={async () => { await handleLike(); toggleLike(); await getLike(); }} className={postLiked ? 'postliked' : 'postnotliked'}>
              <img src={likeimage} alt="Curtir" className="like-icon" />
            </button>
            <span>{likes} Curtidas</span>
          </div>
          {complaintPopupVisible && loggedUser && (
            <PostComplaintPopup
              reason={reason}
              setReason={setReason}
              handleSubmit={handleSubmit}
              handleClosePopup={() => setComplaintPopupVisible(false)}
              reporterUserId={loggedUser.id}
              reportedPostId={id}
            />
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default PedAdPopup;