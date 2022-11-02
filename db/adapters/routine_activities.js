const client = require("../client");
const { routine_activities } = require("../seedData");

async function getRoutineActivityById({ routineActivityId }) {
  try {
    const {
      rows: [routine_activity],
    } = await client.query(
      `SELECT * FROM routine_activities
        WHERE "routineActivityId"=$1
        `,
      [routineActivityId]
    );
    return routine_activity;
  } catch (error) {
    throw error;
  }
}
async function addActivityRoutine({ routineId, activityId, count, duration }) {
  try {
    const {
      rows: [routine_activity],
    } = await client.query(
      `
            INSERT INTO routine_activities("routineId", "activityId", count,duration),
            VALUES ($1,$2,$3,$4)
            RETURN *;
            `,
      [routineId, activityId, count, duration]
    );
    return routine_activity;
  } catch (error) {
    throw error;
  }
}

async function updateRoutineActivity({ routineActivityId, count, duration }) {
  const setString = Object.keys(count, duration)
    .map((key, i) => {
      return `${key}=$${i + 2}`;
    })
    .join(", ");

  try {
    const {
      rows: [routine_activity],
    } = await client.query(
      ` UPDATE routine_activities
        SET $(setString)
        WHERE "routineActivityId" =$1,$2,$3
        RETURNING *
        `,
      [routineActivityId, count, duration]
    );
    return routine_activity;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getRoutineActivityById,
  addActivityRoutine,
  updateRoutineActivity,
};
