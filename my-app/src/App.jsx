import React, { useState } from 'react';
import Header from './header';
import Hero from './mainSection';
import UserSection from './userSection';
import SignupForm from './postForm';
import './styles/App.css';

const TestAssignmentPage = () => {
  const [shouldReloadUsers, setShouldReloadUsers] = useState(false);

  const handleUserAdded = () => {
    setShouldReloadUsers(prev => !prev);
  };

  return (
    <>
    <Header />
    <div className="test-assignment-page">
      <main>
     
      <Hero />
      
        <UserSection shouldReload={shouldReloadUsers} />
        <SignupForm onUserAdded={handleUserAdded} />
      </main>
      
    </div>
    </>
    
  );
};

export default TestAssignmentPage;