import "./App.css";
import Auth from "./components/Auth";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Routines from "./components/Routines";

function App() {
  // const { user } = useAuth();
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Routines />} />
      </Routes>
    </div>
  );
}

export default App;
