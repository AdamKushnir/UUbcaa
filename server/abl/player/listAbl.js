const playerDao = require("../../dao/playerDao.js");
//const attendanceDao = require("../../dao/attendance-dao.js");

async function ListAbl(req, res) {
    try {
      const playerList = playerDao.list();
  
      //const attendanceMap = attendanceDao.playerMap();
  
      //playerList.forEach((player) => {
      // player.userMap = attendanceMap[player.id] || {};
      //});
  
      res.json(playerList);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
  
  module.exports = ListAbl;