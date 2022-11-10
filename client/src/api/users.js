export async function registerUser(username, password) {
  const response = await fetch("/routes/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const result = await response.json();
  return result;
}

export async function loginUser(username, password) {
  const response = await fetch("/routes/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      username,
      password,
    },
  });
  const result = await response.json();
  return result;
}

export async function logoutUser() {
  const response = await fetch("/routes/users/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}

export async function fetchMe() {
  const response = await fetch("/routes/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}

export async function userRoutines() {
  const response = await fetch("/routes/users/:username/routines", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}
