import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

import Menu from '../../components/Menu/Menu';
import ProfileAd from '../../components/ProfileAd/ProfileAd';

import report from '../../public/dropdown/report.svg';
import dropdown from '../../public/dropdown/dropdown.svg';
import profile from '../../public/profile/profile2.svg';
import dogPaw from '../../public/profile/dog-paw.svg';
import dogPawEmpty from '../../public/profile/dog-paw-empty.svg';
import locationPin from '../../public/profile/location-pin.svg';
import descriptionImg from '../../public/profile/description.svg';
import nameImg from '../../public/pet-ad/pet-name.svg';
import breedImg from '../../public/pet-ad/pet-breed.svg';
import ageImg from '../../public/pet-ad/pet-age.svg';
import descImg from '../../public/pet-ad/pet-description.svg';

import './ProfileId.css';
import { useNavigate } from 'react-router-dom';
import { User } from '../../domain/entities/User';

interface Ad {
  id: number;
  name: string;
  breed: string;
  age: number;
  description: string;
  photoUrl: string;
  ownerId: number;
}


const ProfileId = () => {
  const { token } = useAuth();

  const { loggedUser } = useAuth();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const idUser = id ? parseInt(id, 10) : 36;

  const [ads, setAds] = useState<Ad[]>([]);
  const [userData, setUserData] = useState<User | null>(null);

  const [ratingState, setRatingState] = useState({
    rating: 0
 });  

  const handleRatingClick = async (newRating: number) => {
    await sendRating(newRating);
    setRatingState((prevState) => ({
      ...prevState,
      rating: newRating,
    }));
  };

  async function getRating() {
    try {
      const response = await api.get(`/ratings/${idUser}`, {
        headers: {
          userId: idUser
        }
      });
      setRatingState(response.data.body);
    } catch (e) {
      console.log(e);
    }
  }

  async function sendRating(newRating: number) {
    try {
      const response = await api.post(`/ratings`, {
          grade: newRating,
          reporterUserId: loggedUser?.id,
          reportedUserId: idUser,
          createdAt: new Date().toISOString()
      });
      return response.data.body;
    } catch (e) {
      console.log(e);
    }
  }
  

  async function averageRating() {
    try {
      const response = await api.post(`/avarage/${id}`, {
        headers: {
          userId: idUser
        }
      });
      setRatingState(response.data.body.avarage);
    } catch (e) {
      console.log(e);
    }
  }


  useEffect(() => {
    if (loggedUser) {
      averageRating();
      loadAds();
      const fetchUserData = async () => {
        try {
          const response = await api.get(`/users/${idUser}`);
          if (response) {
            setUserData(response.data.body);
          } else {
            alert('Dados do usuário não encontrados na resposta da API.');
          }
        } catch (error) {
          alert('Erro ao carregar dados do usuário:');
        }
    };

    fetchUserData();
  }}, [idUser]);



  const renderRatingIcons = (rating: number) => {
    const maxRating = 5;
    const ratingIcons = [];

    for (let i = 0; i < maxRating; i++) {
      if (i < rating) {
        ratingIcons.push(
          <button
            key={i}
            className="rateBtn"
            onClick={() => {handleRatingClick(i + 1)}}
          >
            <img src={dogPaw} alt="dog-paw" />
          </button>
        );
      } else {
        ratingIcons.push(
          <button
            key={i}
            className="rateBtn"
            onClick={() => handleRatingClick(i + 1)}
          >
            <img src={dogPawEmpty} alt="empty-dog-paw" />
          </button>
        );
      }
    }

    return ratingIcons;
  };

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };


  async function loadAds() {
    try {
      const response = await api.get("/posts/all", {
      });
      setAds(response.data.body);
    } catch (e) {
      console.log(e);
    }
  }



  return (

    
    <div className="profile-container">
      <Menu />
      <div className="profile-screen">
        <div className="profile-info">
          <div className="profile-top">

            <div className="profile-pic">
              <img src={userData?.profilePhoto} alt="profile-photo" />
            </div>
          
            {userData && (
            <div className="profile-description">

              <div className="profile-name"><span>{userData?.name}</span></div>

              <div className="profile-rating">
              {renderRatingIcons(ratingState.rating)}
                <text className="rating"> {ratingState.rating} </text>
              </div>

              <div className="profile-location">
                <img src={locationPin} alt="location-pin" />
                <span className="profile-string">{userData.address}</span>
              </div>

              <div className="profile-text">
                <img src={descriptionImg} alt="description-img" />
                <span className="profile-string">{userData?.description}</span>
              </div>
            </div>)}

            <button className='dropdown-btnp' onClick={toggleDropdown}>
            <img src={dropdown} alt="dropdown-menu" />
          </button>
          {dropdownVisible && (
            <div className='dropdown-menup'>
              <ul>
                <li>Denunciar
                  <img src={report} alt="" />
                </li>
              </ul>
            </div>
          )}
          </div>

          <div className="profile-bottom">
            <div>Anúncios</div>
            <div className="line-divider"></div>

            <div className="profile-posts">
            {ads.map((ad) => (
              ad.ownerId === idUser && (
              <ProfileAd
                key={ad.id}
                id={ad.id}
                name={ad.name}
                photoUrl={ad.photoUrl}
                showButton={false}
              />
  )
))}

          </div>

          </div>


          </div>
        </div>
      </div>
  );
};

export default ProfileId;
