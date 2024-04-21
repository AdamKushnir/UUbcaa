const Ajv = require("ajv");
const ajv = new Ajv();
//const validateDateTime = require("../../helpers/validateMatchId.js");
//ajv.addFormat("date-time", { validate: validateDateTime });

const matchDao = require("../../dao/matchDao.js");

const schema = {
    type: "object",
    properties: {
      id: { type: "string" },
      date: { type: "string" },
      homeTeam: { type: "string" },
      homeTeamGoals: { type: "number" },
      awayTeam: { type: "string" },
      awayTeamGoals: { type: "number" },
    },
    required: ["id"],
    additionalProperties: false,
  };

  async function UpdateAbl(req, res) {
    try {
      let match = req.body;
  
      // validate input
      const valid = ajv.validate(schema, match);
      if (!valid) {
        res.status(400).json({
          code: "dtoInIsNotValid",
          message: "dtoIn is not valid",
          validationError: ajv.errors,
        });
        return;
      }
  
      const updatedmatch = matchDao.update(match);
      if (!updatedmatch) {
        res.status(404).json({
          code: "matchNotFound",
          message: `match ${match.id} not found`,
        });
        return;
      }
  
      res.json(updatedmatch);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
  
  module.exports = UpdateAbl;