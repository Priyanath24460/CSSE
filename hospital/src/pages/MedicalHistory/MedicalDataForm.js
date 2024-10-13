import React, { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db, storage } from '../../Database/FireBaseConfig'; // Firebase storage
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // For file upload
import './MedicalDataForm.css'; // Import the CSS file for styling

const MedicalDataForm = ({ uid, patient, onClose, onRefresh, initialData, onSave }) => {
  const [sugarLevel, setSugarLevel] = useState('');
  const [cholesterol, setCholesterol] = useState('');
  const [pressure, setPressure] = useState('');
  const [weight, setWeight] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [pdfFile, setPdfFile] = useState(null); // New state for PDF file

  useEffect(() => {
    if (initialData) {
      setSugarLevel(initialData.sugarLevel);
      setCholesterol(initialData.cholesterol);
      setPressure(initialData.pressure);
      setWeight(initialData.weight);
      setDoctorName(initialData.doctorName);
      setSelectedDate(initialData.date);
    } else {
      setSugarLevel('');
      setCholesterol('');
      setPressure('');
      setWeight('');
      setDoctorName('');
      setSelectedDate('');
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = new Date(selectedDate).toISOString().split('T')[0];

    const updatedData = {
      sugarLevel,
      cholesterol,
      pressure,
      weight,
      doctorName,
      name: patient.name,
      uid,
      date: formattedDate,
      nic: patient.nic,
    };

    try {
      let pdfUrl = '';

      // Upload PDF file if selected
      if (pdfFile) {
        const storageRef = ref(storage, `medicalReports/${uid}/${pdfFile.name}`);
        const uploadResult = await uploadBytes(storageRef, pdfFile);
        pdfUrl = await getDownloadURL(uploadResult.ref);
      }

      // Save PDF URL in Firestore
      updatedData.pdfReportUrl = pdfUrl; // Store the PDF URL in Firestore

      if (initialData) {
        // If editing existing data, call the onSave function
        onSave(updatedData);
      } else {
        // Add a new document
        const medicalDataRef = collection(db, 'medicalData');
        await addDoc(medicalDataRef, updatedData);
        alert('Medical data saved successfully!');
        onRefresh(); // Update the records
        onClose(); // Close the modal after saving
      }
    } catch (error) {
      console.error('Error saving medical data:', error);
      alert('Error saving medical data. Please try again.');
    }
  };

  return (
    <div className="mdf-modal-content">
      <span className="mdf-close" onClick={onClose}>&times;</span>
      <h2 className="mdf-header">{initialData ? 'Edit Medical Data' : 'Add Medical Data'}</h2>
      <form className="mdf-form" onSubmit={handleSubmit}>
        {/* Other form fields */}
        <label className="mdf-label">
          Date:
          <input
            className="mdf-input-date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
          />
        </label>
        <label className="mdf-label">
          Doctor's Name:
          <input
            className="mdf-input-text"
            type="text"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            required
          />
        </label>
        <label className="mdf-label">
          Sugar Level:
          <input
            className="mdf-input-text"
            type="text"
            value={sugarLevel}
            onChange={(e) => setSugarLevel(e.target.value)}
            required
          />
        </label>
        <label className="mdf-label">
          Cholesterol:
          <input
            className="mdf-input-text"
            type="text"
            value={cholesterol}
            onChange={(e) => setCholesterol(e.target.value)}
            required
          />
        </label>
        <label className="mdf-label">
          Blood Pressure:
          <input
            className="mdf-input-text"
            type="text"
            value={pressure}
            onChange={(e) => setPressure(e.target.value)}
            required
          />
        </label>
        <label className="mdf-label">
          Weight:
          <input
            className="mdf-input-text"
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </label>

        {/* New PDF input field */}
        <label className="mdf-label">
          Upload PDF Report:
          <input
            className="mdf-input-file"
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdfFile(e.target.files[0])}
          />
        </label>

        <button className="mdf-submit-button" type="submit">
          {initialData ? 'Update Medical Data' : 'Save Medical Data'}
        </button>
      </form>
    </div>
  );
};

export default MedicalDataForm;
