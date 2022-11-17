import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchRoutineById,
  updateRoutine,
  deleteRoutine,
} from "../api/routines";
import useAuth from "../context/UsersContext";
import styles from "../styles/SingleRoutine.module.css";

function SingleRoutine() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { routineId } = useParams();
  console.log("The routineId is", routineId);
  const [singleRoutine, setSingleRoutine] = useState({});
  const [content, setContent] = useState();

  useEffect(() => {
    async function getSingleRoutine() {
      const getRoutine = await fetchRoutineById(routineId);
      setSingleRoutine(getRoutine);
    }

    getSingleRoutine();
  }, []);

  return (
    <div>
      <div className={styles.singlepost}>
        <h3 className={styles.title}>{singleRoutine.name}</h3>
        <h4>{singleRoutine.goal}</h4>
        {/* <h5>Activities {`singleRoutine.${activityId}`}</h5> */}
        {user?._id === singleRoutine.creator_id && (
          <button
            onClick={async () => {
              await deleteRoutine(singleRoutine._id);
              navigate("/");
            }}
          >
            Delete Routine
          </button>
        )}
      </div>
      <div>
        {user?._id === singleRoutine.creator_id && (
          <button
            onClick={async () => {
              navigate(`/routes/routines/${routineId}`);
            }}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default SingleRoutine;
