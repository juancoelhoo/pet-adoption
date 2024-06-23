import './AddAd.css';
import Add from '../../public/profile/btnadd.svg';

interface AddAdProps {
  openPopup: () => void;
}

function AddAd({openPopup}: AddAdProps) {
  return (
    <div className='add-ad' onClick={openPopup}>
      <img src={Add} alt="add" />
    </div>
  );
}

export default AddAd;
