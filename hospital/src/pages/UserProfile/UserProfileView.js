import React, { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // If you're using Firebase authentication
import { db } from '../../Database/FireBaseConfig';
import { useNavigate } from 'react-router-dom';

const UserProfileView = () => {
  const navigate = useNavigate(); // Move useNavigate() to the top level
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const userId = user.uid; // Assuming you're getting the UID from the authenticated user
          const patientDocRef = doc(db, 'patients', userId);
          const patientDoc = await getDoc(patientDocRef);

          if (patientDoc.exists()) {
            setPatientData(patientDoc.data());
          } else {
            setError("No patient data found for this user.");
          }
        } else {
          setError("No user is currently logged in.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!patientData) {
    return <p>No patient data available.</p>;
  }

  const handlePatient = () => {
    navigate('/patientEdit');
    console.log("Edit Patient clicked");
  };

  const handleHistory = () => {
    navigate('/patientHistory');
    console.log("Medical history")
  };

  return (
    <div>
      <h2>Patient Profile</h2>

      <button onClick={handlePatient}>Edit</button>
      <button onClick={handleHistory}>History</button>

      <p><strong>Name:</strong> {patientData.name}</p>
      <p><strong>NIC:</strong> {patientData.nic}</p>
      <p><strong>Age:</strong> {patientData.age}</p>
      <p><strong>Gender:</strong> {patientData.gender}</p>
      <p><strong>Address:</strong> {patientData.address}</p>
      <p><strong>Mobile Number:</strong> {patientData.mobileNumber}</p>
    </div>
  );
};

export default UserProfileView;
