exports.logout = async (req, res) => {
  req.user.refreshToken = null;
  req.user.save(async (err, user) => {
    if (err) return res.send({ success: false, status: 500, message: "something went wrong", err });

    res.cookie("token", null, { maxAge: 0 });
    res.cookie("refreshToken", null, { maxAge: 0 });

    res.send();
  });
};
