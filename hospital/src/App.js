
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import UserRegister from './pages/UserRegister'

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path='/' element={<UserRegister/>}/>
      </Routes>
      
    </div>
    </Router>
  );
}

export default App;
