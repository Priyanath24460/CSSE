import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import navigation hook

function HospitalHome() {

    const navigate = useNavigate();
  const handleRegisterPatient = () => {
    navigate('/register');
    console.log("Register Patient clicked");
  };

  const handleViewPatient = () => {
    navigate('/viewallpatient');
    console.log("View Patient clicked");
  };

  return (
    <div>
      <h1>Hospital Home</h1>
      <button onClick={handleRegisterPatient}>Register Patient</button>
      <button onClick={handleViewPatient}>View Patient</button>
    </div>
  );
}

export default HospitalHome;
