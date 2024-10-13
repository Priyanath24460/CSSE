import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory
import { db } from '../../Database/FireBaseConfig'; // Adjust this path as necessary
import { collection, getDocs } from 'firebase/firestore'; // Firestore methods

function ViewAllPatient() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook to navigate between routes

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientsCollection = collection(db, 'patients');
        const patientSnapshot = await getDocs(patientsCollection);
        const patientList = patientSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPatients(patientList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patients: ", error);
      }
    };

    fetchPatients();
  }, []);

  // Function to handle click and navigate to MedicalProfile with patient's UID
  const handlePatientClick = (uid) => {
    navigate(`/medicalprofile/${uid}`); // Navigate to the patient's medical profile
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>All Patients</h1>
      {patients.length > 0 ? (
        <ul>
          {patients.map(patient => (
            <li key={patient.id} onClick={() => handlePatientClick(patient.userId)}>
              <strong>Name:</strong> {patient.name} <br />
              <strong>Age:</strong> {patient.age} <br />
              <strong>User ID:</strong> {patient.userId} <br />
            </li>
          ))}
        </ul>
      ) : (
        <p>No patients found</p>
      )}
    </div>
  );
}

export default ViewAllPatient;
