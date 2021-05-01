const jwt = require("jsonwebtoken");

/**
 * @description this helper function to generate jwt token
 * @param {Object} payload user object to generate jwt token
 */
exports.createToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET || "tokentoken", {
    algorithm: "HS256",
    expiresIn: parseInt(process.env.ACCESS_TOKEN_LIFE) || 120,
  });
};

/**
 * @description this helper function to generate refresh jwt token
 * @param {Object} payload user object to generate refresh jwt token
 */
exports.createRefreshToken = (tokenPayload) => {
  return jwt.sign(tokenPayload, process.env.REFRESH_TOKEN_SECRET || "refreshtokenrefreshtoken", {
    algorithm: "HS256",
    expiresIn: parseInt(process.env.REFRESH_TOKEN_LIFE) || 86400,
  });
};
