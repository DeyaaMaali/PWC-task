const jwt = require("jsonwebtoken");
const Users = require("../../models/Users");

const verifyToken = async (req, res, next) => {
  const token = req.cookies["token"];

  if (!token) return res.status(401).send({ status: 401, success: false, message: "No token provided." });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "tokentoken", (err, decoded) => {
    if (err) return res.status(401).send({ status: 401, success: false, message: "invalid token.", err });
    Users.findById(decoded.id)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => {
        res.send({ success: false, message: "no valid user found" });
      });
  });
};

module.exports = verifyToken;
