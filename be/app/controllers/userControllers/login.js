const { createToken, createRefreshToken } = require("../../helpers/users/createToken");
const Users = require("../../models/Users");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.send({ success: false, status: 401, message: "please provide all required details" });

  const user = await Users.findOne({ email });
  if (!user) return res.send({ success: false, status: 401, message: "wrong email or password" });

  user.comparePassword(password, (err, isMatch) => {
    if (err) return res.send({ success: false, status: 500, message: "error occure on user authnication" });

    if (!isMatch) return res.send({ success: false, status: 401, message: "wrong email or password" });
    const tokenPayload = {
      id: user._id,
      role: user.role,
    };

    const token = createToken(tokenPayload);

    user.refreshToken = createRefreshToken(tokenPayload);

    res.cookie("token", token, { httpOnly: true, secure: false, sameSite: true }); // secure should be true on production

    user.save(async (err, user) => {
      if (err) return res.send({ user, message: "refresh token not created", err });

      res.cookie("refreshToken", user.refreshToken, { httpOnly: true, secure: false, sameSite: true }); // secure should be true on production
      res.send({ user, tokenExpiresIn: process.env.ACCESS_TOKEN_LIFE, success: true });
    });
  });
};
