export async function fetchActivities() {
  const response = await fetch("/routes/activities", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}

export async function createActivity() {
  const response = await fetch("/routes/activities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}

export async function updateActivity() {
  const response = await fetch("/routes/routines/:routineId", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}
export async function fetchActivities() {
  const response = await fetch(
    "/routes/routine_activities/:routineId/:activityId",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = await response.json();
  return result;
}
