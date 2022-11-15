import { useParams, useState } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetchActivities } from "../api/Activities";

function Activities() {
  // const navigate = useNavigate();
  const [Activities, setActivities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function getActivities() {
      const info = await fetchActivities();
      setActivities(info.allActivities);
      console.log("info", info);
    }
    getActivities();
  }, []);

  function ActivityMatches(activity, text) {
    return activity.name.toLowerCase().includes(text);
  }

  const filteredActivities = activities.filter((activities) =>
    ActivityMatches(activity, searchTerm)
  );
  const activitiesToDisplay = searchTerm.length
    ? filteredActivities
    : activities;

  return (
    <div className={styles.Routines}>
      <input
        className={styles.search}
        type="text"
        value={searchTerm}
        placeholder="Search..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className={styles.head}>
        <h1>
          <b>Activities</b>
        </h1>
      </div>
      {activitiesToDisplay.map((activities) => {
        return (
          <div key={activity.id}>
            <h3>name: {activities.name}</h3>
            <h6>description: {activities.description}</h6>
          </div>
        );
      })}
    </div>
  );
}

export default Activities;
