import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createActivity } from "../api/activities";
import styles from "../styles/CreateActivity.module.css";

export default function NewActivity() {
  const navigate = useNavigate();

  const [name, setName] = useState([]);
  const [description, setDescription] = useState([]);

  return (
    <div>
      <h3 className={styles.post}>Create an Activity </h3>
      <form
        className={styles.create}
        onSubmit={async (e) => {
          e.preventDefault();
          const result = await createActivity(name, description);
          console.log(name, description);
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
          placeholder="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></input>
        <button type="submit"> Submit</button>
      </form>
    </div>
  );
}
