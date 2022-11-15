import { useState, useEffect } from "react";
import { registerUser, loginUser } from "../api/users";
import { useNavigate, useParams } from "react-router";
// import styles from "./Auth.module.css";

export default function Auth({ setToken }) {
  const navigate = useNavigate();
  const { method } = useParams();
  const [error, setError] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();

        setError("");
        let result;
        if (method === "register") {
          result = await registerUser(username, password);
        } else {
          result = await loginUser(username, password);
        }
        console.log(result);

        if (result.success) {
          const token = result.data.token;
          localStorage.setItem("token", token);
          setToken(token);
          setPassword("");
          setUsername("");
          navigate("/");
        } else {
          setError(result.error.message);
        }
      }}
    >
      {error && <h4>{error}</h4>}
      <input
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        type="text"
        placeholder="username"
      />
      <input
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        type="text"
        placeholder="password"
      />
      <button type="submit">
        {method === "register" ? "Register" : "Login"}
      </button>
    </form>
  );
}
