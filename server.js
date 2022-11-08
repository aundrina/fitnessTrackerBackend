const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const router = require("./routes");
const server = express();
const { PORT = 4000 } = process.env;

require("dotenv").config();
server.use(morgan("dev"));
server.use(express.json());
server.use("/routes", router);

server.listen(4000, () => {
  console.log("server listening on port 4000");
});
