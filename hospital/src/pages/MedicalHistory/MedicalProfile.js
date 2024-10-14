import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../Database/FireBaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import './MedicalProfile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faQrcode,faFileMedical,faNotesMedical,faCalendarDays } from '@fortawesome/free-solid-svg-icons';

function MedicalProfile() {
  const { uid } = useParams();
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();

  // Fetch patient data
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const patientDoc = doc(db, 'patients', uid);
        const patientSnapshot = await getDoc(patientDoc);
        if (patientSnapshot.exists()) {
          setPatient(patientSnapshot.data());
        } else {
          console.error('No such patient!');
        }
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatientData();
  }, [uid]);

  const handleGetQrClick = () => {
    navigate(`/myqrcode/${uid}`);
  };


 

  const handleViewAppointments = () => {
    navigate(`/appointments/${uid}/${patient.name}`); // Navigate to the appointments page
  };

  const pastdiagnosis = () => {
    navigate(`/diagnosis/${uid}`); // Navigate to the appointments page
  };
  const medicalReport = () => {
    navigate(`/medicalreport/${uid}`); // Navigate to the appointments page
  };

  if (!patient) {
    return <div>Loading patient data...</div>;
  }

  return (
    <div>
      <h1 className="medical-records-h1">MEDICAL PROFILE</h1>
      <div className="medical-profile">
        <p><strong>Name:</strong> {patient.name}</p>
        <p><strong>NIC:</strong> {patient.nic}</p>
        <p><strong>Age:</strong> {patient.age}</p>
        <p><strong>Address:</strong> {patient.address}</p>
        <p><strong>Gender:</strong> {patient.gender}</p>
        <p><strong>Mobile Number:</strong> {patient.mobileNumber}</p>
      </div>

      <button className="medical-records-QRbutton" onClick={handleGetQrClick}>
        <FontAwesomeIcon icon={faQrcode} style={{ marginRight: '5px' }} /> Get QR Code
      </button>

      
      <div className="medical-records-buttonsection">
      <button className="medical-records-button" onClick={handleViewAppointments}>
      <FontAwesomeIcon icon={faCalendarDays} beat />&nbsp;  View Appointments</button> {/* New button */}

      <button className="medical-records-button" onClick={pastdiagnosis}>
      <FontAwesomeIcon icon={faNotesMedical} beat />&nbsp;    Past Diagnosis</button>
      <button className="medical-records-button" onClick={medicalReport}>
      <FontAwesomeIcon icon={faFileMedical} beat />&nbsp; Medical Report</button>
      </div>
    </div>
  );
}

export default MedicalProfile;
