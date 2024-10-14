/*import React, { useState, useEffect } from 'react';
import { db } from '../../Database/FireBaseConfig'; // Firestore config
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { sendNotification } from './SendNotification'; // Notification function (we will define this)
import './ManageAppointment.css'; // CSS for styling

const ManageAppointment = () => {
  const [appointments, setAppointments] = useState([]); // State to store appointments
  const [loading, setLoading] = useState(true);

  // Helper function to format time into 12-hour format with AM/PM
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  // Fetch all appointments when the component mounts
  const fetchAppointments = async () => {
    try {
      const appointmentsCollection = collection(db, 'appointments');
      const appointmentSnapshot = await getDocs(appointmentsCollection);
      const appointmentList = appointmentSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAppointments(appointmentList);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update appointment status
  const updateAppointmentStatus = async (appointmentId, newStatus, userId, doctorName, date, time) => {
    try {
      const appointmentRef = doc(db, 'appointments', appointmentId);
      await updateDoc(appointmentRef, { status: newStatus });
      alert(`Appointment ${newStatus} successfully!`);

      // Send notification to the user (patient)
      const message = `Your appointment with  ${doctorName} on ${date} at ${formatTime(time)} has been ${newStatus}.`;
      sendNotification(userId, message);

      // Refresh the appointments list
      fetchAppointments();
    } catch (error) {
      console.error('Error updating appointment status:', error);
      alert('Failed to update appointment status.');
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) {
    return <div>Loading appointments...</div>;
  }

  return (
    <div className="manage-appointments">
      <h2>Manage Appointments</h2>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Doctor Name</th>
            <th>Patient Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.doctorName}</td>
              <td>{appointment.patientName}</td>
              <td>{appointment.date}</td>
              <td>{formatTime(appointment.time)}</td> 
              <td>{appointment.status}</td>
              <td>
                {appointment.status === 'Pending' ? (
                  <div className="action-buttons">
                    <button
                      className="approve-button"
                      onClick={() =>
                        updateAppointmentStatus(
                          appointment.id,
                          'Approved',
                          appointment.userId,
                          appointment.doctorName,
                          appointment.date,
                          appointment.time
                        )
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="reject-button"
                      onClick={() =>
                        updateAppointmentStatus(
                          appointment.id,
                          'Rejected',
                          appointment.userId,
                          appointment.doctorName,
                          appointment.date,
                          appointment.time
                        )
                      }
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <span>{appointment.status}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageAppointment;
*/

/*
import React, { useState, useEffect } from 'react';
import { db } from '../../Database/FireBaseConfig'; // Firestore config
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { sendNotification } from './SendNotification'; // Notification function (we will define this)
import './ManageAppointment.css'; // CSS for styling

const ManageAppointment = () => {
  const [appointments, setAppointments] = useState([]); // State to store appointments
  const [loading, setLoading] = useState(true);

  // Helper function to format time into 12-hour format with AM/PM
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  // Fetch all appointments when the component mounts
  const fetchAppointments = async () => {
    try {
      const appointmentsCollection = collection(db, 'appointments');
      const appointmentSnapshot = await getDocs(appointmentsCollection);
      const appointmentList = appointmentSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAppointments(appointmentList);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update appointment status
  const updateAppointmentStatus = async (appointmentId, newStatus, userId, doctorName, date, time) => {
    try {
      const appointmentRef = doc(db, 'appointments', appointmentId);
      await updateDoc(appointmentRef, { status: newStatus });
      alert(`Appointment ${newStatus} successfully!`);

      // Send notification to the user (patient)
      const message = `Your appointment with ${doctorName} on ${date} at ${formatTime(time)} has been ${newStatus}.`;
      sendNotification(userId, message);

      // Refresh the appointments list
      fetchAppointments();
    } catch (error) {
      console.error('Error updating appointment status:', error);
      alert('Failed to update appointment status.');
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) {
    return <div>Loading appointments...</div>;
  }

  return (
    <div className="manage-appointments">
      <h2>Manage Appointments</h2>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Doctor Name</th>
            <th>Patient Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.doctorName}</td>
              <td>{appointment.patientName}</td>
              <td>{appointment.date}</td>
              <td>{formatTime(appointment.time)}</td>
              <td>{appointment.status}</td>
              <td>
                <div className="action-buttons">
                  {appointment.status === 'Pending' && (
                    <>
                      <button
                        className="approve-button"
                        onClick={() =>
                          updateAppointmentStatus(
                            appointment.id,
                            'Approved',
                            appointment.userId,
                            appointment.doctorName,
                            appointment.date,
                            appointment.time
                          )
                        }
                      >
                        Approve
                      </button>
                      <button
                        className="reject-button"
                        onClick={() =>
                          updateAppointmentStatus(
                            appointment.id,
                            'Rejected',
                            appointment.userId,
                            appointment.doctorName,
                            appointment.date,
                            appointment.time
                          )
                        }
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {appointment.status === 'Approved' && (
                    <button
                      className="reject-button"
                      onClick={() =>
                        updateAppointmentStatus(
                          appointment.id,
                          'Rejected',
                          appointment.userId,
                          appointment.doctorName,
                          appointment.date,
                          appointment.time
                        )
                      }
                    >
                      Reject
                    </button>
                  )}

                  {appointment.status === 'Rejected' && (
                    <button
                      className="approve-button"
                      onClick={() =>
                        updateAppointmentStatus(
                          appointment.id,
                          'Approved',
                          appointment.userId,
                          appointment.doctorName,
                          appointment.date,
                          appointment.time
                        )
                      }
                    >
                      Approve
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageAppointment;
*/


import React, { useState, useEffect } from 'react';
import { db } from '../../Database/FireBaseConfig'; // Firestore config
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { sendNotification } from './SendNotification'; // Notification function
import './ManageAppointment.css'; // CSS for styling

const ManageAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All'); // State for filtering

  // Helper function to format time into 12-hour format with AM/PM
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  // Fetch all appointments when the component mounts
  const fetchAppointments = async () => {
    try {
      const appointmentsCollection = collection(db, 'appointments');
      const appointmentSnapshot = await getDocs(appointmentsCollection);
      const appointmentList = appointmentSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAppointments(appointmentList);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update appointment status
  const updateAppointmentStatus = async (appointmentId, newStatus, userId, doctorName, date, time) => {
    try {
      const appointmentRef = doc(db, 'appointments', appointmentId);
      await updateDoc(appointmentRef, { status: newStatus });
      alert(`Appointment ${newStatus} successfully!`);

      // Send notification to the user (patient)
      const message = `Your appointment with ${doctorName} on ${date} at ${formatTime(time)} has been ${newStatus}.`;
      sendNotification(userId, message);

      // Refresh the appointments list
      fetchAppointments();
    } catch (error) {
      console.error('Error updating appointment status:', error);
      alert('Failed to update appointment status.');
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) {
    return <div className="loading-text">Loading appointments...</div>;
  }

  // Filter appointments based on the selected filter
  const filteredAppointments = appointments.filter((appointment) =>
    filter === 'All' ? true : appointment.status === filter
  );

  return (
    <div className="manage-appointments-container">
      <h2 className="appointments-header">Manage Appointments</h2>

      {/* Filter by status using radio buttons */}
      <div className="filter-container">
        <label className="filter-label">
          <input
            type="radio"
            name="filter"
            value="All"
            checked={filter === 'All'}
            onChange={() => setFilter('All')}
          />
          All
        </label>
        <label className="filter-label">
          <input
            type="radio"
            name="filter"
            value="Pending"
            checked={filter === 'Pending'}
            onChange={() => setFilter('Pending')}
          />
          Pending
        </label>
        <label className="filter-label">
          <input
            type="radio"
            name="filter"
            value="Approved"
            checked={filter === 'Approved'}
            onChange={() => setFilter('Approved')}
          />
          Approved
        </label>
        <label className="filter-label">
          <input
            type="radio"
            name="filter"
            value="Rejected"
            checked={filter === 'Rejected'}
            onChange={() => setFilter('Rejected')}
          />
          Rejected
        </label>
      </div>

      <table className="appointments-table">
        <thead>
          <tr className="table-header">
            <th className="header-cell">Doctor Name</th>
            <th className="header-cell">Patient Name</th>
            <th className="header-cell">Date</th>
            <th className="header-cell">Time</th>
            <th className="header-cell">Status</th>
            <th className="header-cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map((appointment) => (
            <tr key={appointment.id} className="appointment-row">
              <td className="appointment-cell">{appointment.doctorName}</td>
              <td className="appointment-cell">{appointment.patientName}</td>
              <td className="appointment-cell">{appointment.date}</td>
              <td className="appointment-cell">{formatTime(appointment.time)}</td>
              <td className="appointment-cell">{appointment.status}</td>
              <td className="appointment-cell">
                <div className="action-buttons">
                  {appointment.status === 'Pending' && (
                    <>
                      <button
                        className="approve-button"
                        onClick={() =>
                          updateAppointmentStatus(
                            appointment.id,
                            'Approved',
                            appointment.userId,
                            appointment.doctorName,
                            appointment.date,
                            appointment.time
                          )
                        }
                      >
                        Approve
                      </button>
                      <button
                        className="reject-button"
                        onClick={() =>
                          updateAppointmentStatus(
                            appointment.id,
                            'Rejected',
                            appointment.userId,
                            appointment.doctorName,
                            appointment.date,
                            appointment.time
                          )
                        }
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {appointment.status === 'Approved' && (
                    <button
                      className="reject-button"
                      onClick={() =>
                        updateAppointmentStatus(
                          appointment.id,
                          'Rejected',
                          appointment.userId,
                          appointment.doctorName,
                          appointment.date,
                          appointment.time
                        )
                      }
                    >
                      Reject
                    </button>
                  )}

                  {appointment.status === 'Rejected' && (
                    <button
                      className="approve-button"
                      onClick={() =>
                        updateAppointmentStatus(
                          appointment.id,
                          'Approved',
                          appointment.userId,
                          appointment.doctorName,
                          appointment.date,
                          appointment.time
                        )
                      }
                    >
                      Approve
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageAppointment;
