import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateRoutine } from "../api/routines";
import { useParams } from "react-router-dom";

export default function UpdateRoutine() {
  const { routineId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [goal, setGoal] = useState();
  const [is_public, setIsPublic] = useState();

  return (
    <>
      <h3>Edit Routine </h3>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const result = await updateRoutine(name, goal, is_public, routineId);
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
        />
        <input
          type="text"
          placeholder="goal"
          value={goal}
          onChange={(e) => {
            setGoal(e.target.value);
          }}
        />

        <label> Checkmark for Routine to be made Public </label>
        <input
          type="radio"
          placeholder="is_public"
          value={is_public}
          onChange={() => {
            setIsPublic(!is_public);
          }}
        />

        <button type="submit"> Submit</button>
      </form>
    </>
  );
}
