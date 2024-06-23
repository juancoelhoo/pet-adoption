import React, { useState } from 'react';

import { api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

import Menu from '../../components/Menu/Menu';
import ProfileAd from '../../components/ProfileAd/ProfileAd';
import AddAd from '../../components/AddAd/AddAd';

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

const ProfileScreen = () => {
  const { loggedUser } = useAuth();
  const navigate = useNavigate();

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

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

  return (

    
    <div className="profile-container">
      <Menu />
      <div className="profile-screen">
        <div className="profile-info">
          <div className="profile-top">

            <div className="profile-pic">
              <img src={profile} alt="profile-photo" />
            </div>
          
            <div className="profile-description">

              <div className="profile-name"><span>Stefani Germanotta</span></div>

              <div className="profile-rating">
                <img src={dogPaw} alt="dog-paw" />
                <img src={dogPaw} alt="dog-paw" />
                <img src={dogPaw} alt="dog-paw" />
                <img src={dogPaw} alt="dog-paw" />
                <img src={dogPaw} alt="dog-paw" />
                <text className="rating"> 3,2 </text>
              </div>

              <div className="profile-location">
                <img src={locationPin} alt="location-pin" />
                <span className="profile-string">Roma, Itália</span>
              </div>

              <div className="profile-text">
                <img src={descriptionImg} alt="description-img" />
                <span className="profile-string">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
              </div>

            </div>

            {/* <button className='dropdown-btnp' onClick={toggleDropdown}>
            <img src={dropdown} alt="dropdown-menu" />
          </button>
          {dropdownVisible && (
            <div className='dropdown-menup'>
              <ul>
                <li>Editar
                  <img src={edit} alt="" />
                </li>
                <li>Denunciar
                  <img src={report} alt="" />
                </li>
                <li>Excluir
                  <img src={remove} alt="" />
                </li>
              </ul>
            </div>
          )} */}

          </div>

          <div className="profile-bottom">
            <div>Anúncios</div>
            <div className="line-divider"></div>

            <div className="profile-posts">
            {/* TODO: Fazer esses posts serem dinamicos */}
            <ProfileAd id="1"/>
            <ProfileAd id="5"/>
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
