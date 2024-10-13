import React, { useRef, useState, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr'; // QR code decoding
import { useNavigate } from 'react-router-dom'; // useNavigate for navigation
import { db } from '../../Database/FireBaseConfig'; // Firebase config
import { doc, getDoc } from 'firebase/firestore'; // Firestore methods

function QrCodeScanner() {
  const webcamRef = useRef(null); // Reference to the webcam
  const [data, setData] = useState(''); // To store scanned UID
  const [error, setError] = useState(null); // To manage errors
  const navigate = useNavigate(); // Hook for navigating between routes

  // Function to capture and decode QR code
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot(); // Capture a screenshot

    if (imageSrc) {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);

        // Get image data from the canvas
        const imageData = context.getImageData(0, 0, img.width, img.height);
        const code = jsQR(imageData.data, img.width, img.height); // Decode QR code

        if (code) {
          console.log('QR Code detected:', code.data); // Log the decoded data
          setData(code.data); // Set the scanned UID
        } else {
          console.log('QR Code not detected');
        }
      };
    }
  }, [webcamRef]);

  // Automatically capture QR code every second
  useEffect(() => {
    const interval = setInterval(() => {
      capture(); // Continuously capture images from the webcam
    }, 1000); // Adjust the interval as needed

    return () => clearInterval(interval); // Clear the interval on unmount
  }, [capture]);

  // When a UID is detected, navigate to the MedicalProfile page
  useEffect(() => {
    if (data) {
      navigate(`/medicalprofile/${data}`); // Navigate to MedicalProfile page with scanned UID
    }
  }, [data, navigate]);

  return (
    <div>
      <h2>Scan QR Code</h2>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={400} // Set width of the webcam
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && <p>Scanned UID: {data}</p>}
    </div>
  );
}

export default QrCodeScanner;
