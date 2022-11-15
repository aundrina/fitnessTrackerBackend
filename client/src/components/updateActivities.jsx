import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import updateActivities from "../api/Activities";

export default function UpdateActivities() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { token } = useAuth("");
  const navigate = useNavigate("");
  return (
    <form
      on
      submit={async (event) => {
        event.preventDefault();
        const UpdateActivities = await updateActivities(
          id,
          name,
          description,
          token
        );
        console.log(UpdateActivities);
        navigate("/");
      }}
    >
      <input
        className="updateIn"
        value={name}
        onChange={(event) => setName(event.target.value)}
        type="text"
        placeholder="updated Activities"
      />
      <input
        className="updateIn"
        value={description}
        onChange={(event) => setGoal(event.target.value)}
        type="text"
        placeholder="update Description"
      />
      <button> Submit </button>
    </form>
  );
}
