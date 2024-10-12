/*import React, { useState, useEffect } from 'react'; // Make sure useEffect is imported
import { db } from '../Database/FireBaseConfig'; // Firestore config
import { collection, addDoc, getDocs } from 'firebase/firestore';
import './AddAppointment.css'; // CSS for styling

const AddAppointment = ({ doctor, onClose }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientContact, setPatientContact] = useState('');
  const [note, setNote] = useState(''); // State for note field
  const [status, setStatus] = useState('Pending');
  const [appointments, setAppointments] = useState([]); // State to store existing appointments

  // Fetch existing appointments when the component mounts
  const fetchAppointments = async () => {
    const appointmentsCollection = collection(db, 'appointments');
    const appointmentSnapshot = await getDocs(appointmentsCollection);
    const appointmentList = appointmentSnapshot.docs.map(doc => doc.data());
    setAppointments(appointmentList);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for overlapping appointments
    const appointmentTime = new Date(`${date}T${time}`);
    const appointmentEndTime = new Date(appointmentTime.getTime() + 20 * 60000); // Add 20 minutes

    const conflictingAppointments = appointments.filter(appointment => {
      const existingAppointmentTime = new Date(`${appointment.date}T${appointment.time}`);
      const existingAppointmentEndTime = new Date(existingAppointmentTime.getTime() + 20 * 60000);
      return (
        appointment.doctorId === doctor.docID &&
        (appointmentTime < existingAppointmentEndTime && existingAppointmentTime < appointmentEndTime)
      );
    });

    if (conflictingAppointments.length > 0) {
      // Find the next available time slot
      const nextAvailableTime = findNextAvailableTime(conflictingAppointments, appointmentEndTime);
      alert(`This time slot is not available. The next available appointment can be made at ${nextAvailableTime}.`);
      return;
    }

    try {
      await addDoc(collection(db, 'appointments'), {
        doctorId: doctor.docID,
        doctorName: doctor.doctorName,
        date,
        time,
        patientName,
        patientContact,
        note, // Include the note in the appointment data
        status,
      });
      alert('Appointment added successfully!');
      onClose(); // Close the form after submission
    } catch (error) {
      console.error('Error adding appointment: ', error);
      alert('Failed to add appointment.');
    }
  };

  // Function to find the next available time slot after a given end time
  const findNextAvailableTime = (conflictingAppointments, endTime) => {
    // Sort conflicting appointments by their end times
    conflictingAppointments.sort((a, b) => {
      const aEndTime = new Date(`${a.date}T${a.time}`).getTime() + 20 * 60000; // 20 minutes duration
      const bEndTime = new Date(`${b.date}T${b.time}`).getTime() + 20 * 60000;
      return aEndTime - bEndTime;
    });

    // Check the last conflicting appointment to suggest the next available slot
    const lastConflictEndTime = new Date(`${conflictingAppointments[conflictingAppointments.length - 1].date}T${conflictingAppointments[conflictingAppointments.length - 1].time}`);
    const nextAvailable = new Date(lastConflictEndTime.getTime() + 20 * 60000); // Suggest 15 minutes after the last conflict

    // Format the next available time in a user-friendly way
    const options = { hour: '2-digit', minute: '2-digit', hour12: false };
    return nextAvailable.toLocaleTimeString([], options);
  };

  return (
    <div className="appointment-modal">
      <div className="appointment-form-container">
        <h2>Book Appointment with Dr. {doctor.doctorName}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Patient Name:</label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Contact Number:</label>
            <input
              type="text"
              value={patientContact}
              onChange={(e) => setPatientContact(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Time:</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Note:</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Any additional information..."
            />
          </div>
          <div>
            <label>Status:</label>
            <input type="text" value={status} readOnly />
          </div>
          <button type="submit">Book Appointment</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddAppointment;
*/

import React, { useState, useEffect } from 'react'; // Make sure useEffect is imported
import { db } from '../../Database/FireBaseConfig'; // Firestore config
import { collection, addDoc, getDocs } from 'firebase/firestore';
import './AddAppointment.css'; // CSS for styling

const AddAppointment = ({ doctor, onClose }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientContact, setPatientContact] = useState('');
  const [note, setNote] = useState(''); // State for note field
  const [status, setStatus] = useState('Pending');
  const [appointments, setAppointments] = useState([]); // State to store existing appointments

  // Fetch existing appointments when the component mounts
  const fetchAppointments = async () => {
    const appointmentsCollection = collection(db, 'appointments');
    const appointmentSnapshot = await getDocs(appointmentsCollection);
    const appointmentList = appointmentSnapshot.docs.map(doc => doc.data());
    setAppointments(appointmentList);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for overlapping appointments
    const appointmentTime = new Date(`${date}T${time}`);
    const appointmentEndTime = new Date(appointmentTime.getTime() + 20 * 60000); // Add 20 minutes

    const conflictingAppointments = appointments.filter(appointment => {
      const existingAppointmentTime = new Date(`${appointment.date}T${appointment.time}`);
      const existingAppointmentEndTime = new Date(existingAppointmentTime.getTime() + 20 * 60000);
      return (
        appointment.doctorId === doctor.docID &&
        (appointmentTime < existingAppointmentEndTime && existingAppointmentTime < appointmentEndTime)
      );
    });

    if (conflictingAppointments.length > 0) {
      const nextAvailableTime = findNextAvailableTime(conflictingAppointments, appointmentEndTime);
      alert(`This time slot is not available. The next available appointment can be made at ${nextAvailableTime}.`);
      return;
    }

    try {
      await addDoc(collection(db, 'appointments'), {
        doctorId: doctor.docID,
        doctorName: doctor.doctorName,
        date,
        time,
        patientName,
        patientContact,
        note,
        status,
      });
      alert('Appointment added successfully!');
      onClose();
    } catch (error) {
      console.error('Error adding appointment: ', error);
      alert('Failed to add appointment.');
    }
  };

  // Function to find the next available time slot after a given end time
  const findNextAvailableTime = (conflictingAppointments, endTime) => {
    conflictingAppointments.sort((a, b) => {
      const aEndTime = new Date(`${a.date}T${a.time}`).getTime() + 20 * 60000; // 20 minutes duration
      const bEndTime = new Date(`${b.date}T${b.time}`).getTime() + 20 * 60000;
      return aEndTime - bEndTime;
    });

    const lastConflictEndTime = new Date(`${conflictingAppointments[conflictingAppointments.length - 1].date}T${conflictingAppointments[conflictingAppointments.length - 1].time}`);
    const nextAvailable = new Date(lastConflictEndTime.getTime() + 20 * 60000);

    const options = { hour: '2-digit', minute: '2-digit', hour12: true }; // Change hour12 to true
    return nextAvailable.toLocaleTimeString([], options);
  };

  // Function to convert time to AM/PM format
  const convertTo12Hour = (time24) => {
    const [hour, minutes] = time24.split(':');
    const hourInt = parseInt(hour, 10);
    const period = hourInt >= 12 ? 'PM' : 'AM';
    const hour12 = hourInt % 12 || 12; // Convert 0 or 12 to 12
    return `${hour12}:${minutes} ${period}`;
  };

  return (
    <div className="appointment-modal">
      <div className="appointment-form-container">
        <h2 className="appointment-h2">Book Appointment with Dr. {doctor.doctorName}</h2>

        {/* Display doctor information */}
        <div className="doctor-info">
          <p><strong>Doctor ID:</strong> {doctor.docID}</p>
          <p><strong>Speciality:</strong> {doctor.speciality}</p>
          <div className="availability">
            <strong>Availability:</strong>
            <ul>
              {doctor.availability.map((slot, idx) => (
                <li key={idx}>
                  {slot.day}: {convertTo12Hour(slot.startTime)} - {convertTo12Hour(slot.endTime)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <form className="appointment-form" onSubmit={handleSubmit}>
          <div>
            <label className="appointment-label" >Patient Name:</label>
            <input className="appointment-input"
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="appointment-label">Contact Number:</label>
            <input className="appointment-input"
              type="text"
              value={patientContact}
              onChange={(e) => setPatientContact(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="appointment-label">Date:</label>
            <input className="appointment-input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="appointment-label">Time:</label>
            <input className="appointment-input"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="appointment-label">Note:</label>
            <textarea className="appointment-textarea"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Any additional information..."
            />
          </div>
          <div>
            <label className="appointment-label">Status:</label>
            <input className="appointment-input" type="text" value={status} readOnly />
          </div>
          <button className="appointment-submit-btn" type="submit">Book Appointment</button>
          <button className="appointment-cancel-btn" type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddAppointment;
