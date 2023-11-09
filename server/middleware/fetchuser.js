const jwt = require("jsonwebtoken");

const fetchUser = async (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).json({ message: "Please authenticate using valid token , ( login / signup )" });
  }
  
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(req.cookies)
    req.user = data.user; // user is an property of data obj which we used to sign
    next();
  } catch (error) {
    return res.status(401).json({ message: "Please authenticate using valid token , ( login / signup )" });
  }
};

module.exports = fetchUser;
