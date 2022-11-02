const { Client } = require("pg"); // imports the pg module

const dbName = "fitness_tracker";

const client = new Client({
  connectionString:
    process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`,
});

module.exports = client;
