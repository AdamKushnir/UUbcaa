const Ajv = require("ajv");
const ajv = new Ajv();
const teamDao = require("../../dao/teamDao.js");
//const attendanceDao = require("../../dao/attendance-dao.js");


const schema = {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
    additionalProperties: false,
  };

  async function DeleteAbl(req, res) {
    try {
      // get request query or body
      const reqParams = req.body;
  
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
  
      //const attendanceMap = attendanceDao.teamMap();
      //if (attendanceMap[reqParams.id]) {
        //res.status(400).json({
         // code: "teamHasAttendances",
          //message: `team ${reqParams.id} has attendances`,
        //});
        //return;
      //}
  
      teamDao.remove(reqParams.id);
      res.json({});
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
  
  module.exports = DeleteAbl;