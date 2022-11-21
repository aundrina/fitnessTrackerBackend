import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchRoutineById, deleteRoutine } from "../api/routines";
import styles from "../styles/Routines.module.css";
import useUsers from "../hooks/useUsers";

function SingleRoutine() {
  const navigate = useNavigate();
  const { routineId } = useParams();
  const { users } = useUsers();
  const [routine, setRoutine] = useState({});

  useEffect(() => {
    async function getSingleRoutine() {
      const getRoutine = await fetchRoutineById(routineId);
      setRoutine(getRoutine);
    }
    getSingleRoutine();
  }, []);
  console.log("routine", routine);

  return (
    <div className={styles.Routines}>
      <div className={styles.head}>
        <h1>
          <b>Routine</b>
        </h1>
      </div>
      <div key={routine.id}>
        <h3>Routine: {routine.name}</h3>
        <h6>Goal: {routine.goal}</h6>
        <h6>Creator: {routine.creatorName}</h6>
      </div>
    </div>
  );
}

export default SingleRoutine;
