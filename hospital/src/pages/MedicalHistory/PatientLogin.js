import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Firebase Auth
import { useNavigate } from 'react-router-dom'; // Import navigation hook

function PatientLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState(null); // State to manage login errors
  const [success, setSuccess] = useState(null); // State to manage login success
  const navigate = useNavigate(); // Create navigation function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const auth = getAuth();
    const { email, password } = formData;

    try {
      // Log in the user with Firebase Auth
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess('Login successful!'); // Display success message
      navigate('/doctors'); // Redirect to the MyQrCode page after successful login
    } catch (error) {
      // Handle errors here
      setError('Failed to login. Please check your credentials.');
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <h2>Patient Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display login error */}
      {success && <p style={{ color: 'green' }}>{success}</p>} {/* Display success message */}
    </div>
  );
}

export default PatientLogin;
