const jwt = require("jsonwebtoken");

const fetchUser = async (req, res, next) => {
  // get user from jwt-token and add id to req object
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: "Please authenticate using valid token" });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user; // user is an property of data obj which we used to sign
    next();
  } catch (error) {
    res.status(401).json({ message: "Please authenticate using valid token" });
  }
};

module.exports = fetchUser;
