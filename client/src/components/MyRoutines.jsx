import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userRoutines } from "../api/users";
import styles from "../styles/Routines.module.css";
import { Link } from "react-router-dom";
import { NavItem } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";

export default function UserRoutines() {
  const Navigate = useNavigate();
  const [routines, setRoutines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function getMyRoutines() {
      const info = await userRoutines();
      setRoutines(info.myRoutines);
    }
    getMyRoutines();
  }, []);

  function RoutineMatches(routine, text) {
    return routine.name.toLowerCase().includes(text);
  }

  const filteredRoutines = routines?.filter((routine) =>
    RoutineMatches(routine, searchTerm)
  );
  const routinesToDisplay = searchTerm.length ? filteredRoutines : routines;

  return (
    <div className={styles.Routines}>
      <Nav.Item>
        <Link to="CreateRoutine"> Create Routine </Link>
      </Nav.Item>
      <input
        className={styles.search}
        type="text"
        value={searchTerm}
        placeholder="Search..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className={styles.head}>
        <h1>
          <b>My Routines</b>
        </h1>
      </div>
      {routinesToDisplay?.map((routine) => {
        return (
          <div key={routine.id}>
            <h3>Routine: {routine.name}</h3>
            <h6>Goal: {routine.goal}</h6>
            <h6>Creator: {routine.creatorName}</h6>
            {/* <button
              onClick={() => {
                navigate(`/routines/${routine.id}`);
              }}
            >
              See Routine
            </button> */}
          </div>
        );
      })}
    </div>
  );
}
