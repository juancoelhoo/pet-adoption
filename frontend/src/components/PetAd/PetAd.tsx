import './PetAd.css';
import dogimage from '../../public/pet-ad/pet-ad.svg';
import nameimage from '../../public/pet-ad/pet-name.svg';
import breedimage from '../../public/pet-ad/pet-breed.svg';
import ageimage from '../../public/pet-ad/pet-age.svg';
import descimage from '../../public/pet-ad/pet-description.svg';

function PetAd() {
  return (
    <div className='pet-ad'>
      <img src={dogimage} alt="pet-photo" />
      <div className="pet-inf">
        <div className="pet-name">
          <img src={nameimage} alt="" />
          Nome: <span className="pet-info">caramelo</span>
        </div>
        <div className="pet-breed">
          <img src={breedimage} alt="" />
          Raça: <span className="pet-info">Pastor alemão</span>
        </div>
        <div className="pet-age">
          <img src={ageimage} alt="" />
          Idade: <span className="pet-info">2 anos</span>
        </div>
        <div className="pet-description">
          <img src={descimage} alt="" />
          Descrição: <span className="pet-info">Lorem, ipsum dolor sit amet</span>
        </div>
      </div>
    </div>
  );
}

export default PetAd;
