import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRoutine } from "../api/routines";
import styles from "../styles/CreateActivity.module.css";
import Form from "react-bootstrap/Form"

export default function NewRoutine() {
  const navigate = useNavigate();

  const [name, setName] = useState([]);
  const [goal, setGoal] = useState([]);
  const [is_public, setIsPublic] = useState([]);
  const [creator_id, setCreatorId] = useState([]);

  return (
    <div>
      <h3 className={styles.post}>Create a Routine </h3>
      <form
        className={styles.create}
        onSubmit={async (e) => {
          e.preventDefault();
          const result = await createRoutine(name, goal, is_public, creator_id);
          console.log(name, goal);
          navigate("/");
        }}
      >
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="goal"
          value={goal}
          onChange={(e) => {
            setGoal(e.target.value);
          }}
        ></input>
        <input 

        <button type="submit"> Submit</button>
      </form>
    </div>
  );
}
