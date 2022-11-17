export async function addActivity(duration, count, routineId, activityId) {
  const response = await fetch("/routes/routine_activities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      duration,
      count,
      routineId,
      activityId,
    }),
  });
  const result = await response.json();
  return result;
}

export async function updateActivity(count, duration) {
  const response = await fetch(
    "/routes/routine_activities/:routineActivityId",
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        duration,
        count,
      }),
    }
  );
  const result = await response.json();
  return result;
}

export async function deleteActivity(routineId, activityId) {
  const response = await fetch(
    `/routes/routine_activities/${routineId}/${activityId}`,
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
