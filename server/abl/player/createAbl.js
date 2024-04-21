const Ajv = require("ajv");
const ajv = new Ajv();
//const validateDateTime = require("../../helpers/validateplayerId.js");
//ajv.addFormat("date-time", { validate: validateDateTime });

const playerDao = require("../../dao/playerDao.js");

const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    matchId: { type: "string" },
    goals: { type: "number" },
    assists: { type: "number" },
    rating: { type: "number" },
  },
  required: ["name", "matchId", "goals", "assists", "rating"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
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

    player = playerDao.create(player);
    res.json(player);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;