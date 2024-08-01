import React, { useState, useEffect } from 'react';
import { getUsers } from './apiHelpers.jsx';
import ButtonWithAction from "./buttonActive.tsx";
import './styles/userSection.css';
import placeholderImage from './img/photo-cover.svg'; 

const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};


const UserCard = ({ user }) => {
  const [imageSrc, setImageSrc] = useState(placeholderImage);

  useEffect(() => {
    if (user.photo && user.photo !== 'null' && user.photo !== 'undefined') {
      preloadImage(user.photo)
        .then(() => setImageSrc(user.photo))
        .catch(() => setImageSrc(placeholderImage));
    }
  }, [user.photo]);

  return (
    <div className="user-card">
      <img 
        src={imageSrc}
        alt={user.name || 'User'} 
        className="user-photo"
      />
      <h3>{user.name}</h3>
      <p>{user.position}</p>
      <p>{user.email}</p>
      <p>{user.phone}</p>
    </div>
  );
};

const UserSection = ({ shouldReload }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadUsers = async () => {
    const data = await getUsers(page);
    if (data.success) {
      setUsers(prevUsers => page === 1 ? data.users : [...prevUsers, ...data.users]);
      setTotalPages(data.total_pages);
    }
  };

  useEffect(() => {
    setPage(1);
    setUsers([]);
  }, [shouldReload]);

  useEffect(() => {
    loadUsers();
  }, [page, shouldReload]);

  const handleShowMore = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <section className="user-section" id="users-section">
      <h2>Working with GET request</h2>
      <div className="user-grid">
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      {page < totalPages && (
        <ButtonWithAction
          text="Show more"
          anchor=""
          active={true}
          onClick={handleShowMore}
        />
      )}
    </section>
  );
};

export default UserSection;