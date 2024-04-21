const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/player/getAbl"); //../../dao/playerDao.js
const ListAbl = require("../abl/player/listAbl");
const CreateAbl = require("../abl/player/createAbl");
const UpdateAbl = require("../abl/player/updateAbl");
const DeleteAbl = require("../abl/player/deleteAbl");

router.get("/get", (req, res) => {
    GetAbl(req, res);
  });
  
  router.get("/list", (req, res) => {
    ListAbl(req, res);
  });
  
  router.post("/create", (req, res) => {
    CreateAbl(req, res);
  });
  
  router.post("/update", (req, res) => {
    UpdateAbl(req, res);
  });
  
  router.post("/delete", (req, res) => {
    DeleteAbl(req, res);
  });
  
  module.exports = router;
  