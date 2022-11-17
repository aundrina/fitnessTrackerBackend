import { useState } from "react";
// import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { updateRoutine } from "../api/routines";
import { useParams } from "react-router-dom";

export default function UpdateRoutine() {
  const { RoutineId } = useParams();
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  // const { token } = useAuth("");
  const navigate = useNavigate("");
  return (
    <>
      <h3>Edit Routine </h3>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const result = await updateRoutine(name, goal, RoutineId);
          navigate("/");
          console.log(result);
        }}
      >
        <input
          type="text"
          placeholder="title"
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
        <button type="submit"> Submit</button>
      </form>
    </>
  );
}
