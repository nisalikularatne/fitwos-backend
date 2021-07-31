const express = require("express");
const server = express();

const morgan = require("morgan");
const cors = require("cors");
const usersRouter = require("./routes/users-router.js");
const apiV1Routes = require('@fitwos/fitwos-application/routes/api/v1');
// Middleware
server.use(cors());
server.use(morgan("dev"));
server.use(express.json());


//Routes
server.use('/api/v1', apiV1Routes);
server.get("/", (req, res) => {
  res.status(200).json({ hello: "World!" });
});

module.exports = server;
