
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import UserRegister from './pages/MedicalHistory/UserRegister'
import PatientLogin from './pages/MedicalHistory/PatientLogin';
import MyQrCode from './pages/MedicalHistory/MyQrCode';
import QrCodeScanner from './pages/MedicalHistory/QrcodeScanner';
import HospitalHome from './pages/MedicalHistory/HospitalHome';
import ViewAllPatient from './pages/MedicalHistory/ViewAllPatient';
import MedicalProfile from './pages/MedicalHistory/MedicalProfile';



function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
      <Route path='/' element={<HospitalHome/>}/>
        <Route path='/register' element={<UserRegister/>}/>
        <Route path='/viewallpatient' element={<ViewAllPatient/>}/>
        <Route path='/login' element={<PatientLogin/>}/>
        
        <Route path='/myqrcodescanner' element={<QrCodeScanner/>}/>
        <Route path="/medicalprofile/:uid" element={<MedicalProfile />} /> {/* Correct route for MedicalProfile */}
        <Route path="/myqrcode/:uid" element={<MyQrCode />} />
      </Routes>
      
    </div>
    </Router>
  );
}

export default App;
