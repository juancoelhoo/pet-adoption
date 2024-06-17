import './ProfileAd.css';
import dogimage from '../../public/pet-ad/pet-ad.svg';
import nameimage from '../../public/pet-ad/pet-name.svg';
import breedimage from '../../public/pet-ad/pet-breed.svg';
import ageimage from '../../public/pet-ad/pet-age.svg';
import descimage from '../../public/pet-ad/pet-description.svg';

function ProfileAd() {
  return (
    <div className='profile-ad'>
        <button className="optionsBtn">...</button>
      <img src={dogimage} alt="pet-photo" />
      <div className="profile-pet-inf">
        <div className="line"></div>
        <div className="pet-name">
          <span className="profile-pet-info">caramelo</span>
        </div>
      </div>  
    </div>
  );
}

export default ProfileAd;
