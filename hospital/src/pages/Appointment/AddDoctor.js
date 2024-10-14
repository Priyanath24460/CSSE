/*import React, { useState } from 'react';
import { db, storage } from '../../Database/FireBaseConfig'; // Import Firestore and Storage from your config
import { collection, addDoc } from 'firebase/firestore'; // For Firestore
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // For Firebase Storage
import { v4 as uuidv4 } from 'uuid'; // To generate unique IDs

const AddDoctor = () => {
    const [doctorName, setDoctorName] = useState('');
    const [docID, setDocID] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [experience, setExperience] = useState(''); // New field for years of experience
    const [location, setLocation] = useState(''); // New field for location
    const [bio, setBio] = useState(''); // New field for short bio
    const [consultationFee, setConsultationFee] = useState(''); // New field for consultation fee
    const [availability, setAvailability] = useState([{ day: '', startTime: '', endTime: '' }]);
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    // Function to handle image upload to Firebase Storage
    const handleImageUpload = async () => {
        if (image == null) return null;

        const imageRef = ref(storage, `doctorImages/${image.name + uuidv4()}`); // Create a reference
        const snapshot = await uploadBytes(imageRef, image); // Upload the file
        const downloadURL = await getDownloadURL(snapshot.ref); // Get the image URL after upload
        return downloadURL; // Return the download URL
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            // Upload the image and get the URL
            const imageUrl = await handleImageUpload();

            // Add doctor data to Firestore
            await addDoc(collection(db, 'doctors'), {
                doctorName,
                docID,
                speciality,
                experience,
                location,
                bio,
                consultationFee: consultationFee ? parseFloat(consultationFee) : null, // Convert to number or null
                availability,
                imageUrl, // Store the image URL
            });

            alert('Doctor added successfully!');
            // Clear the form after submission
            setDoctorName('');
            setDocID('');
            setSpeciality('');
            setExperience('');
            setLocation('');
            setBio('');
            setConsultationFee('');
            setAvailability([{ day: '', startTime: '', endTime: '' }]);
            setImage(null);
        } catch (error) {
            console.error('Error adding doctor: ', error);
            alert('Failed to add doctor.');
        } finally {
            setUploading(false);
        }
    };

    // Function to handle availability input changes
    const handleAvailabilityChange = (index, field, value) => {
        const newAvailability = [...availability];
        newAvailability[index][field] = value;
        setAvailability(newAvailability);
    };

    // Function to add another availability row
    const addAvailabilityRow = () => {
        setAvailability([...availability, { day: '', startTime: '', endTime: '' }]);
    };

    return (
        <div>
            <h2>Add Doctor</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Doctor Name:</label>
                    <input
                        type="text"
                        value={doctorName}
                        onChange={(e) => setDoctorName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Doctor ID:</label>
                    <input
                        type="text"
                        value={docID}
                        onChange={(e) => setDocID(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Speciality:</label>
                    <input
                        type="text"
                        value={speciality}
                        onChange={(e) => setSpeciality(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Years of Experience:</label>
                    <input
                        type="number"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Location:</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Short Bio or Introduction:</label>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        maxLength={500} // Optional character limit
                        required
                    />
                </div>
                <div>
                    <label>Consultation Fee (Rs):</label>
                    <input
                        type="number"
                        value={consultationFee}
                        onChange={(e) => setConsultationFee(e.target.value)}
                        placeholder="Enter consultation fee"
                    />
                </div>

                <div>
                    <label>Availability:</label>
                    {availability.map((slot, index) => (
                        <div key={index}>
                            <label>Day:</label>
                            <select
                                value={slot.day}
                                onChange={(e) => handleAvailabilityChange(index, 'day', e.target.value)}
                                required
                            >
                                <option value="">Select Day</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </select>
                            <label>Start Time:</label>
                            <input
                                type="time"
                                value={slot.startTime}
                                onChange={(e) => handleAvailabilityChange(index, 'startTime', e.target.value)}
                                required
                            />
                            <label>End Time:</label>
                            <input
                                type="time"
                                value={slot.endTime}
                                onChange={(e) => handleAvailabilityChange(index, 'endTime', e.target.value)}
                                required
                            />
                        </div>
                    ))}
                    <button type="button" onClick={addAvailabilityRow}>Add Another Slot</button>
                </div>

                <div>
                    <label>Doctor Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                    />
                </div>

                <button type="submit" disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Add Doctor'}
                </button>
            </form>
        </div>
    );
};

export default AddDoctor;*/


import React, { useState } from 'react';
import { db, storage } from '../../Database/FireBaseConfig'; // Import Firestore and Storage from your config
import { collection, addDoc } from 'firebase/firestore'; // For Firestore
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // For Firebase Storage
import { v4 as uuidv4 } from 'uuid'; // To generate unique IDs
import './AddDoctor.css'; // Import the CSS file

const AddDoctor = () => {
    const [doctorName, setDoctorName] = useState('');
    const [docID, setDocID] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [experience, setExperience] = useState(''); // New field for years of experience
    const [location, setLocation] = useState(''); // New field for location
    const [bio, setBio] = useState(''); // New field for short bio
    const [consultationFee, setConsultationFee] = useState(''); // New field for consultation fee
    const [availability, setAvailability] = useState([{ day: '', startTime: '', endTime: '' }]);
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    // Function to handle image upload to Firebase Storage
    const handleImageUpload = async () => {
        if (image == null) return null;

        const imageRef = ref(storage, `doctorImages/${image.name + uuidv4()}`); // Create a reference
        const snapshot = await uploadBytes(imageRef, image); // Upload the file
        const downloadURL = await getDownloadURL(snapshot.ref); // Get the image URL after upload
        return downloadURL; // Return the download URL
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            // Upload the image and get the URL
            const imageUrl = await handleImageUpload();

            // Add doctor data to Firestore
            await addDoc(collection(db, 'doctors'), {
                doctorName,
                docID,
                speciality,
                experience,
                location,
                bio,
                consultationFee: consultationFee ? parseFloat(consultationFee) : null, // Convert to number or null
                availability,
                imageUrl, // Store the image URL
            });

            alert('Doctor added successfully!');
            // Clear the form after submission
            setDoctorName('');
            setDocID('');
            setSpeciality('');
            setExperience('');
            setLocation('');
            setBio('');
            setConsultationFee('');
            setAvailability([{ day: '', startTime: '', endTime: '' }]);
            setImage(null);
        } catch (error) {
            console.error('Error adding doctor: ', error);
            alert('Failed to add doctor.');
        } finally {
            setUploading(false);
        }
    };

    // Function to handle availability input changes
    const handleAvailabilityChange = (index, field, value) => {
        const newAvailability = [...availability];
        newAvailability[index][field] = value;
        setAvailability(newAvailability);
    };

    // Function to add another availability row
    const addAvailabilityRow = () => {
        setAvailability([...availability, { day: '', startTime: '', endTime: '' }]);
    };

    return (
        <div className="add-doctor-container">
            <h2 className="add-doctor-title">Add Doctor</h2>
            <form className="add-doctor-form" onSubmit={handleSubmit}>
                <div>
                    <label className="add-doctor-label">Doctor Name:</label>
                    <input
                        className="add-doctor-input"
                        type="text"
                        value={doctorName}
                        onChange={(e) => setDoctorName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="add-doctor-label">Doctor ID:</label>
                    <input
                        className="add-doctor-input"
                        type="text"
                        value={docID}
                        onChange={(e) => setDocID(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="add-doctor-label">Speciality:</label>
                    <input
                        className="add-doctor-input"
                        type="text"
                        value={speciality}
                        onChange={(e) => setSpeciality(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="add-doctor-label">Years of Experience:</label>
                    <input
                        className="add-doctor-input"
                        type="number"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="add-doctor-label">Location:</label>
                    <input
                        className="add-doctor-input"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="add-doctor-label">Short Bio or Introduction:</label>
                    <textarea
                        className="add-doctor-textarea"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        maxLength={500} // Optional character limit
                        required
                    />
                </div>
                <div>
                    <label className="add-doctor-label">Consultation Fee (Rs):</label>
                    <input
                        className="add-doctor-input"
                        type="number"
                        value={consultationFee}
                        onChange={(e) => setConsultationFee(e.target.value)}
                        placeholder="Enter consultation fee"
                    />
                </div>

                <div className="add-doctor-availability">
                    <label className="add-doctor-label">Availability:</label>
                    {availability.map((slot, index) => (
                        <div key={index}>
                            <label className="add-doctor-label">Day:</label>
                            <select
                                className="add-doctor-select"
                                value={slot.day}
                                onChange={(e) => handleAvailabilityChange(index, 'day', e.target.value)}
                                required
                            >
                                <option value="">Select Day</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </select>
                            <label className="add-doctor-label">Start Time:</label>
                            <input
                                className="add-doctor-input"
                                type="time"
                                value={slot.startTime}
                                onChange={(e) => handleAvailabilityChange(index, 'startTime', e.target.value)}
                                required
                            />
                            <label className="add-doctor-label">End Time:</label>
                            <input
                                className="add-doctor-input"
                                type="time"
                                value={slot.endTime}
                                onChange={(e) => handleAvailabilityChange(index, 'endTime', e.target.value)}
                                required
                            />
                        </div>
                    ))}
                    <button type="button" onClick={addAvailabilityRow} className="add-doctor-button">
                        Add Another Availability
                    </button>
                </div>

                <div>
                    <label className="add-doctor-label">Upload Doctor's Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="add-doctor-image-input"
                    />
                </div>
                <button type="submit" className="add-doctor-button" disabled={uploading}>
                    {uploading ? 'Adding...' : 'Add Doctor'}
                </button>
            </form>
        </div>
    );
};

export default AddDoctor;

