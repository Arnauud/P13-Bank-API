import React, { useState, useEffect } from 'react';

const profileUser = () => {
  const [username, setUsername] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));  // Retrieve user data from localStorage
    if (user) {
      setUsername(`${user.firstName} ${user.lastName}`);
    }
  }, []);  // This effect runs once when the component mounts

  const accounts = [
    {
      title: 'Argent Bank Checking (x8349)',
      amount: '$2,082.79',
      description: 'Available Balance'
    },
    {
      title: 'Argent Bank Savings (x6712)',
      amount: '$10,928.42',
      description: 'Available Balance'
    },
    {
      title: 'Argent Bank Credit Card (x8349)',
      amount: '$184.30',
      description: 'Current Balance'
    }
  ];

  const handleEditName = () => {
    const [firstName, lastName] = username.split(' ');
    setEditFirstName(firstName);
    setEditLastName(lastName);
    setIsEditing(true);
  };

  const handleSaveName = () => {
    setUsername(`${editFirstName} ${editLastName}`);
    setIsEditing(false);
    // Optionally save updated name back to localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    user.firstName = editFirstName;
    user.lastName = editLastName;
    localStorage.setItem('user', JSON.stringify(user));
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        {isEditing ? (
          <div>
            <h1>Edit Profile</h1>
            <div className="input-wrapper">
              <label htmlFor="firstName">First Name</label>
              <input 
                type="text" 
                id="firstName"
                value={editFirstName}
                onChange={(e) => setEditFirstName(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="lastName">Last Name</label>
              <input 
                type="text" 
                id="lastName"
                value={editLastName}
                onChange={(e) => setEditLastName(e.target.value)}
              />
            </div>
            <div>
              <button className="edit-button" onClick={handleSaveName}>
                Save
              </button>
              <button className="edit-button" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1>Welcome back<br />{username}!</h1>
            <button className="edit-button" onClick={handleEditName}>
              Edit Name
            </button>
          </>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      {accounts.map((account, index) => (
        <section key={index} className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">{account.title}</h3>
            <p className="account-amount">{account.amount}</p>
            <p className="account-amount-description">{account.description}</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      ))}
    </main>
  );
};

export default profileUser;
