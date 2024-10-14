import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, addDoc, getDocs, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { db, storage } from '../../Database/FireBaseConfig'; // Correct imports

function MedicalReport() {
  const { uid } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [reportName, setReportName] = useState('');
  const [reportDate, setReportDate] = useState(new Date());
  const [pdfFile, setPdfFile] = useState(null);
  const [reports, setReports] = useState([]);

  // Toggle form visibility
  const toggleForm = () => setShowForm(!showForm);

  // Handle PDF file selection
  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  // Add report to Firestore and upload PDF to Firebase Storage
  const addReport = async (e) => {
    e.preventDefault();

    if (!pdfFile) {
      alert('Please upload a PDF file');
      return;
    }

    try {
      // Upload PDF to Firebase Storage
      const storageRef = ref(storage, `reports/${uid}/${pdfFile.name}`);
      await uploadBytes(storageRef, pdfFile);
      const pdfUrl = await getDownloadURL(storageRef);

      // Add report details to Firestore (store reportDate as Firestore Timestamp)
      await addDoc(collection(db, 'medicalReports'), {
        uid,
        reportName,
        reportDate: Timestamp.fromDate(reportDate), // Convert JavaScript date to Firestore Timestamp
        pdfUrl,
      });

      // Reset form
      setReportName('');
      setReportDate(new Date());
      setPdfFile(null);

      // Fetch updated reports list
      fetchReports();
      toggleForm();
    } catch (error) {
      console.error('Error adding report: ', error);
    }
  };

  // Fetch reports from Firestore
  const fetchReports = async () => {
    const querySnapshot = await getDocs(collection(db, 'medicalReports'));
    const reportsData = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().uid === uid) {
        const reportData = doc.data();
        reportsData.push({
          id: doc.id,
          ...reportData,
          reportDate: reportData.reportDate.toDate(), // Convert Firestore Timestamp to JavaScript Date
        });
      }
    });
    setReports(reportsData);
  };

  // Load reports when the component mounts
  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div>
      <h1>Medical Report</h1>
      <button onClick={toggleForm}>
        {showForm ? 'Close Form' : 'Add Report'}
      </button>

      {showForm && (
        <form onSubmit={addReport}>
          <div>
            <label>Report Name:</label>
            <input
              type="text"
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Select Date:</label>
            <DatePicker
              selected={reportDate}
              onChange={(date) => setReportDate(date)}
              required
            />
          </div>
          <div>
            <label>Upload PDF:</label>
            <input type="file" accept="application/pdf" onChange={handleFileChange} required />
          </div>
          <button type="submit">Submit Report</button>
        </form>
      )}

      <h2>Reports List</h2>
      <ul>
        {reports.map((report) => (
          <li key={report.id}>
            <strong>{report.reportName}</strong> - {new Date(report.reportDate).toLocaleDateString()} -{' '}
            <a href={report.pdfUrl} target="_blank" rel="noopener noreferrer">View PDF</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MedicalReport;
