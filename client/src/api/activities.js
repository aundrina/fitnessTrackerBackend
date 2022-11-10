export async function getAllActivities() {
  const response = await fetch("/routes/activities", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}

export async function createActivities() {
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
  const response = await fetch("/routes/activities/:activityId", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  return result;
}

export async function getActivity() {
  const response = await fetch("/routes/activities/:activityId/routines", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}
