const admin = require("firebase-admin");
var serviceAccount = require("./account-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bruh-chat-e2f7b.firebaseio.com"
});

module.exports = admin;