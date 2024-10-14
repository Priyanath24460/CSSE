import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // If you're using Firebase authentication
import { db } from '../../Database/FireBaseConfig';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const MedicalHistory = () => {
  const navigate = useNavigate(); // Move useNavigate() to the top level
  const [appointmentData, setAppointmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const userId = user.uid; // Get the authenticated user's UID

          // Query the 'appointments' collection where the 'userId' field matches the current user's ID
          const appointmentsRef = collection(db, 'appointments');
          const q = query(appointmentsRef, where('userId', '==', userId));

          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const appointments = querySnapshot.docs.map(doc => doc.data());
            setAppointmentData(appointments); // Set all matching appointments to the state
          } else {
            setError("No appointment data found for this user.");
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

    fetchAppointmentData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (appointmentData.length === 0) {
    return <p>No appointment data available.</p>;
  }

  return (
    <div>
      <h2>Appointments</h2>
      {appointmentData.map((appointment, index) => (
        <div key={index}>
          <p><strong>Doctor:</strong> {appointment.doctorName}</p>
          <p><strong>Note:</strong> {appointment.note}</p>
          <p><strong>Patient Name:</strong> {appointment.patientName}</p>
          <p><strong>Date:</strong> {appointment.date}</p>
          <p><strong>Time:</strong> {appointment.time}</p>
          <p><strong>Status:</strong> {appointment.status}</p>
        </div>
      ))}
    </div>
  );
};

export default MedicalHistory;
