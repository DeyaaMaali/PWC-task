const { response } = require("express");
const { createToken, createRefreshToken } = require("../../helpers/users/createToken");
const Users = require("../../models/Users");

/**
 * @description this function will generate new token and store a new refresh token
 * @param {Object} req request body should contains user
 * @param {*} res server response
 */
exports.refreshToken = async (req, res) => {
  const tokenPayload = {
    id: req.user._id,
    role: req.user.role,
  };

  const token = createToken(tokenPayload);

  req.user.refreshToken = createRefreshToken(tokenPayload);

  res.cookie("token", token, { httpOnly: true, secure: false, sameSite: true });

  req.user.save(async (err, user) => {
    if (err) return res.send({ user, status: 500, message: "refresh token not created", err });

    res.cookie("refreshToken", user.refreshToken, { httpOnly: true, sameSite: true });
    res.send({ user, tokenExpiresIn: process.env.ACCESS_TOKEN_LIFE, success: true });
  });
};
