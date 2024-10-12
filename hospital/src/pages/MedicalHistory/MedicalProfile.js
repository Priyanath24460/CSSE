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
    fetchMedicalRecords();
  }, [uid]);

  const fetchMedicalRecords = async () => {
    try {
      const medicalDataRef = collection(db, 'medicalData');
      const q = query(medicalDataRef, where('uid', '==', uid));
      const querySnapshot = await getDocs(q);
      const records = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMedicalRecords(records);
    } catch (error) {
      console.error('Error fetching medical data:', error);
    }
  };

  const handleEditClick = (record) => {
    setCurrentRecord(record); // Set the record to be edited
    setIsEditModalOpen(true); // Open the edit modal
  };

  const handleSave = async (updatedData) => {
    try {
      const recordRef = doc(db, 'medicalData', currentRecord.id);
      await updateDoc(recordRef, updatedData);
      alert('Medical record updated successfully!');
      fetchMedicalRecords(); // Refresh the medical records
      setIsEditModalOpen(false); // Close the edit modal
      setCurrentRecord(null); // Reset current record
    } catch (error) {
      console.error('Error updating medical record:', error);
      alert('Error updating medical record. Please try again.');
    }
  };

  const handleGetQrClick = () => {
    navigate(`/myqrcode/${uid}`);
  };

  const filterRecordsByDate = (records, selectedDate) => {
    if (!selectedDate) return records;
  
    // Convert selectedDate to just the date part (YYYY-MM-DD) in UTC
    const selectedDateUTC = new Date(
      Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())
    ).toISOString().split('T')[0];
  
    return records.filter(record => {
      // Parse the record date as a Date object and convert to YYYY-MM-DD in UTC
      const recordDate = new Date(record.date);
      const recordDateUTC = new Date(
        Date.UTC(recordDate.getFullYear(), recordDate.getMonth(), recordDate.getDate())
      ).toISOString().split('T')[0];
  
      return recordDateUTC === selectedDateUTC;
    });
  };
  

  const filteredRecords = filterRecordsByDate(medicalRecords, selectedDate);

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

     

      {/* Modal for adding new medical data */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <MedicalDataForm
              uid={uid}
              patient={patient}
              onClose={() => setIsAddModalOpen(false)}
              onRefresh={fetchMedicalRecords} // Pass the refresh function
            />
          </div>
        </div>
      )}

      {/* Modal for editing medical data */}
      {isEditModalOpen && currentRecord && (
        <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <MedicalDataForm
              uid={uid}
              patient={patient}
              onClose={() => setIsEditModalOpen(false)}
              onRefresh={fetchMedicalRecords} // Pass the refresh function
              initialData={currentRecord} // Pass the current record for editing
              onSave={handleSave} // Pass the save function
            />
          </div>
        </div>
      )}

      <h2>Previous Medical Records</h2>
      <button className="medical-records-addNew" onClick={() => setIsAddModalOpen(true)}>
        <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} /> Add New Record
      </button>
      {/* Date picker to search records by date */}
      <div className="medical-records-date-picker-container">
          <h2>Search Medical Records by Date</h2>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            isClearable
            placeholderText="Select a date"
          />
        </div>

      <div className="medical-records-scroll">
        <div className="medical-records-container">
          {filteredRecords.length > 0 ? (
            filteredRecords.map(record => (
              <div className="medical-record-card" key={record.id}>
                <h3>Record Date: {record.date}</h3>
                <p><strong>Doctor's Name:</strong> {record.doctorName}</p>
                <p><strong>Sugar Level:</strong> {record.sugarLevel}</p>
                <p><strong>Cholesterol:</strong> {record.cholesterol}</p>
                <p><strong>Blood Pressure:</strong> {record.pressure}</p>
                <p><strong>Weight:</strong> {record.weight}</p>

                {/* View/Download PDF Button */}
                {record.pdfReportUrl ? (
                  <a
                    href={record.pdfReportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="medical-record-view-report"
                  >
                    View/Download Report
                  </a>
                ) : (
                  <p>No PDF report available</p>
                )}

                <button className="medical-record-edit" onClick={() => handleEditClick(record)}>
                  Edit
                </button> {/* Edit Button */}
              </div>
            ))
          ) : (
            <p>No medical records found for the selected date.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MedicalProfile;
