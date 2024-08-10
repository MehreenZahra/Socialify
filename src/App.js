import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home/Home';
import Feed from './components/Home/Feed';
import EditProfile from './components/Profile Pages/EditProfile';
import ChangePassword from './components/Profile Pages/ChangePassword';
import AdminLayout from './components/adminPage/AdminLayout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path='/admin' element={<AdminLayout/>}/>
        <Route path="/home" element={<Home/>} >
           <Route index element={<Feed />} />
           <Route path="edit-profile" element={<EditProfile />} />
           <Route path="change-password" element={<ChangePassword />} />
        </Route> 
      
      </Routes>
    </Router>
  );
};

export default App;
