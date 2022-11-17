import { Link } from "react-router-dom";
import styles from "../styles/NavBar.module.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../styles/logo.png";
import { logoutUser } from "../api/users";
import { useNavigate } from "react-router-dom";

function NavBar({ user }) {
  const navigate = useNavigate();
  if (user.user === "Guest") {
    return (
      <Navbar className={styles.background}>
        <div className={styles.header}>
          <img src={logo} height={70} width={150} alt="Logo" />
          <Link className={styles.welcome} to="/">
            {" "}
          </Link>
        </div>
        <Nav.Item>
          <Link className={styles.text} to="/">
            Home
          </Link>
        </Nav.Item>{" "}
        <Nav.Item>
          <Link className={styles.text} to="/Activities">
            Activities
          </Link>
        </Nav.Item>
        {user.user === "Guest" ? (
          <>
            {" "}
            <Nav.Item>
              <Link className={styles.text} to="/user/register">
                Register
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link className={styles.text} to="/user/login">
                Login
              </Link>
            </Nav.Item>
          </>
        ) : (
          ""
        )}
      </Navbar>
    );
  }

  return (
    <>
      <Navbar className={styles.background}>
        <div className={styles.header}>
          <img src={logo} height={70} width={150} alt="Logo" />
          <Link className={styles.welcome} to="/">
            {" "}
          </Link>
          <Nav.Item className={styles.welcome}>
            Welcome, {user.username}{" "}
          </Nav.Item>
        </div>
        <Nav.Item>
          <Link className={styles.text} to="/">
            Home
          </Link>
        </Nav.Item>{" "}
        <Nav.Item>
          <Link className={styles.text} to="/MyRoutines">
            My Routines
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link className={styles.text} to="/Activities">
            Activities
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link
            className={styles.text}
            onClick={async () => {
              await logoutUser();
              navigate("/user/login");
            }}
          >
            Log Out
          </Link>
        </Nav.Item>
      </Navbar>
    </>
  );
}

export default NavBar;
