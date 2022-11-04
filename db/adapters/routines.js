const { routines } = require("../seedData");
const client = require("../client");
// const { activity } = require("./activities")

async function getRoutineById(routine_id) {
  try {
    const {
      rows: [routine],
    } = await client.query(`
  SELECT routines.*, users.username AS "creatorName",
  CASE WHEN ra.routine id is NULL THEN'[]'::ison
  ELSE
  JSON_AGG(
    JSON_BUILD_OBJECT(
    'id', activities.id,
    'name', activities. name,
    'description', activities.description,
    'count', ra.count,
    'duration', ra.duration
    )
  ) END AS activities
  FROM routines
  LEFT JOIN routine activities AS ra
    ON routines.id=ra.routine_ id
  LEFT JOIN activities
    ON activities.id=ra.activity id
  JOIN users
    ON routines.creator_id-users.id
  WHERE routines.id=${routine_id}
  GROUP BY routines.id, ra.routine_id, users.username`);
    return routine;
  } catch (error) {
    throw error;
  }
}

async function getRoutinesWithoutActivities() {
  try {
    const { rows } = await client.query(
      `
        SELECT * FROM routines
        `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}
async function getAllRoutines() {
  try {
    const { rows } = await client.query(
      `SELECT routines.*, users.username AS "creatorName",
	CASE WHEN ra."routineId" is NULL THEN'[]'::json
	ELSE
	JSON_AGG(
		JSON_BUILD_OBJECT(
		'id', activities.id,
		'name', activities.name,
		'description', activities.description,
		'count', ra.count,
		'duration', ra.duration
		)
	) END AS activities
	FROM routines	
	LEFT JOIN routine_activities AS ra
		ON routines.id = ra."routineId"
	LEFT JOIN activities 
		ON ra."activityId" = activities.id
	JOIN users
		ON routines."creatorId" = users.id	
	GROUP BY routines.id, ra."routineId", users.username`
    );
    return rows;
  } catch (error) {
    throw error;
  }
}
async function getAllPublicRoutines() {
  try {
    const { rows } = await client.query(
      `SELECT routines.*, users.username AS "creatorName",
	CASE WHEN ra."routineId" is NULL THEN'[]'::json
	ELSE
	JSON_AGG(
		JSON_BUILD_OBJECT(
		'id', activities.id,
		'name', activities.name,
		'description', activities.description,
		'count', ra.count,
		'duration', ra.duration
		)
	) END AS activities
	FROM routines	
	LEFT JOIN routine_activities AS ra
		ON routines.id = ra."routineId"
	LEFT JOIN activities 
		ON ra."activityId" = activities.id
	JOIN users
		ON routines."creatorId" = users.id	
  WHERE "isPublic"= true
	GROUP BY routines.id, ra."routineId", users.username`
    );
    return rows;
  } catch (error) {
    throw error;
  }
}
async function getAllRoutinesByUser({ username }) {
  try {
    const { rows } = await client.query(
      `
      SELECT routines.*, users.username AS "creatorName",
      CASE WHEN ra."routineId" is NULL THEN'[]'::json
      ELSE
      JSON_AGG(
        JSON_BUILD_OBJECT(
        'id', activities.id,
        'name', activities.name,
        'description', activities.description,
        'count', ra.count,
        'duration', ra.duration
        )
      ) END AS activities
      FROM routines	
      LEFT JOIN routine_activities AS ra
        ON routines.id = ra."routineId"
      LEFT JOIN activities 
        ON ra."activityId" = activities.id
      JOIN users
        ON routines."creatorId" = users.id	
        WHERE users.username='${username}'
      GROUP BY routines.id, ra."routineId", users.username;
    `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getPublicRoutinesByUser({ username }) {
  try {
    const { rows } = await client.query(
      `
        SELECT routines.*, users.username AS "creatorName",
        CASE WHEN ra."routineId" is NULL THEN'[]'::json
        ELSE
        JSON_AGG(
          JSON_BUILD_OBJECT(
          'id', activities.id,
          'name', activities.name,
          'description', activities.description,
          'count', ra.count,
          'duration', ra.duration
          )
        ) END AS activities
        FROM routines	
        LEFT JOIN routine_activities AS ra
          ON routines.id = ra."routineId"
        LEFT JOIN activities 
          ON ra."activityId" = activities.id
        JOIN users
          ON routines."creatorId" = users.id	
          WHERE users.username='${username}' and "isPublic"= true
        GROUP BY routines.id, ra."routineId", users.username;
      `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getPublicRoutinesByActivity({ activityId }) {
  try {
    const { rows } = await client.query(
      `
        SELECT routines.*, users.username AS "creatorName",
        CASE WHEN ra."routineId" is NULL THEN'[]'::json
        ELSE
        JSON_AGG(
          JSON_BUILD_OBJECT(
          'id', activities.id,
          'name', activities.name,
          'description', activities.description,
          'count', ra.count,
          'duration', ra.duration
          )
        ) END AS activities
        FROM routines	
        LEFT JOIN routine_activities AS ra
          ON routines.id = ra."routineId"
        LEFT JOIN activities 
          ON ra."activityId" = activities.id
        JOIN users
          ON routines."creatorId" = users.id	
          WHERE "activityId"='${activityId}' and "isPublic"= true
        GROUP BY routines.id, ra."routineId", users.username;
      `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
    const rows = await client.query(
      `
  INSERT INTO routines("creatorId", "isPublic", name, goal) 
        VALUES ($1, $2, $3, $4)
        `,
      [creatorId, isPublic, name, goal]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function updateRoutine({ id, fields = {} }) {
  const setString = Object.keys(fields)
    .map((key, i) => {
      return `${key}=$${i + 1}`;
    })
    .join(", ");

  try {
    const {
      rows: [routine_activity],
    } = await client.query(
      ` UPDATE routines
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

async function destroyRoutine({ id }) {
  try {
    const { rows } = await client.query(
      `DELETE FROM routines
      WHERE id= $1
      RETURNING *
    `,
      [id]
    );
    return rows[0];
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  createRoutine,
};
