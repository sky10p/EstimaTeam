import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { CreateRoomPage } from './pages/CreateRoomPage/CreateRoomPage';
import { RoomFirebase } from './pages/RoomPageFirebase/RoomPageFirebase';

const App = () => {
  
  return (
    <div className="App">
     <div>
      <Header title='EstimaTeam' />
    </div>
    <Router>
     <Routes>
        <Route path="/" element={<CreateRoomPage/>} />
        <Route path="/room/:id" element={<RoomFirebase/>} />
        <Route path='*' element={<div>Not Found</div>} />
     </Routes>
   </Router>
    </div>
   
  
  );
}

export default App;
