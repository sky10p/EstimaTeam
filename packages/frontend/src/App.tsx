import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Room } from './pages/RoomPage';
import { Header } from './components/Header/Header';
import { CreateRoomPage } from './pages/CreateRoomPage/CreateRoomPage';

const App = () => {
  
  return (
    <div className="App">
     <div>
      <Header title='EstimaTeam' />
    </div>
    <Router>
     <Routes>
        <Route path="/" element={<CreateRoomPage/>} />
        <Route path="/room/:id" element={<Room/>} />
        <Route path='*' element={<div>Not Found</div>} />
     </Routes>
   </Router>
    </div>
   
  
  );
}

export default App;
