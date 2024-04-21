const teamDao = require("../../dao/teamDao.js");
//const attendanceDao = require("../../dao/attendance-dao.js");

async function ListAbl(req, res) {
    try {
      const teamList = teamDao.list();
  
      //const attendanceMap = attendanceDao.teamMap();
  
      //teamList.forEach((team) => {
      // team.userMap = attendanceMap[team.id] || {};
      //});
  
      res.json(teamList);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
  
  module.exports = ListAbl;