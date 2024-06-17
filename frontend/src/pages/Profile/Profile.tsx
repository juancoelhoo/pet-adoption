import Menu from '../../components/Menu/Menu';
import profile from '../../public/profile/profile2.svg';
import ProfileAd from '../../components/ProfileAd/ProfileAd';
import dogPaw from '../../public/profile/dog-paw.svg';
import locationPin from '../../public/profile/location-pin.svg';
import descriptionImg from '../../public/profile/description.svg';
import AddAd from '../../components/AddAd/AddAd';


import './Profile.css';
import ad from '../../public/advertisement/advertisement.svg';

const ProfileScreen = () => {
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

            <div className="dropDownMenu"><button className="dropDownMenuBtn">...</button></div>

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
