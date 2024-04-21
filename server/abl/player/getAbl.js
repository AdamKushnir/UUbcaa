const Ajv = require("ajv");
const ajv = new Ajv();
const playerDao = require("../../dao/playerDao.js");
//const attendanceDao = require("../../dao/attendance-dao.js");

const schema = {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
    additionalProperties: false,
  };

  async function GetAbl(req, res) {
    try {
      // get request query or body
      const reqParams = req.query?.id ? req.query : req.body;
  
      // validate input
      const valid = ajv.validate(schema, reqParams);
      if (!valid) {
        res.status(400).json({
          code: "dtoInIsNotValid",
          message: "dtoIn is not valid",
          validationError: ajv.errors,
        });
        return;
      }
  
      // read player by given id
      const player = playerDao.get(reqParams.id);
      if (!player) {
        res.status(404).json({
          code: "playerNotFound",
          message: `player ${reqParams.id} not found`,
        });
        return;
      }
  
      //const attendanceMap = attendanceDao.playerMap();
      //player.userMap = attendanceMap[reqParams.id] || {};
  
      res.json(player);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
  
  module.exports = GetAbl;
  