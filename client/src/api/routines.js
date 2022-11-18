export async function fetchRoutines() {
  const response = await fetch("/routes/routines", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}

export async function fetchRoutineById(id) {
  const response = await fetch(`/routines/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}

export async function createRoutine(name, goal, is_public) {
  const response = await fetch("/routes/routines", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      goal,
      is_public,
    }),
  });
  const result = await response.json();
  return result;
}

export async function updateRoutine(name, goal, is_public, routineId) {
  console.log(name, goal, is_public, routineId);
  const response = await fetch(`/routes/routines/${routineId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      goal,
      is_public,
    }),
  });
  const result = await response.json();
  return result;
}

export async function deleteRoutine(routineId) {
  const response = await fetch("/routes/routines/${routineId}", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}
