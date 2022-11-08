require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const router = require("./routes");
const server = express();
const { PORT = 4000 } = process.env;
const client = require("./db/client");
const { COOKIE_SECRET } = process.env;

client.connect();

server.use(morgan("dev"));
server.use(express.json());
server.use(cookieParser(COOKIE_SECRET));

server.use("/routes", router);

server.use((error, req, res, next) => {
  res.send(error);
});

server.listen(4000, () => {
  console.log("server listening on port 4000");
});
