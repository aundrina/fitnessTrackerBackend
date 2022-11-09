const client = require("../client");
const { routine_activities } = require("../seedData");

async function getRoutineActivityById(id) {
  try {
    const {
      rows: [routine_activity],
    } = await client.query(
      `SELECT * FROM routine_activities
        WHERE id=$1
        `,
      [id]
    );
    return routine_activity;
  } catch (error) {
    throw error;
  }
}
async function addActivityRoutine({ routineId, activityId, count, duration }) {
  try {
    const { rows } = await client.query(
      `
      INSERT INTO routine_activities (duration, count, "routineId", "activityId")
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [duration, count, routineId, activityId]
    );
    return rows[0];
  } catch (error) {
    throw error;
  }
}

async function updateRoutineActivity({ id, fields = {} }) {
  const setString = Object.keys(fields)
    .map((key, i) => {
      return `${key}=$${i + 1}`;
    })
    .join(", ");

  try {
    const {
      rows: [routine_activity],
    } = await client.query(
      ` UPDATE routine_activities
        SET ${setString}
        WHERE id = ${id}
        RETURNING *
        `,
      Object.values(fields)
    );
    return routine_activity;
  } catch (error) {
    throw error;
  }
}

async function destroyActivity({ routineId, activityId }) {
  try {
    const { rows } = await client.query(
      `DELETE FROM routine_activities 
      WHERE "routineId" = $1 and "activityId" = $2
      RETURNING *
    `,
      [routineId, activityId]
    );
    return rows[0];
  } catch (error) {
    throw error;
  }
}

async function getRoutineActivitiesByRoutine({ routineId }) {
  try {
    const {
      rows: [routine_activities],
    } = await client.query(
      `SELECT * 
      FROM routine_activities
      WHERE "routineId" = $1;
      `,
      [routineId]
    );
    return routine_activities;
  } catch (error) {
    throw error;
  }
}

async function removeAllActivitiesFromRoutine(routineId) {
  try {
    const {
      rows: [deletedRA],
    } = await client.query(`
    DELETE FROM routine_activities
    WHERE "routineId"= ${routineId};
    `);
    return deletedRA;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getRoutineActivityById,
  addActivityRoutine,
  updateRoutineActivity,
  destroyActivity,
  getRoutineActivitiesByRoutine,
  removeAllActivitiesFromRoutine,
};
