/*import React, { useEffect, useState } from 'react';
import { db } from '../Database/FireBaseConfig'; // Firestore config
import { collection, getDocs } from 'firebase/firestore';
import './Doctors.css'; // Import the CSS file
import AddAppointment from './AddAppointment'; // Import the AddAppointment component

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null); // Track selected doctor for appointment

  // Fetch the doctor data from Firestore
  const fetchDoctors = async () => {
    const doctorsCollection = collection(db, 'doctors');
    const doctorSnapshot = await getDocs(doctorsCollection);
    const doctorList = doctorSnapshot.docs.map(doc => doc.data());
    setDoctors(doctorList);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Function to handle appointment button click
  const handleAppointment = (doctor) => {
    setSelectedDoctor(doctor);
  };

  // Function to close the appointment form
  const closeAppointmentForm = () => {
    setSelectedDoctor(null);
  };

  return (
    <div className="doctors-container">
      <h2>Our Doctors</h2>
      <div className="doctors-grid">
        {doctors.map((doctor, index) => (
          <div className="doctor-card" key={index}>
            <img src={doctor.imageUrl} alt={`${doctor.doctorName}`} className="doctor-image" />
            <div className="doctor-info">
              <h3>{doctor.doctorName}</h3>
              <p><strong>ID:</strong> {doctor.docID}</p>
              <p><strong>Speciality:</strong> {doctor.speciality}</p>
              <div className="availability">
                <strong>Available:</strong>
                <ul>
                  {doctor.availability.map((slot, idx) => (
                    <li key={idx}>
                      {slot.day}: {slot.startTime} - {slot.endTime}
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={() => handleAppointment(doctor)}>Make Appointment</button>
            </div>
          </div>
        ))}
      </div>
      {selectedDoctor && (
        <AddAppointment 
          doctor={selectedDoctor} 
          onClose={closeAppointmentForm} 
        />
      )}
    </div>
  );
};

export default Doctors;
*/

import React, { useEffect, useState } from 'react';
import { db } from '../../Database/FireBaseConfig'; // Firestore config
import { collection, getDocs } from 'firebase/firestore';
import './Doctors.css'; // Import the CSS file
import AddAppointment from '../Appointment/AddAppointment'; // Import the AddAppointment component

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null); // Track selected doctor for appointment

  // Fetch the doctor data from Firestore
  const fetchDoctors = async () => {
    const doctorsCollection = collection(db, 'doctors');
    const doctorSnapshot = await getDocs(doctorsCollection);
    const doctorList = doctorSnapshot.docs.map(doc => doc.data());
    setDoctors(doctorList);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Function to handle appointment button click
  const handleAppointment = (doctor) => {
    setSelectedDoctor(doctor);
  };

  // Function to close the appointment form
  const closeAppointmentForm = () => {
    setSelectedDoctor(null);
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
    <div className="doctors-container">
      <h2 className="doctors-h2">Our Doctors</h2>
      <div className="doctors-grid">
        {doctors.map((doctor, index) => (
          <div className="doctor-card" key={index}>
            <img src={doctor.imageUrl} alt={`${doctor.doctorName}`} className="doctor-image" />
            <div className="doctor-info">
              <h3>{doctor.doctorName}</h3>
              <p><strong>ID:</strong> {doctor.docID}</p>
              <p><strong>Speciality:</strong> {doctor.speciality}</p>
              <div className="availability">
                <strong>Available:</strong>
                <ul>
                  {doctor.availability.map((slot, idx) => (
                    <li key={idx}>
                      {slot.day}: {convertTo12Hour(slot.startTime)} - {convertTo12Hour(slot.endTime)}
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={() => handleAppointment(doctor)}>Make Appointment</button>
            </div>
          </div>
        ))}
      </div>
      {selectedDoctor && (
        <AddAppointment 
          doctor={selectedDoctor} 
          onClose={closeAppointmentForm} 
        />
      )}
    </div>
  );
};

export default Doctors;
