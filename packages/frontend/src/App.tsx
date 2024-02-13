import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Room } from './pages/Room';

const App = () => {
  
  return (
   <Router>
     <Routes>
        <Route path="/" element={<div>Create Room</div>} />
        <Route path="/room/:id" element={<Room/>} />
        <Route path='*' element={<div>Not Found</div>} />
     </Routes>
   </Router>
  );
}

export default App;
