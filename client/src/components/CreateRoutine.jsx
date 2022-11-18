import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRoutine } from "../api/routines";
import styles from "../styles/CreateActivity.module.css";
import Form from "react-bootstrap/Form";
import useUsers from "../hooks/useUsers";

export default function NewRoutine() {
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [goal, setGoal] = useState();
  const [is_public, setIsPublic] = useState();

  return (
    <div>
      <h3 className={styles.post}>Create a Routine </h3>
      <form
        className={styles.create}
        onSubmit={async (e) => {
          e.preventDefault();
          const result = await createRoutine(name, goal, is_public);
          console.log(name, goal, is_public);
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
        <label> Checkmark for Routine to be made Public </label>
        <input
          type="radio"
          placeholder="is_public"
          value={is_public}
          onChange={() => {
            setIsPublic(!is_public);
          }}
        ></input>

        <button type="submit"> Submit</button>
      </form>
    </div>
  );
}
