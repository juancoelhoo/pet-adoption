import React, { useEffect, useState } from 'react';

import Menu from '../../components/Menu/Menu';

import warningSvg from '../../public/complaints/warning.svg';

import './styles.css';
import ComplaintTile from '../../components/ComplaintTile';
import { User } from '../../domain/entities/User';
import { api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { Post } from '../../domain/entities/Post';

const ComplaintsPage: React.FC = () => {
  const { token } = useAuth();
  const [complaints, setComplaints] = useState<any>([]);

  useEffect(() => {
    loadComplaints();
  }, []);

  async function loadComplaints() {
    try {

      const response = await api.get("/complaints/all");
      setComplaints(response.data.body);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="complaints-container">
      <Menu />

      <div className="complaints-screen">
        <div className="page-title">
          <img src={warningSvg} alt="warning-logo" />
          <span>Denúncias</span>
        </div>
        <div className="complaints-list">
          {
            complaints.map((complaint: { reporter: User; post: Post; createdAt: string; reason: string; id: number }) => (
              <ComplaintTile
                key={complaint.id}
                reporter={complaint.reporter}
                post={complaint.post}
                date={new Date(complaint.createdAt)}
                reason={complaint.reason}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default ComplaintsPage;
