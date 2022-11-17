import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userRoutines } from "../api/users";
import styles from "../styles/Routines.module.css";

function MyRoutines() {
  const navigate = useNavigate();
  const [myRoutines, setMyRoutines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function routinesByUsername() {
      const routine = await userRoutines();
      setMyRoutines(routine.allRoutines);
    }
    routinesByUsername();
  }, []);
}

export default MyRoutines;
