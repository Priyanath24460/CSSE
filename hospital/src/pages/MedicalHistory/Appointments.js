import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../Database/FireBaseConfig';
import './Appointmentslist.css'; // Importing the new CSS for styling

function Appointments() {
  const { uid, name } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [diagnosis, setDiagnosis] = useState('');
  const [medication, setMedication] = useState('');

  // Utility function to check if an appointment is today
  const isToday = (dateStr) => {
    const appointmentDate = new Date(dateStr);
    const today = new Date();
    return (
      appointmentDate.getDate() === today.getDate() &&
      appointmentDate.getMonth() === today.getMonth() &&
      appointmentDate.getFullYear() === today.getFullYear()
    );
  };

  // Fetch appointments for the current user and filter by status
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const q = query(collection(db, 'appointments'), where('userId', '==', uid));
        const querySnapshot = await getDocs(q);
        const appointmentsData = querySnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(appointment => appointment.status === 'Approved'); // Filter for Approved status

        setAppointments(appointmentsData);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [uid]);

  // Open the modal and set the current appointment details
  const handleAddDiagnosis = (appointment) => {
    setCurrentAppointment(appointment);
    setIsModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDiagnosis('');
    setMedication('');
    setCurrentAppointment(null);
  };

  // Handle form submission to save the diagnosis and medication
  const handleSaveDiagnosis = async () => {
    if (currentAppointment && diagnosis && medication) {
      try {
        await addDoc(collection(db, 'diagnosis'), {
          doctorName: currentAppointment.doctorName,
          appointmentId: currentAppointment.id,
          userId: uid,
          diagnosis,
          medication,
          date: new Date().toISOString(),
        });
        console.log('Diagnosis and medication saved successfully!');
        handleCloseModal(); // Close modal after saving
      } catch (error) {
        console.error('Error saving diagnosis:', error);
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="appointmentslist-container">
      <h2 className="appointmentslist-heading">{`Appointments for ${name}`}</h2>
      {appointments.length > 0 ? (
        <ul className="appointmentslist-list">
          {appointments.map((appointment, index) => (
            <li
              key={index}
              className={`appointmentlist-card ${isToday(appointment.date) ? 'today-appointment' : ''}`} // Add conditional class
              style={isToday(appointment.date) ? { borderColor: '#67ea97' } : {}}
            >
              {/* Display "Today" tag if it's today's appointment */}
              {isToday(appointment.date) && <span className="today-tag">Today</span>}
              <p className="appointmentlist-detail"><strong>Doctor Name:</strong> {appointment.doctorName}</p>
              <p className="appointmentlist-detail"><strong>Date:</strong> {appointment.date}</p>
              <p className="appointmentlist-detail"><strong>Time:</strong> {appointment.time}</p>
              <p className="appointmentlist-detail"><strong>Note:</strong> {appointment.note}</p>
              <p className="appointmentlist-detail"><strong>Status:</strong> {appointment.status}</p>
              <button
                className="add-diagnosis-button"
                onClick={() => handleAddDiagnosis(appointment)}
              >
                Add Diagnosis
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-appointmentslist-message">No approved appointments found.</p>
      )}

      {isModalOpen && (
        <div className="modalDiagnosis-overlay">
          <div className="modalDiagnosis-content">
            <h2>Add Diagnosis</h2>
            <form>
              <div className="formDiagnosis-group">
                <label>Doctor Name:</label>
                <input
                  type="text"
                  value={currentAppointment?.doctorName || ''}
                  disabled
                  className="formDiagnosis-input"
                />
              </div>
              <div className="formDiagnosis-group">
                <label>Diagnosis:</label>
                <textarea
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  className="formDiagnosis-input"
                  placeholder="Enter diagnosis"
                />
              </div>
              <div className="formDiagnosis-group">
                <label>Medication:</label>
                <textarea
                  value={medication}
                  onChange={(e) => setMedication(e.target.value)}
                  className="formDiagnosis-input"
                  placeholder="Enter medication"
                />
              </div>
              <button type="button" className="saveDiagnosis-button" onClick={handleSaveDiagnosis}>
                Save
              </button>
              <button type="button" className="cancelDiagnosis-button" onClick={handleCloseModal}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Appointments;
