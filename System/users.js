const fs = require("fs");

const path = "./Database/users.json";

let db = JSON.parse(fs.readFileSync(path));

function getUser(id) {
  if (!db[id]) {
    db[id] = {
      id: id,
      exp: 0,
      level: 1,
      balance: 0,
      limit: 10,
      premium: false,
      registered: true,
      joinDate: Date.now(),
    };

    saveDB();
  }

  return db[id];
}

function saveDB() {
  fs.writeFileSync(path, JSON.stringify(db, null, 2));
}

module.exports = {
  getUser,
  saveDB,
};
