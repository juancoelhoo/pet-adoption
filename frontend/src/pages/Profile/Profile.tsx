import Menu from '../../components/Menu/Menu';
import profile from '../../public/profile/profile2.svg';
import ProfileAd from '../../components/ProfileAd/ProfileAd';
import dogPaw from '../../public/profile/dog-paw.svg';
import dogPawEmpty from '../../public/profile/dog-paw-empty.svg';
import locationPin from '../../public/profile/location-pin.svg';
import descriptionImg from '../../public/profile/description.svg';
import AddAd from '../../components/AddAd/AddAd';
import edit from '../../public/dropdown/edit.svg';
import report from '../../public/dropdown/report.svg';
import remove from '../../public/dropdown/remove.svg';
import dropdown from '../../public/dropdown/dropdown.svg';
import { api } from "../../services/api";




import './Profile.css';
import ad from '../../public/advertisement/advertisement.svg';
import { useState } from 'react';

const ProfileScreen: React.FC = () => {


  const [profileState, setProfileState] = useState({
    name: 'Stefani Germanotta',
    rating: 3,
    pic: '',
    local: 'Roma, Itália',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  });

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleRatingClick = (newRating: number) => {
    setProfileState((prevState) => ({
      ...prevState,
      rating: newRating,
    }));
  };

  const renderRatingIcons = (rating: number) => {
    const maxRating = 5;
    const ratingIcons = [];

    for (let i = 0; i < maxRating; i++) {
      if (i < rating) {
        ratingIcons.push(
          <button
            key={i}
            className="rateBtn"
            onClick={() => handleRatingClick(i + 1)}
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

              <div className="profile-name"><span>{profileState.name}</span></div>

              <div className="profile-rating">
              {renderRatingIcons(profileState.rating)}
                <text className="rating"> {profileState.rating} </text>
              </div>

              <div className="profile-location">
                <img src={locationPin} alt="location-pin" />
                <span className="profile-string">{profileState.local}</span>
              </div>

              <div className="profile-text">
                <img src={descriptionImg} alt="description-img" />
                <span className="profile-string">{profileState.description}</span>
              </div>

            </div>

            <button className='dropdown-btnp' onClick={toggleDropdown}>
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
          )}

          </div>

          <div className="profile-bottom">
            <div>Anúncios</div>
            <div className="line-divider"></div>

            <div className="profile-posts">
            <ProfileAd></ProfileAd>
            <ProfileAd></ProfileAd>
            <AddAd></AddAd>
          </div>

          </div>




          </div>
        </div>
      </div>
  );
};

export default ProfileScreen;
