const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const matchController = require("./controller/matches"); //../abl/event/createAb
const playerController = require("./controller/player");
const teamController = require("./controller/team");
//const messageController = require("./controller/message");
//const noteController = require("./controller/note");

app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/match", matchController);
app.use("/player", playerController);
app.use("/team", teamController);
//app.use("/message", messageController);
//app.use("/note", noteController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});