/*import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Database/FireBaseConfig'; // Import Firestore from your config
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate
import AddAppointment from '../Appointment/AddAppointment'; // Import the AddAppointment component
import './ViewDoctor.css'; // Import your CSS for styling

const ViewDoctor = () => {
    const { doctorId } = useParams(); // Get the doctorId from the URL
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

    // Fetch doctor details based on doctorId
    const fetchDoctorDetails = async () => {
        const docRef = doc(db, 'doctors', doctorId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            setDoctor({ ...docSnap.data(), id: docSnap.id });
        } else {
            console.error('No such document!');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchDoctorDetails();
    }, [doctorId]);

    const handleSubmitAppointment = () => {
        setIsModalOpen(true); // Open the appointment modal
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the appointment modal
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!doctor) {
        return <div>No doctor found!</div>;
    }

    return (
        <div className="view-doctor-container">
            <h2>{doctor.doctorName}</h2>
            <img src={doctor.imageUrl} alt={`${doctor.doctorName}'s profile`} className="view-doctor-image" />
            <p><strong>Speciality:</strong> {doctor.speciality}</p>
            <p><strong>Years of Experience:</strong> {doctor.experience} years</p>
            <p><strong>Location:</strong> {doctor.location}</p>
            <p><strong>Bio:</strong> {doctor.bio}</p>
            <p><strong>Consultation Fee:</strong> Rs. {doctor.consultationFee}</p>
            <h3>Availability</h3>
            <ul>
                {doctor.availability.map((slot, index) => (
                    <li key={index}>{slot.day}: {slot.startTime} - {slot.endTime}</li>
                ))}
            </ul>
            <button onClick={handleSubmitAppointment} className="submit-appointment-button">
                Submit Appointment
            </button>

            
            {isModalOpen && (
                <AddAppointment doctor={doctor} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default ViewDoctor;*/



import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Database/FireBaseConfig'; // Import Firestore from your config
import { useParams } from 'react-router-dom'; // Import useParams
import AddAppointment from '../Appointment/AddAppointment'; // Import the AddAppointment component
import './ViewDoctor.css'; // Import your CSS for styling

const ViewDoctor = () => {
    const { doctorId } = useParams(); // Get the doctorId from the URL
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

    // Fetch doctor details based on doctorId
    const fetchDoctorDetails = async () => {
        const docRef = doc(db, 'doctors', doctorId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            setDoctor({ ...docSnap.data(), id: docSnap.id });
        } else {
            console.error('No such document!');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchDoctorDetails();
    }, [doctorId]);

    const handleSubmitAppointment = () => {
        setIsModalOpen(true); // Open the appointment modal
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the appointment modal
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!doctor) {
        return <div>No doctor found!</div>;
    }

    return (
        <div className="view-doctor-container">
            <h2 className="doctor-name">{doctor.doctorName}</h2>
            <img src={doctor.imageUrl} alt={`${doctor.doctorName}'s profile`} className="doctor-image" />
            <div className="doctor-details">
                <p className="doctor-speciality"><strong>Speciality:</strong> {doctor.speciality}</p>
                <p className="doctor-experience"><strong>Years of Experience:</strong> {doctor.experience} years</p>
                <p className="doctor-location"><strong>Location:</strong> {doctor.location}</p>
                <p className="doctor-bio"><strong>Bio:</strong> {doctor.bio}</p>
                <p className="doctor-fee"><strong>Consultation Fee:</strong> Rs. {doctor.consultationFee}</p>
            </div>
            <h3 className="doctor-availability-title">Availability</h3>
            <ul className="doctor-availability-list">
                {doctor.availability.map((slot, index) => (
                    <li key={index} className="availability-slot">{slot.day}: {slot.startTime} - {slot.endTime}</li>
                ))}
            </ul>
            <button onClick={handleSubmitAppointment} className="submit-appointment-button">
                Submit Appointment
            </button>

            {/* Modal for Adding Appointment */}
            {isModalOpen && (
                <AddAppointment doctor={doctor} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default ViewDoctor;
