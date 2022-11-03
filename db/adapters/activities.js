const client = require("../client");

async function getActivityById({ activityId }) {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
    SELECT id,name,description  FROM activities 
        WHERE id=$'{activityId}' 
    `
    );
    return activity;
  } catch (error) {
    throw error;
  }
}

async function getAllActivities() {
  try {
    const { rows } = await client.query(
      `
       SELECT * FROM activities
        `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function createActivity({ name, description }) {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
        INSERT INTO activities(name, description) 
        VALUES ($1, $2)
        `,
      [name, description]
    );

    return activity;
  } catch (error) {
    throw error;
  }
}

async function updateActivity(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  try {
    if (setString.length > 0) {
      const {
        rows: [activity],
      } = await client.query(
        `
        UPDATE activities
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
        `,
        Object.values(fields)
      );
      return activity;
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getActivityById,
  getAllActivities,
  updateActivity,
  createActivity,
};
