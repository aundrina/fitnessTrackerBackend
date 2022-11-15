import "./App.css";
import Auth from "./components/Auth";
import NavBar from "./components/NavBar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Routines from "./components/Routines";
import UpdateRoutine from "./components/UpdateRoutine";

import Login from "./components/Auth";
import Register from "./components/Auth";
import useAuth from "./hooks/useAuth";
function App() {
  const { setToken, user } = useAuth();
  const login = "/auth/login";
  const register = "/auth/register";
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar user={user} setToken={setToken} />
        <Routes>
          <Route path="/" element={<Routines />} />
          <Route path="/updateRoutine" element={<UpdateRoutine />} />
          <Route path="/auth/login" element={<Login setToken={setToken} />} />
          <Route
            path="/auth/register"
            element={<Register setToken={setToken} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
