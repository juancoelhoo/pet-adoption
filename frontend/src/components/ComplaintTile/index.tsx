import React, { useState } from 'react';

import { User } from '../../domain/entities/User';

import './styles.css';
import { Post } from '../../domain/entities/Post';

interface ComplaintTileProps {
    reporter: User;
    post: Post;
    date: Date;
    reason: string;
};

const ComplaintTile = ({reporter, post, date, reason}: ComplaintTileProps) => {
  return (
    <div className="complaint-tile">
      <header>
        <img src={reporter.profilePhoto} alt="reporter" />
        <p>Usuário <b>{reporter.name}</b> reportou</p>
        <img src={post.photoUrl} alt="reported post" />
        <p><b>{post.name}</b></p>
      </header>

      <section>
        <p>
            <b>Data: </b>
            {date.toDateString()}
        </p>

        <p>
            <b>Motivo: </b>
            {reason}
        </p>
      </section>
    </div>
  );
};

export default ComplaintTile;
