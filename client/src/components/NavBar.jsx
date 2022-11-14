import { Link } from "react-router-dom";
import styles from "../styles/NavBar.module.css";
import Nav from "react-bootstrap/Nav";
import logo from "../styles/fitnesstracker.png";

function NavBar() {
  return (
    <Nav className={styles.background}>
      <div className={styles.header}>
        <img src={logo} height={70} width={150} alt="Logo" />
        <Link className={styles.welcome} to="/">
          <Nav.Item>Hello, user</Nav.Item>
        </Link>
      </div>

      <Nav.Item>
        <Link className={styles.text} to="/Activities">
          Activities
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link className={styles.text} to="/CreateRoutine">
          Create Routine
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link className={styles.text} to="/CreateActivity">
          Create Activity
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link className={styles.text} to="/RA">
          Activity By Routine
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link className={styles.text} to="/Auth/Logout">
          Logout
        </Link>
      </Nav.Item>
    </Nav>
  );
}

export default NavBar;
