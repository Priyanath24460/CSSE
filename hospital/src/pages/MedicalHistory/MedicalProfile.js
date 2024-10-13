import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../Database/FireBaseConfig';
import { doc, getDoc, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import MedicalDataForm from './MedicalDataForm';
import DatePicker from 'react-datepicker'; // Import Date Picker
import './MedicalProfile.css'; // Import the CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faQrcode } from '@fortawesome/free-solid-svg-icons';
import 'react-datepicker/dist/react-datepicker.css';


function MedicalProfile() {
  const { uid } = useParams();
  const [patient, setPatient] = useState(null);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null); // New state for selected date
  const navigate = useNavigate();

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

  const handleRegAppoiment = () => {
    navigate('/register');
    console.log("Register Patient clicked");
  };

  const handleViewPatient = () => {
    navigate('/viewallpatient');
    console.log("View Patient clicked");
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

      <button onClick={handleRegAppoiment}>Appointment</button>
      <button onClick={handleViewPatient}>View Patient</button>

     
    </div>
  );
}

export default MedicalProfile;
