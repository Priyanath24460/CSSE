import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { db } from '../../Database/FireBaseConfig';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MedicalRecords = () => {
    const [cholesterolData, setCholesterolData] = useState(null); // Use null initially
    const [pressureData, setPressureData] = useState(null);
    const [sugarData, setSugarData] = useState(null);
    const [loading, setLoading] = useState(true); // Add a loading state
  
    useEffect(() => {
      const fetchPatientData = async () => {
        const patientUid = "Sk0YmgwJI2hPA3ZsVwPmCy6siIM2";
        const q = query(collection(db, "medicalData"), where("uid", "==", patientUid));
  
        const querySnapshot = await getDocs(q);
        const dates = [];
        const cholesterol = [];
        const pressure = [];
        const sugarLevel = [];
  
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.date && data.cholesterol && data.pressure && data.sugarLevel) {
            dates.push(data.date); 
            cholesterol.push(data.cholesterol);
            pressure.push(data.pressure);
            sugarLevel.push(data.sugarLevel);
          }
        });
  
        // Set chart data only if data is present
        if (dates.length > 0 && cholesterol.length > 0 && pressure.length > 0 && sugarLevel.length > 0) {
          setCholesterolData({
            labels: dates,
            datasets: [{
              label: 'Cholesterol',
              data: cholesterol,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            }]
          });
  
          setPressureData({
            labels: dates,
            datasets: [{
              label: 'Pressure',
              data: pressure,
              backgroundColor: 'rgba(255, 159, 64, 0.2)',
              borderColor: 'rgba(255, 159, 64, 1)',
              borderWidth: 1,
            }]
          });
  
          setSugarData({
            labels: dates,
            datasets: [{
              label: 'Sugar Level',
              data: sugarLevel,
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
            }]
          });
        }
  
        setLoading(false); // Data has been fetched
      };
  
      fetchPatientData();
    }, []);
  
    // Display loading state while fetching data
    if (loading) {
      return <p>Loading...</p>;
    }
  
    // Check if data exists before rendering the charts
    if (!cholesterolData || !pressureData || !sugarData) {
      return <p>No data available</p>;
    }
  
    return (
      <div>
        <h2>Patient Medical Data</h2>
  
        {/* Cholesterol Chart */}
        <div style={{ width: '40%', margin: '0 auto' }}>
          <h3>Cholesterol Levels Over Time</h3>
          <Bar data={cholesterolData} options={{ responsive: true }} />
        </div>
  
        {/* Pressure Chart */}
        <div style={{ width: '40%', margin: '0 auto' }}>
          <h3>Pressure Levels Over Time</h3>
          <Bar data={pressureData} options={{ responsive: true }} />
        </div>
  
        {/* Sugar Level Chart */}
        <div style={{ width: '40%', margin: '0 auto' }}>
          <h3>Sugar Levels Over Time</h3>
          <Bar data={sugarData} options={{ responsive: true }} />
        </div>
      </div>
    );
  };
  

  
  export default MedicalRecords;
  