import { useState, useEffect } from "react";
import { fetchMe } from "../api/users";
import UsersContext from "../context/UsersContext";

export default function UsersProviders({ children }) {
  const [user, setUser] = useState({ user: "Guest" });
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    async function getMe() {
      const user = await fetchMe();

      setUser(user);
      if (user.loggedIn === false) {
        setUser({ user: "Guest" });
        setLoggedIn(false);
      } else {
        setUser(user);
        setLoggedIn(true);
      }
    }
    getMe();
  }, [loggedIn]);
  return (
    <UsersContext.Provider value={{ user, setUser, loggedIn, setLoggedIn }}>
      {children}
    </UsersContext.Provider>
  );
}
