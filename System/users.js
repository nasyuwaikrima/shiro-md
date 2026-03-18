const fs = require("fs");

const path = "./data/users.json";
if (!fs.existsSync(path)) {
  fs.writeFileSync(path, "{}");
}

let db = JSON.parse(fs.readFileSync(path));

function createUser(id) {
  if (!db[id]) {
    db[id] = {
      id: id,
      exp: 0,
      level: 1,
      balance: 0,
      limit: 20,
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

function loadDB() {
  db = JSON.parse(fs.readFileSync(path));
}

function addBalance(id, amount) {
  let user = getUser(id);
  user.balance += amount;
  saveDB();
}

function getUser(id) {
  loadDB();
  return db[id] || null;
}

function kurangiLimit(id, amount = 1) {
  console.log('kurangi limit')
  loadDB()

  let user = createUser(id)
  if (user.limit < amount) return false

  user.limit -= amount

  saveDB()
  return true
}

module.exports = {
  getUser,
  saveDB,
  loadDB,
  addBalance,
  createUser,
  kurangiLimit
};

fs.watchFile(path, () => {
  loadDB();
  console.log("Database reloaded");
});
