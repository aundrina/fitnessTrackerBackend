import { fetchRoutines } from "../api/routines";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Routines.module.css";

function Routines() {
  const navigate = useNavigate();
  const [routines, setRoutines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function getRoutines() {
      const info = await fetchRoutines();
      setRoutines(info.allRoutines);
    }
    getRoutines();
  }, []);

  function RoutineMatches(routine, text) {
    return routine.name.toLowerCase().includes(text);
  }

  const filteredRoutines = routines.filter((routine) =>
    RoutineMatches(routine, searchTerm)
  );
  const routinesToDisplay = searchTerm.length ? filteredRoutines : routines;

  return (
    <div className={styles.Routines}>
      <input
        className={styles.search}
        type="text"
        value={searchTerm}
        placeholder="Search..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className={styles.head}>
        <h1>
          <b>Public Routines</b>
        </h1>
      </div>
      {routinesToDisplay.map((routine) => {
        return (
          <div key={routine.id}>
            <h3>Routine: {routine.name}</h3>
            <h6>Goal: {routine.goal}</h6>
            <h6>Creator: {routine.creatorName}</h6>
            <button
              onClick={() => {
                navigate(`/routines/${routine.id}`);
              }}
            >
              See Routine
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Routines;
