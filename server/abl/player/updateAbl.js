const Ajv = require("ajv");
const ajv = new Ajv();
//const validateDateTime = require("../../helpers/validateplayerId.js");
//ajv.addFormat("date-time", { validate: validateDateTime });

const playerDao = require("../../dao/playerDao.js");

const schema = {
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      matchId: { type: "string" },
      goals: { type: "number" },
      assists: { type: "number" },
      rating: { type: "number" },
    },
    required: ["id"],
    additionalProperties: false,
  };

  async function UpdateAbl(req, res) {
    try {
      let player = req.body;
  
      // validate input
      const valid = ajv.validate(schema, player);
      if (!valid) {
        res.status(400).json({
          code: "dtoInIsNotValid",
          message: "dtoIn is not valid",
          validationError: ajv.errors,
        });
        return;
      }
  
      const updatedplayer = playerDao.update(player);
      if (!updatedplayer) {
        res.status(404).json({
          code: "playerNotFound",
          message: `player ${player.id} not found`,
        });
        return;
      }
  
      res.json(updatedplayer);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
  
  module.exports = UpdateAbl;