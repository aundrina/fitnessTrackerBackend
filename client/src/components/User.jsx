import { useState } from "react";
import { registerUser, loginUser } from "../api/users";
import { useNavigate, useParams } from "react-router-dom";
import useUsers from "../hooks/useUsers";
import Button from "react-bootstrap/Button";

export default function User() {
  const { userFunction } = useParams();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setLoggedIn } = useUsers();

  return (
    <div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          let result;
          if (userFunction === "register") {
            result = await registerUser(username, password);
          }
          if (userFunction === "login") {
            result = await loginUser(username, password);
          }
          console.log(result);
          if (result.user) {
            setPassword("");
            setUsername("");
            setLoggedIn(true);
            navigate("/");
          } else {
            setError(result.message);
          }
        }}
      >
        {error && <h4>{error}</h4>}
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          placeholder="password"
        />
        <Button variant="warning" type="submit">
          {userFunction === "register" ? "Register" : "Login"}
        </Button>
      </form>
    </div>
  );
}
