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

export async function createActivity(name, description) {
  const response = await fetch("/routes/activities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
    }),
  });
  const result = await response.json();
  return result;
}

export async function updateActivity(name, description, activityId) {
  console.log(name, description, activityId);
  const response = await fetch(`/routes/activities/${activityId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
    }),
  });
  const result = await response.json();
  return result;
}
export async function fetchActivity(routineId, activityId) {
  const response = await fetch(
    `/routes/routine_activities/${routineId}/${activityId}`,
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
