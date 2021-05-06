const { response } = require("express");
const { createToken } = require("../../helpers/users/createToken");
const Users = require("../../models/Users");

/**
 * @description this function will create user
 * @param {Object} req request body should contains all the required data to create user
 * @param {*} res server response
 */
exports.store = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.send({ success: false, status: 403, message: "please provide all required details" });

  const checkEmail = await Users.findOne({ email });
  if (checkEmail) return res.send({ success: false, status: 303, message: "email already exist" });

  const newUser = new Users(req.body);
  newUser.role = "User";
  newUser.save(async (err, user) => {
    if (err) return res.send({ success: false, status: 500, message: "user not created", err });
    const tokenPayload = {
      id: user._id,
      role: user.role,
    };
    const token = createToken(tokenPayload);

    res.cookie("token", token, { httpOnly: true, secure: false, sameSite: true });
    res.cookie("refreshToken", newUser.refreshToken, { httpOnly: true, secure: false, sameSite: true }); // secure should be true on production; should be done by using env variable

    res.send({
      success: true,
      user,
      tokenExpiresIn: process.env.ACCESS_TOKEN_LIFE,
      message: "User created successfully",
    });
  });
};
