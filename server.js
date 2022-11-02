const { client } = require("pg");
const client = new client(
  "postgres://localhost:5432/fitnessTrackerBackend-dev"
);

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});

module.exports = {
  client,
};
