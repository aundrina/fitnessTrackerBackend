import { Link } from "react-router-dom";
import styles from "../styles/NavBar.module.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import logo from "../styles/fitnesstracker.png";

function NavBar({ user, setToken }) {
  return (
    <>
      <Navbar className={styles.background}>
        <div className={styles.header}>
          <img src={logo} height={70} width={150} alt="Logo" />
          <Link className={styles.welcome} to="/">
            {" "}
          </Link>
          <Nav.Item>Hello, {user.username}</Nav.Item>
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
        </Nav.Item>{" "}
        <Nav.Item>
          {user.username === "Guest" ? (
            <>
              <Nav.Item>
                <Link to="/auth/register">Register</Link>
                <Nav.Item>
                  <Link to="/auth/login">Login</Link>
                </Nav.Item>
              </Nav.Item>
            </>
          ) : (
            <Link className={styles.text} to="/Auth/Logout">
              Logout
            </Link>
          )}{" "}
        </Nav.Item>
      </Navbar>
      <>
        {/* <Nav.Item>
          {/* <Link className={styles.text} to="/auth/login">
            Login
          </Link> */}
        {/* </Nav.Item> */}
      </>
    </>
  );
}

export default NavBar;
