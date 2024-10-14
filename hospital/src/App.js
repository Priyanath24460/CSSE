
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import UserRegister from './pages/MedicalHistory/UserRegister'
import PatientLogin from './pages/MedicalHistory/PatientLogin';
import MyQrCode from './pages/MedicalHistory/MyQrCode';
import QrCodeScanner from './pages/MedicalHistory/QrcodeScanner';
import HospitalHome from './pages/MedicalHistory/HospitalHome';
import ViewAllPatient from './pages/MedicalHistory/ViewAllPatient';
import MedicalProfile from './pages/MedicalHistory/MedicalProfile';
import Appointments from './pages/MedicalHistory/Appointments';
import PastDiagnosis from './pages/MedicalHistory/PastDiagnosis';
import MedicalReport from './pages/MedicalHistory/MedicalReport';

import AddDoctor from './pages/Appointment/AddDoctor';
import Doctors from './pages/Appointment/Doctors';
import AddAppointment from './pages/Appointment/AddAppointment';
import ViewDoctor from './pages/Appointment/ViewDoctor';
import ManageAppointment from './pages/Appointment/ManageAppointment';
import SendNotification from './pages/Appointment/SendNotification';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
      <Route path='/' element={<HospitalHome/>}/>
        <Route path='/register' element={<UserRegister/>}/>
        <Route path='/viewallpatient' element={<ViewAllPatient/>}/>
        <Route path='/login' element={<PatientLogin/>}/>
        <Route path='/diagnosis/:uid' element={<PastDiagnosis/>}/>
        <Route path='/medicalreport/:uid' element={<MedicalReport/>}/>


        <Route path="/appointments/:uid/:name" element={<Appointments />} /> {/* New route */}
        <Route path='/myqrcodescanner' element={<QrCodeScanner/>}/>
        <Route path="/medicalprofile/:uid" element={<MedicalProfile />} /> {/* Correct route for MedicalProfile */}
        <Route path="/myqrcode/:uid" element={<MyQrCode />} />
        <Route path='/' element={<UserRegister/>}/>
        <Route path='/addDoctor' element={<AddDoctor/>}/>
        <Route path='/doctors' element={<Doctors/>}/>
        <Route path='/addAppointment' element={<AddAppointment/>}/>
        <Route path="/doctors/:doctorId" element={<ViewDoctor />} />
        <Route path='/manageAppointment' element={<ManageAppointment/>}/>
        <Route path='/sendNotification' element={<SendNotification/>}/>
      </Routes>
      
    </div>
    </Router>
  );
}

export default App;
