import React, { useState, ChangeEvent } from 'react';
import { AxiosError } from 'axios';
import { api } from '../../services/api'; 
import './PostComplaintPopup.css';

interface PostComplaintPopupProps {
  reason: string;
  setReason: (reason: string) => void;
  handleSubmit: () => void;
  handleClosePopup: () => void;
  reporterUserId: number;
  reportedPostId: number;
}

const PostComplaintPopup: React.FC<PostComplaintPopupProps> = ({
  reason, setReason, handleClosePopup, reporterUserId, reportedPostId
}) => {
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async () => {
    if (reason.trim() === '') {
      setMessage('A razão da denúncia não pode estar vazia.');
      setIsError(true);
      return;
    }

    try {
      await api.post('/complaints/', {
        reporterUserId,
        reportedPostId,
        reason,
      });
      setMessage('Sua denúncia foi enviada com sucesso!');
      setIsError(false);
      setReason('');
      setTimeout(() => {
        setMessage(null);
        handleClosePopup();
      }, 2000);
    } catch (error) {
      let errorMessage = 'Tivemos problemas ao processar sua denúncia!';
      if (error instanceof AxiosError) {
        console.error('Axios error:', error.response);
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error instanceof Error) {
        console.error('Error:', error.message);
        errorMessage = error.message;
      } else {
        console.error('Unknown error:', error);
      }
      setMessage(errorMessage);
      setIsError(true);
    }
  };

  return (
    <div className="post-complaint-popup">
      <div className="post-complaint-popup-content">
        <h3>Denúncia de publicação</h3>
        <textarea
          value={reason}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setReason(e.target.value)}
          placeholder="Escreva aqui a razão da sua denúncia."
          maxLength={120}
          title="A denúncia deve ter entre 1 e 120 caracteres."
        ></textarea>
        <div className="button-group">
          <button onClick={handleSubmit}>Enviar denúncia</button>
          <button className="cancel-button" onClick={handleClosePopup}>Cancelar</button>
        </div>
        {message && (
          <div className={`message ${isError ? 'error' : ''}`}>{message}</div>
        )}
      </div>
    </div>
  );
};

export default PostComplaintPopup;
