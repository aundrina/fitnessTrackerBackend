const client = require("../client");

async function getActivityById({ activityId }) {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
    SELECT id,name,description  FROM activities 
        WHERE id=${activityId}; 
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
       SELECT * FROM activities; 
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

async function updateActivity(activityId, name, description = {}) {
  const setString = Object.keys(name, description)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(",");

  try {
    if (setString.length > 0) {
      const {
        rows: [activity],
      } = await client.query(
        `
        UPDATE activity
        SET ${setString}
        WHERE id=${activityId}
        RETURNING *;
        `,
        Object.values(name, description)
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
