const Ajv = require("ajv");
const ajv = new Ajv();
//const validateDateTime = require("../../helpers/validateMatchId.js");
//ajv.addFormat("date-time", { validate: validateDateTime });

const matchDao = require("../../dao/matchDao.js");

const schema = {
  type: "object",
  properties: {
    date: { type: "string" },
    homeTeam: { type: "string" },
    homeTeamGoals: { type: "number" },
    awayTeam: { type: "string" },
    awayTeamGoals: { type: "number" },
  },
  required: ["date", "homeTeam", "awayTeam"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
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

    match = matchDao.create(match);
    res.json(match);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;