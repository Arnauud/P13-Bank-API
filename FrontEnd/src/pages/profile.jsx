import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserName } from '../redux/slices/userSlice'; // Import Redux action
import { updateUserProfile } from '../api/profileService';
import { accounts } from '../assets/accountData';

const ProfileUser = () => {
  const { firstName, lastName } = useSelector((state) => state.user); //Get user info from Redux
  const dispatch = useDispatch(); // Initialize dispatch

  const [isEditing, setIsEditing] = useState(false);
  const [editFirstName, setEditFirstName] = useState(firstName);
  const [editLastName, setEditLastName] = useState(lastName);

  const handleSaveName = async () => {
    try {
      await updateUserProfile(editFirstName, editLastName); // ✅ Use API abstraction
      dispatch(updateUserName({ firstName: editFirstName, lastName: editLastName }));
      setIsEditing(false);
    } catch (error) {
      console.error('❌ Error updating user profile:', error);
    }
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
              <button className="edit-button" onClick={handleSaveName}>Save</button>
              <button className="edit-button" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <h1>Welcome back<br />{firstName} {lastName}!</h1>
            <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Name</button>
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

export default ProfileUser;
