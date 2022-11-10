export async function addActivity() {
  const response = await fetch("/routes/routine_activities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}

export async function updateActivity() {
  const response = await fetch(
    "/routes/routine_activities/:routineActivityId",
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = await response.json();
  return result;
}

export async function deleteActivity() {
  const response = await fetch(
    "/routes/routine_activities/:routineId/:activityId",
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = await response.json();
  return result;
}
