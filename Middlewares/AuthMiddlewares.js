const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports.checkUser = (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "ADMIN URL HERE");
  res.set("Access-Control-Allow-Credentials", true);
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      process.env.SUPER_SECRET_KEY,
      async (err, decodedToken) => {
        if (err) {
          console.log(err);
          res.json({ status: false });
          next();
        } else {
          const user = await User.findById(decodedToken.id);
          if (user) res.json({ status: true, user: user.email });
          next();
        }
      }
    );
  } else {
    res.json({ status: false });
    next();
  }
};
