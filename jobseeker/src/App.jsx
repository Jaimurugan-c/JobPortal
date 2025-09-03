import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
     import 'bootstrap/dist/css/bootstrap.min.css';
     import Signup from './pages/Signup';
     import Login from './pages/Login';
     import SubmitForm from './pages/SubmitForm';


     function App() {
       return (
         <Router>
         
           <Routes>
             <Route path="/signup" element={<Signup />} />
             <Route path="/login" element={<Login />} />
             <Route path="/submit" element={<SubmitForm />} />
             <Route path="/" element={<Login />} />
           </Routes>
          
         </Router>
       );
     }

     export default App;