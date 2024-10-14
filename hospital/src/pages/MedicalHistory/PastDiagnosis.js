import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../Database/FireBaseConfig';
import './PastDiagnosis.css'; // Import the updated CSS for styling

function PastDiagnosis() {
  const { uid } = useParams();
  const [diagnoses, setDiagnoses] = useState([]);
  const [expandedDiagnosis, setExpandedDiagnosis] = useState({});

  // Fetch past diagnosis records for the current user
  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const q = query(collection(db, 'diagnosis'), where('userId', '==', uid));
        const querySnapshot = await getDocs(q);
        const diagnosesData = querySnapshot.docs.map(doc => ({
          id: doc.id, // Store document ID for deletion
          ...doc.data()
        }));
        setDiagnoses(diagnosesData);
      } catch (error) {
        console.error('Error fetching diagnosis data:', error);
      }
    };

    fetchDiagnoses();
  }, [uid]);

  const toggleExpand = (index) => {
    setExpandedDiagnosis(prevState => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const getTruncatedText = (text, limit) => {
    if (text.length <= limit) return text;
    return `${text.slice(0, limit)}...`;
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'diagnosis', id)); // Delete document from Firestore
      setDiagnoses(diagnoses.filter(diagnosis => diagnosis.id !== id)); // Update UI
    } catch (error) {
      console.error('Error deleting diagnosis:', error);
    }
  };

  return (
    <div className="pastdiagnosis-container">
      <h2 className="pastdiagnosis-heading">Past Diagnoses</h2>
      {diagnoses.length > 0 ? (
        <ul className="pastdiagnosis-list">
          {diagnoses.map((diagnosis, index) => (
            <li key={diagnosis.id} className="pastdiagnosis-card">
              <div className="pastdiagnosis-left">
                <p className="pastdiagnosis-detail"><strong>Doctor Name:</strong> {diagnosis.doctorName}</p>
                <p className="pastdiagnosis-detail"><strong>Date:</strong> {new Date(diagnosis.date).toLocaleString()}</p>
              </div>
              <div className="pastdiagnosis-right">
                <p className="pastdiagnosis-detail">
                  <strong>Diagnosis:</strong> 
                  {expandedDiagnosis[index]
                    ? diagnosis.diagnosis
                    : getTruncatedText(diagnosis.diagnosis, 100)}
                  {diagnosis.diagnosis.length > 100 && (
                    <button
                      className="read-more-btn"
                      onClick={() => toggleExpand(index)}
                    >
                      {expandedDiagnosis[index] ? 'Read Less' : 'Read More'}
                    </button>
                  )}
                </p>
                <p className="pastdiagnosis-detail">
                  <strong>Medication:</strong> 
                  {expandedDiagnosis[index]
                    ? diagnosis.medication
                    : getTruncatedText(diagnosis.medication, 100)}
                  {diagnosis.medication.length > 100 && (
                    <button
                      className="read-more-btn"
                      onClick={() => toggleExpand(index)}
                    >
                      {expandedDiagnosis[index] ? 'Read Less' : 'Read More'}
                    </button>
                  )}
                </p>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(diagnosis.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-pastdiagnosis-message">No diagnosis records found.</p>
      )}
    </div>
  );
}

export default PastDiagnosis;
