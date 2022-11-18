import "./App.css";
import NavBar from "./components/NavBar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Routines from "./components/Routines";
import UpdateRoutine from "./components/UpdateRoutine";
import Activities from "./components/Activities";
import SingleRoutine from "./components/SingleRoutine";
import NewActivity from "./components/CreateActivity";
import NewRoutine from "./components/CreateRoutine";
import User from "./components/User";
import useUsers from "./hooks/useUsers";
import MyRoutines from "./components/MyRoutines";
import UpdateActivity from "./components/UpdateActivities";

function App() {
  const { user } = useUsers();
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar user={user} />
        <Routes>
          <Route path="/" element={<Routines />} />
          <Route path="/user/:userFunction" element={<User />} />
          <Route path="/UpdateRoutine/:routineId" element={<UpdateRoutine />} />
          <Route
            path="/UpdateActivity/:activityId"
            element={<UpdateActivity />}
          />
          <Route path="/Routines/:routineId" element={<SingleRoutine />} />
          <Route path="/MyRoutines" element={<MyRoutines />} />
          <Route path="/Activities" element={<Activities />} />
          <Route path="/MyRoutines/CreateRoutine" element={<NewRoutine />} />
          <Route path="/Activities/CreateActivity" element={<NewActivity />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
