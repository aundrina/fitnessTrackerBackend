const client = require("./client");

const {
  users,
  activities,
  routines,
  routine_activities,
} = require("./seedData");

const { createRoutine } = require("./adapters/routines");

const { createActivity } = require("./adapters/activities");

const { addActivityRoutine } = require("./adapters/routine_activities");

const { createUser } = require("./adapters/users");

async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    await client.query(`
        DROP TABLE IF EXISTS routine_activities;
        DROP TABLE IF EXISTS routines;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS activities;
      `);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}
async function createTables() {
  try {
    console.log("Starting to build tables...");
    await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username varchar(255) UNIQUE NOT NULL,
          password varchar(255) NOT NULL
          )
          `);
    await client.query(`
            CREATE TABLE activities(
            id SERIAL PRIMARY KEY,
           name VARCHAR(255) UNIQUE NOT NULL,
           description TEXT NOT NULL
            )
            `);

    await client.query(`
      CREATE TABLE routines(
      id SERIAL PRIMARY KEY,
     "creatorId" INTEGER REFERENCES users(id),
     "isPublic" BOOLEAN DEFAULT false,
     name VARCHAR(255) UNIQUE NOT NULL,
     goal TEXT NOT NULL
      )
      `);

    await client.query(`
      CREATE TABLE routine_activities (
          id SERIAL PRIMARY KEY,
          duration INTEGER,
          count INTEGER,
          "routineId" INTEGER REFERENCES routines (id),
          "activityId" INTEGER REFERENCES activities (id),
          UNIQUE("routineId", "activityId")
      )
      `);
    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}
const seedDb = async () => {
  console.log(`...seeding users`);
  for (const user of users) {
    console.log("User: ", user);
    await createUser(user);
  }

  console.log("...seeding routines");
  for (const routine of routines) {
    await createRoutine(routine);
  }

  console.log(`...seeding activities`);
  for (const activity of activities) {
    await createActivity(activity);
  }

  console.log(`...seeding routine_activities`);
  for (const routine_activity of routine_activities) {
    await addActivityRoutine(routine_activity);
  }
};
const rebuildDb = async () => {
  client.connect();
  try {
    await dropTables();
    await createTables();
    await seedDb();
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
};

rebuildDb();
