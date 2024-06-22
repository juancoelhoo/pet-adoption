import React from 'react';
import './PostComplaintPopup.css';

interface PostComplaintPopupProps {
  reason: string;
  setReason: (reason: string) => void;
  handleSubmit: () => void;
  handleClosePopup: () => void;
}

const PostComplaintPopup: React.FC<PostComplaintPopupProps> = ({ reason, setReason, handleSubmit, handleClosePopup }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h3>Report Post</h3>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason for reporting"
        ></textarea>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleClosePopup}>Cancel</button>
      </div>
    </div>
  );
};

export default PostComplaintPopup;
