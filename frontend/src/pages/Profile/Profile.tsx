import React, { useEffect, useState } from 'react';

import { api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

import Menu from '../../components/Menu/Menu';
import ProfileAd from '../../components/ProfileAd/ProfileAd';
import AddAd from '../../components/AddAd/AddAd';

import edit from '../../public/dropdown/edit.svg';
import report from '../../public/dropdown/report.svg';
import remove from '../../public/dropdown/remove.svg';
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

import './Profile.css';
import ImageUpload from '../../components/ImageUpload';
import { useNavigate } from 'react-router-dom';

interface Ad {
  id: number;
  name: string;
  breed: string;
  age: number;
  description: string;
  photoUrl: string;
  ownerId: number;
}

const ProfileScreen = () => {
  const { token } = useAuth();
  const { loggedUser } = useAuth();
  const navigate = useNavigate();

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const [ads, setAds] = useState<Ad[]>([]);
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [breed, setBreed] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [photoUrl, setPhotoUrl] = useState<string>("");

  async function setFile(file: File) {
    const body = new FormData();
    body.append("file", file);

    const headers = { "Content-Type": "multipart/form-data" };

    const response = await api.post("/files/upload", body, { headers });
    setPhotoUrl(response.data.body);
  }

  async function createPost() {
    try {
      const body = {
        name,
        breed,
        age: Number(age),
        description,
        photoUrl,
        ownerId: loggedUser?.id,
        createdAt: new Date().toISOString()
      };

      console.log(body);

      await api.post("/posts", body);
      setIsPopupOpen(false);
      alert("Post criado com sucesso!");
      navigate("/posts");
    } catch (error) {
      console.log(error);
    }
  }

  
  const [ratingState, setRatingState] = useState({
    rating: 0
 });


  async function getRating() {
    let id = loggedUser?.id;
    try {
      const response = await api.get(`/ratings/${id}`, {
        headers: {
          userId: loggedUser?.id
        }
      });
      setRatingState(response.data.body);
    } catch (e) {
      console.log(e);
    }
  }


  async function averageRating() {
    try {
      let id = loggedUser?.id;
      const response = await api.get(`/ratings/average/${id}`, {
        headers: {
          userId: loggedUser?.id
        }
      });
      setRatingState({rating: response.data.body.average});
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (loggedUser) {
      averageRating();
      loadAds();
    }
  }, [loggedUser]);



  const renderRatingIcons = (rating: number) => {
    const maxRating = 5;
    const ratingIcons = [];

    for (let i = 0; i < maxRating; i++) {
      if (i < rating) {
        ratingIcons.push(
          <button
            key={i}
            className="rateBtn"
            onClick={() => {}}
          >
            <img src={dogPaw} alt="dog-paw" />
          </button>
        );
      } else {
        ratingIcons.push(
          <button
            key={i}
            className="rateBtn"
            onClick={() => {}}
          >
            <img src={dogPawEmpty} alt="empty-dog-paw" />
          </button>
        );
      }
    }

    return ratingIcons;
  };

  async function deleteProfile() {
    let id = loggedUser?.id;
    try {
      const response = await api.delete(`/users/${id}`, {
        headers: {
          userId: loggedUser?.id
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

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
              <img src={loggedUser?.profilePhoto} alt="profile-photo" />
            </div>
          
            <div className="profile-description">

              <div className="profile-name"><span>{loggedUser?.name}</span></div>

              <div className="profile-rating">
              {renderRatingIcons(ratingState.rating)}
                <text className="rating"> {ratingState.rating} </text>
              </div>

              <div className="profile-location">
                <img src={locationPin} alt="location-pin" />
                <span className="profile-string">{loggedUser?.address}</span>
              </div>

              <div className="profile-text">
                <img src={descriptionImg} alt="description-img" />
                <span className="profile-string">{loggedUser?.description}</span>
              </div>

            </div>

            <button className='dropdown-btnp' onClick={toggleDropdown}>
            <img src={dropdown} alt="dropdown-menu" />
          </button>
          {dropdownVisible && (
            <div className='dropdown-menup'>
              <ul>
              <li>
                  <button>
                  Editar
                  <img src={edit} alt="" />
                </button>
                 </li>
              <li>
                  <button onClick={deleteProfile}>
                  Excluir
                  <img src={remove} alt="" />
                </button>
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
              ad.ownerId === loggedUser?.id && (
              <ProfileAd
                key={ad.id}
                id={ad.id}
                name={ad.name}
                photoUrl={ad.photoUrl}
              />
  )
))}

            <AddAd
              openPopup={() => setIsPopupOpen(true)}
            />
          </div>

          </div>

          {
            isPopupOpen && (
              <div className="popup-create-post">
                <div className="close">
                  <button onClick={() => setIsPopupOpen(false)} >x</button>
                </div>

                <ImageUpload
                  setFile={setFile}
                />

                <div className="post-input">
                  <label htmlFor="name">
                    <img src={nameImg} alt="" />
                  </label>
                  <input type="text" id="name" placeholder="Nome do pet" onChange={e => setName(e.target.value)} />
                </div>

                <div className="post-input">
                  <label htmlFor="breed">
                    <img src={breedImg} alt="" />
                  </label>
                  <input type="text" id="breed" placeholder="Raça do pet" onChange={e => setBreed(e.target.value)} />
                </div>

                <div className="post-input">
                  <label htmlFor="age">
                    <img src={ageImg} alt="" />
                  </label>
                  <input type="number" id="age" placeholder="Idade do pet" onChange={e => setAge(e.target.value)} />
                </div>

                <div className="post-input description-box">
                  <label htmlFor="description">
                    <img src={descImg} alt="" />
                  </label>
                  <textarea id="description" placeholder="Descrição do pet" onChange={e => setDescription(e.target.value)} />
                </div>

                <div className="create-btn">
                  <button onClick={createPost}>Criar</button>
                </div>
              </div>
            )
          }

          </div>
        </div>
      </div>
  );
};

export default ProfileScreen;
