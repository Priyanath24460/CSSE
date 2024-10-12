import React, { useState } from 'react';
import { db } from '../../Database/FireBaseConfig'; // Import Firestore
import {  setDoc, doc } from 'firebase/firestore'; // Firestore functions
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Firebase Auth
import { useNavigate } from 'react-router-dom'; // Import navigation hook

function PatientRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    nic: '',
    age: '',
    mobileNumber: '',
    address: '',
    gender: '',
    email: '', // For authentication
    password: '' // For authentication
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const auth = getAuth();
    const { email, password, ...patientData } = formData; // Separate auth details from patient data

    try {
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // After authentication, store the patient data in Firestore
      await setDoc(doc(db, 'patients',user.uid), {
        ...patientData,
        userId: user.uid // Link the Firestore entry to the Auth user
      });

      console.log('Patient registered successfully with Auth and Firestore');
      navigate('/');
    } catch (error) {
      console.error('Error registering patient:', error);
    }
  };

  return (
    <div>
      <h2>Patient Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>NIC:</label>
          <input
            type="text"
            name="nic"
            value={formData.nic}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mobile Number:</label>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default PatientRegister;
