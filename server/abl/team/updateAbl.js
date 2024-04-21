const Ajv = require("ajv");
const ajv = new Ajv();
//const validateDateTime = require("../../helpers/validateteamId.js");
//ajv.addFormat("date-time", { validate: validateDateTime });

const teamDao = require("../../dao/teamDao.js");

const schema = {
    type: "object",
    properties: {
      id: { type: "string" },
      matchId: { type: "string" },
      player1: { type: "string" },
      player2: { type: "string" },
      player3: { type: "string" },
      player4: { type: "string" },
      player5: { type: "string" },
      player6: { type: "string" },
      player7: { type: "string" },
      player8: { type: "string" },
      player9: { type: "string" },
      player10: { type: "string" },
      player11: { type: "string" },
      player12: { type: "string" },
      player13: { type: "string" },
      player14: { type: "string" },
      player15: { type: "string" },
      player16: { type: "string" },
    },
    required: ["id", "matchId"],
    additionalProperties: false,
  };

  async function UpdateAbl(req, res) {
    try {
      let team = req.body;
  
      // validate input
      const valid = ajv.validate(schema, team);
      if (!valid) {
        res.status(400).json({
          code: "dtoInIsNotValid",
          message: "dtoIn is not valid",
          validationError: ajv.errors,
        });
        return;
      }
  
      const updatedteam = teamDao.update(team);
      if (!updatedteam) {
        res.status(404).json({
          code: "teamNotFound",
          message: `team ${team.id} not found`,
        });
        return;
      }
  
      res.json(updatedteam);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
  
  module.exports = UpdateAbl;