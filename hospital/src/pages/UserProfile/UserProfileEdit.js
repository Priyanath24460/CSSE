import React, { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../Database/FireBaseConfig';
import { useNavigate } from 'react-router-dom';

const UserProfileEdit = () => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editedDetails, setEditedDetails] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const userId = user.uid; // Get UID from the authenticated user
          const patientDocRef = doc(db, 'patients', userId);
          const patientDoc = await getDoc(patientDocRef);

          if (patientDoc.exists()) {
            setPatientData(patientDoc.data());
            setEditedDetails(patientDoc.data()); // Prefill form with current data
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

  // Update the details in Firestore
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        const patientDocRef = doc(db, 'patients', userId);
        await updateDoc(patientDocRef, editedDetails);
        alert('Patient details updated successfully');
        setIsEditing(false); // Exit editing mode
      }
    } catch (err) {
      console.error("Error updating document: ", err);
      setError(err.message);
    }
  };

  // Delete the patient's data from Firestore
  const handleDelete = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        const patientDocRef = doc(db, 'patients', userId);
        await deleteDoc(patientDocRef);
        alert('Patient details deleted successfully');
      }
    } catch (err) {
      console.error("Error deleting document: ", err);
      setError(err.message);
    }
  };

  // Handle changes to input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails({
      ...editedDetails,
      [name]: value
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!patientData) {
    return <p>No patient data available.</p>;
  }

  
  

  return (
    <div>
      <h2>Patient Profile</h2>

      {!isEditing ? (
        <div>
          <p><strong>Name:</strong> {patientData.name}</p>
          <p><strong>NIC:</strong> {patientData.nic}</p>
          <p><strong>Age:</strong> {patientData.age}</p>
          <p><strong>Gender:</strong> {patientData.gender}</p>
          <p><strong>Address:</strong> {patientData.address}</p>
          <p><strong>Mobile Number:</strong> {patientData.mobileNumber}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        <form onSubmit={handleUpdate}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={editedDetails.name}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            NIC:
            <input
              type="text"
              name="nic"
              value={editedDetails.nic}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Age:
            <input
              type="text"
              name="age"
              value={editedDetails.age}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Gender:
            <input
              type="text"
              name="gender"
              value={editedDetails.gender}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={editedDetails.address}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Mobile Number:
            <input
              type="text"
              name="mobileNumber"
              value={editedDetails.mobileNumber}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button type="submit">Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default UserProfileEdit;
