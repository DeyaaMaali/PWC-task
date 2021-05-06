const jwt = require("jsonwebtoken");
const Users = require("../../models/Users");

const verifyRefreshToken = async (req, res, next) => {
  const refreshToken = req.cookies["refreshToken"];

  if (!refreshToken) return res.status(401).send({ type: "refreshToken", success: false, message: "No refreshToken provided." });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || "refreshtokenrefreshtoken", (err, decoded) => {
    if (err) return res.status(401).send({ type: "refreshToken", success: false, message: "invalid refresh token.", err });

    Users.findById(decoded.id)
      .then((user) => {
        if (user.refreshToken != refreshToken) return res.send({ status: 401, success: false, message: "invalid refresh token." });

        req.user = user;
        next();
      })
      .catch((err) => {
        res.send({ success: false, message: "no valid user found" });
      });
  });
};

module.exports = verifyRefreshToken;
