import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Routines.module.css";
import { fetchActivities } from "../api/activities";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

function Activities() {
  // const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function getActivities() {
      const info = await fetchActivities();
      setActivities(info.allActivities);
    }
    getActivities();
  }, []);

  function ActivityMatches(activity, text) {
    return activity.name.toLowerCase().includes(text);
  }

  const filteredActivities = activities.filter((activity) =>
    ActivityMatches(activity, searchTerm)
  );
  const activitiesToDisplay = searchTerm.length
    ? filteredActivities
    : activities;

  return (
    <div className={styles.Routines}>
      <Nav.Item>
        <Link to="CreateActivity"> Create Activity </Link>
      </Nav.Item>
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
      {activitiesToDisplay.map((activity) => {
        return (
          <div key={activity.id}>
            <h3>Name: {activity.name}</h3>
            <h6>Description: {activity.description}</h6>
          </div>
        );
      })}
    </div>
  );
}

export default Activities;
