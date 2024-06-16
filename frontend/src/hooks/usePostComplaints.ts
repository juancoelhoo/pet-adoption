import { useState } from 'react';
import axios from 'axios';

const usePostComplaints = (userId: number, postId: number) => {
  const [showPopup, setShowPopup] = useState(false);
  const [reason, setReason] = useState('');

  const handleReportClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setReason('');
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3333/complaints', {
        reporterUserId: userId,
        reportedPostId: postId,
        reason: reason,
      });
      handleClosePopup();
      alert('Complaint submitted successfully!');
    } catch (error) {
      console.error('Error submitting complaint:', error);
      alert('Failed to submit complaint.');
    }
  };

  return {
    showPopup,
    reason,
    setReason,
    handleReportClick,
    handleClosePopup,
    handleSubmit,
  };
};

export default usePostComplaints;
