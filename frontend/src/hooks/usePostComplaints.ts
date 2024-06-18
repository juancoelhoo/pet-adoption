import { useState } from 'react';
import { api } from '../services/api';

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
      await api.post('/complaints', {
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
