/*import React, { useEffect, useState } from 'react';
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

export default Doctors;*/

/*
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Database/FireBaseConfig'; // Import Firestore from your config
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './Doctors.css'; // Import the CSS for styling

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const navigate = useNavigate(); // Initialize the useNavigate hook

    // Fetch doctor data from Firestore
    const fetchDoctors = async () => {
        const querySnapshot = await getDocs(collection(db, 'doctors'));
        const doctorsList = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setDoctors(doctorsList);
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    // Function to handle navigation to the ViewDoctor component
    const handleViewDoctor = (doctorId) => {
        navigate(`/doctors/${doctorId}`); // Navigate to the doctor details page
    };

    return (
        <div className="doctor-page-container">
            <h2 className="doctor-page-heading">Our Doctors</h2>
            <div className="doctor-page-cards-container">
                {doctors.map((doctor) => (
                    <div key={doctor.id} className="doctor-page-card">
                        <img src={doctor.imageUrl} alt={`${doctor.doctorName}'s profile`} className="doctor-page-image" />
                        <div className="doctor-page-info">
                            <h3>{doctor.doctorName}</h3>
                            <p> {doctor.speciality}</p>
                            <p> {doctor.experience} years experience</p>
                            <p> {doctor.location}</p>
                          
                            <button onClick={() => handleViewDoctor(doctor.id)} className="view-doctor-button">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Doctors;*/

import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Database/FireBaseConfig';
import { useNavigate } from 'react-router-dom';
import './Doctors.css';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]); // State for filtered doctors
    const [specialtyFilter, setSpecialtyFilter] = useState(''); // State for specialty filter
    const [locationFilter, setLocationFilter] = useState(''); // State for location filter
    const [experienceFilter, setExperienceFilter] = useState(''); // State for experience filter
    const navigate = useNavigate();

    // Fetch doctor data from Firestore
    const fetchDoctors = async () => {
        const querySnapshot = await getDocs(collection(db, 'doctors'));
        const doctorsList = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setDoctors(doctorsList);
        setFilteredDoctors(doctorsList); // Initially set all doctors as filtered doctors
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    // Function to handle navigation to the ViewDoctor component
    const handleViewDoctor = (doctorId) => {
        navigate(`/doctors/${doctorId}`);
    };

    // Function to filter doctors based on selected criteria
    const filterDoctors = () => {
        let filtered = doctors;

        // Filter by specialty
        if (specialtyFilter) {
            filtered = filtered.filter((doctor) =>
                doctor.speciality.toLowerCase().includes(specialtyFilter.toLowerCase())
            );
        }

        // Filter by location
        if (locationFilter) {
            filtered = filtered.filter((doctor) =>
                doctor.location.toLowerCase().includes(locationFilter.toLowerCase())
            );
        }

        // Filter by experience
        if (experienceFilter) {
            filtered = filtered.filter((doctor) => doctor.experience >= parseInt(experienceFilter));
        }

        setFilteredDoctors(filtered);
    };

    // Call the filter function when any filter changes
    useEffect(() => {
        filterDoctors();
    }, [specialtyFilter, locationFilter, experienceFilter]); // Re-run filter logic when filter state changes

    return (
        <div className="doctor-page-container">
            <h2 className="doctor-page-heading">Our Doctors</h2>

            {/* Filter Section */}
            <div className="doctor-filter-section">
                <label>
                    Specialty:
                    <input
                        type="text"
                        placeholder="Enter specialty"
                        value={specialtyFilter}
                        onChange={(e) => setSpecialtyFilter(e.target.value)}
                    />
                </label>

                <label>
                    Location:
                    <input
                        type="text"
                        placeholder="Enter location"
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                    />
                </label>

                <label>
                    Minimum Years of Experience:
                    <input
                        type="number"
                        placeholder="Enter years of experience"
                        value={experienceFilter}
                        onChange={(e) => setExperienceFilter(e.target.value)}
                    />
                </label>

                <button className="apply-filter-button" onClick={filterDoctors}>Apply Filter</button>
            </div>

            {/* Cards Section */}
            <div className="doctor-page-cards-container">
                {filteredDoctors.length > 0 ? (
                    filteredDoctors.map((doctor) => (
                        <div key={doctor.id} className="doctor-page-card">
                            <img src={doctor.imageUrl} alt={`${doctor.doctorName}'s profile`} className="doctor-page-image" />
                            <div className="doctor-page-info">
                                <h3>{doctor.doctorName}</h3>
                                <p>{doctor.speciality}</p>
                                <p>{doctor.experience} years experience</p>
                                <p>{doctor.location}</p>
                                <button onClick={() => handleViewDoctor(doctor.id)} className="view-doctor-button">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No doctors found matching your criteria</p>
                )}
            </div>
        </div>
    );
};

export default Doctors;
