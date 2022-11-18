import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateActivity } from "../api/activities";
import { useParams } from "react-router-dom";

export default function UpdateActivity() {
  const { activityId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [description, setDescription] = useState();

  return (
    <>
      <h3>Edit Activity </h3>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const result = await updateActivity(name, description, activityId);
          navigate("/Activities");
          console.log(result);
        }}
      >
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <button type="submit"> Submit</button>
      </form>
    </>
  );
}
