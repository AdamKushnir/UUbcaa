const matchDao = require("../../dao/matchDao.js");
//const attendanceDao = require("../../dao/attendance-dao.js");

async function ListAbl(req, res) {
    try {
      const matchList = matchDao.list();
  
      //const attendanceMap = attendanceDao.matchMap();
  
      //matchList.forEach((match) => {
      // match.userMap = attendanceMap[match.id] || {};
      //});
  
      res.json(matchList);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
  
  module.exports = ListAbl;