import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { updateRoutine } from "../api/routines";
import { useParams } from "react-router-dom";

export default function UpdateRoutine() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const { token } = useAuth("");
  const navigate = useNavigate("");
  return (
    <form
      on
      submit={async (event) => {
        event.preventDefault();
        const updateRoutine = await updateRoutine(id, name, goal, token);
        console.log(updateRoutine);
        navigate("/");
      }}
    >
      <input
        className="updateIn"
        value={name}
        onChange={(event) => setName(event.target.value)}
        type="text"
        placeholder="updated Routine"
      />
      <input
        className="updateIn"
        value={goal}
        onChange={(event) => setGoal(event.target.value)}
        type="text"
        placeholder="update Goal"
      />
      <button> Submit </button>
    </form>
  );
}