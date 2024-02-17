import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { CreateRoomPage } from "./pages/CreateRoomPage/CreateRoomPage";
import { RoomFirebase } from "./pages/RoomPageFirebase/RoomPageFirebase";
import { AuthProvider } from "./contexts/AuthContext";
import {
  LoadingStateContext,
  LoadingDispatcherContext,
} from "./contexts/LoadingContext";
import { useState } from "react";

const App = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="App">
      <AuthProvider>
        <LoadingDispatcherContext.Provider value={ setLoading }>
          <div>
            <LoadingStateContext.Provider value={ loading }>
              <Header title="EstimaTeam" />
            </LoadingStateContext.Provider>
          </div>
          <Router>
            <Routes>
              <Route path="/" element={<CreateRoomPage />} />
              <Route path="/room/:id" element={<RoomFirebase />} />
              <Route path="*" element={<div>Not Found</div>} />
            </Routes>
          </Router>
        </LoadingDispatcherContext.Provider>
      </AuthProvider>
    </div>
  );
};

export default App;
