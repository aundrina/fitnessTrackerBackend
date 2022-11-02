const { routines } = require("../seedData");
const client = require("../client");

async function getRoutineById(id) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `

    SELECT routines.*, FROM  routine
    WHERE id=$1

  `,
      [id]
    );

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
      `
        SELECT routines.*, 
         WHERE "isPublic"= BOOLEAN DEFAULT true
          users.username AS "creatorName",
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
async function getAllRoutinesByUser({ username }) {
  try {
    const { rows: routines } = await client.query(
      `
    SELECT id FROM routines
        WHERE "creatorId"=${username};
    `
    );
    return routines;
  } catch (error) {
    throw error;
  }
}

// async function getPublicRoutinesByUser(){}

// async function getPublicRoutinesByActivity(){}

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

// async function updateRoutine(){}

// async function destroyRoutine(){}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  createRoutine,
};
