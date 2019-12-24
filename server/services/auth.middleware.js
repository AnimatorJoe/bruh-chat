const admin = require("./firebase-services.js");


const checkIfAuthenticated = async (req, res, next) => {
  if(req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer")
    req.authToken = req.headers.authorization.split(" ")[1];
  else
    return res.status(401).send({error:"You are not authorized"});

    
  const { authToken } = req;
  try {
    const userInfo = await admin.auth().verifyIdToken(authToken);
    req.uid = userInfo.uid;
    return next();

  } catch(err) {
    return res.status(401).send({error:"You are not authorized"});
  }
}

module.exports = checkIfAuthenticated;
