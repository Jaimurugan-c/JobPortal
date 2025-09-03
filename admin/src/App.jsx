import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
     import 'bootstrap/dist/css/bootstrap.min.css';
     import Signup from './pages/Signup';
     import Login from './pages/Login';
     import Dashboard from './pages/Dashboard';

     function App() {
       return (
         <Router>
           <Routes>
             <Route path="/signup" element={<Signup />} />
             <Route path="/login" element={<Login />} />
             <Route path="/dashboard" element={<Dashboard />} />
             <Route path="/" element={<Login />} />
           </Routes>
         </Router>
       );
     }

     export default App;