import Menu from '../../components/Menu/Menu';
import PetAd from '../../components/PetAd/PetAd';

import './Advertisement.css';
import ad from '../../public/advertisement/advertisement.svg';
import withAuth from '../../hoc/withAuth';

const AdvertisementScreen = () => {
  return (
    <div className="advertisement-container">
      <Menu />
      <div className="ad-screen">
        <img src={ad} alt="ad-logo" />
        Anúncios
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

export default withAuth(AdvertisementScreen);
