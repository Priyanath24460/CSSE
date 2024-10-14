import React from 'react';
import { useNavigate } from 'react-router-dom';

const PatientHome =() => {
    const navigate = useNavigate();
  const handlePatient = () => {
    navigate('/patientProfile');
    console.log("Login Patient clicked");
  };

  const handlePatientHOme = () => {
    navigate('/doctors');
  };
  return (
    <div>
      <h1>Patient Home</h1>
      <button onClick={handlePatient}>Login</button>
      {/* <button onClick={Charts}>charts</button> */}
      <button onClick={handlePatientHOme}>Home</button>
    </div>
  );
}

export default PatientHome;