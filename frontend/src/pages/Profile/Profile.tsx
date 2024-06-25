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
import telephone from '../../public/profile/telephone.svg';

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
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState<boolean>(false);

  const [ads, setAds] = useState<Ad[]>([]);
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [breed, setBreed] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [photoUrl, setPhotoUrl] = useState<string>("");


  const [profileName, setProfileName] = useState<string>("");
  const [profileDescription, setProfileDescription] = useState<string>("");
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string>("");
  const [profileAddress, setProfileAddress] = useState<string>("");
  const [profileNumber, setProfileNumber] = useState<string>("");

  async function setFile(file: File) {
    const body = new FormData();
    body.append("file", file);

    const headers = { "Content-Type": "multipart/form-data" };

    const response = await api.post("/files/upload", body, { headers });
    setPhotoUrl(response.data.body);
  }

  async function setProfileFile(file: File) {
    const body = new FormData();
    body.append("file", file);

    const headers = { "Content-Type": "multipart/form-data" };

    const response = await api.post("/files/upload", body, { headers });
    setProfilePhotoUrl(response.data.body);
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

  async function updateProfile() {
    try {
      const body = {
        profileName,
        profileDescription,
        profilePhotoUrl,
        profileAddress,
        profileNumber
      };

      console.log(body);
  
  
      const response = await api.put(`/users/${loggedUser?.id}`, {
        name: profileName,
        description: profileDescription,
        profilePhoto: profilePhotoUrl,
        address: profileAddress,
        phone: profileNumber
      });
  
      // Check if the response is successful
      if (response.status === 200) {
        setIsProfilePopupOpen(false);
        alert("Perfil alterado com sucesso!");
        window.location.reload;
      } else {
        alert("Erro ao atualizar o perfil.");
      }
    } catch (error) {
      console.error("Erro ao atualizar o perfil:", error);
    }
  }
  
  const [ratingState, setRatingState] = useState({
    rating: 0
 });

  async function averageRating() {
    try {
      let id = loggedUser?.id;
      const response = await api.get(`/ratings/average/${id}`);
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
    try {
      await api.delete(`/users/${loggedUser?.id}`);
      alert("Usuário removido com sucesso!");
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
                  <button onClick={() => {toggleDropdown(), setIsProfilePopupOpen(true)}}>
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
                  setFile={setProfileFile}
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


{
            isProfilePopupOpen && (
              <div className="popup-create-post">
                <div className="close">
                  <button onClick={() => setIsProfilePopupOpen(false)} >x</button>
                </div>

                <ImageUpload
                  setFile={setProfileFile}
                />

                <div className="post-input">
                  <label htmlFor="name">
                    <img src={nameImg} alt="" />
                  </label>
                  <input type="text" id="name" placeholder="Nome de usuário" onChange={e => setProfileName(e.target.value)} />
                </div>

                <div className="post-input">
                  <label htmlFor="Localização">
                    <img src={locationPin} alt="" />
                  </label>
                  <input type="text" id="location" placeholder="Localização" onChange={e => setProfileAddress(e.target.value)} />
                </div>

                <div className="post-input">
                  <label htmlFor="Telefone">
                    <img src={telephone} alt="" />
                  </label>
                  <input type="tel" id="telefone" placeholder="Telefone" onChange={e => setProfileNumber(e.target.value)} />
                </div>

                <div className="post-input description-box">
                  <label htmlFor="description">
                    <img src={descImg} alt="" />
                  </label>
                  <textarea id="description" placeholder="Descrição de perfil" onChange={e => setProfileDescription(e.target.value)} />
                </div>

                <div className="create-btn">
                  <button onClick={updateProfile}>Editar</button>
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
