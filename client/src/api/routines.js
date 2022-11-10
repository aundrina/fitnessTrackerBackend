export async function getRoutines() {
  const response = await fetch("/routes/routines", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}

export async function createRoutine() {
  const response = await fetch("/routes/routines", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}

export async function updateRoutine() {
  const response = await fetch("/routes/routines/:routineId", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}

export async function deleteRoutine() {
  const response = await fetch("/routes/routines/:routineId", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}
