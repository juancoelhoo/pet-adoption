import Menu from '../../components/Menu/Menu';
import PetAd from '../../components/PetAd/PetAd';

import './Advertisement.css';
import ad from '../../public/advertisement/advertisement.svg';

const AdvertisementScreen = () => {
  return (
    <div className="advertisement-container">
      <Menu />
      <div className="ad-screen">
        <div className="post-title">
        <img src={ad} alt="ad-logo" />
          Anúncios
        </div>
        <div className="pet-ads">
          <PetAd></PetAd> 
          <PetAd></PetAd> 
          <PetAd></PetAd>
          <PetAd></PetAd>
          <PetAd></PetAd>
          <PetAd></PetAd>
        </div>    
      </div>
    </div>
  );
};

export default AdvertisementScreen;
