const Complaint = require("../../models/Complaint");

exports.storeComplaint = async (req, res) => {
  if (!req.user.is("User")) {
    return res.send({ success: false, message: "you are not authorized" });
  }

  const ComplaintBody = req.body;

  if (!ComplaintBody) {
    return res.send({ success: false, message: "missing data" });
  }

  try {
    const newComplaint = new Complaint({ ...req.body, user: req.user._id });
    newComplaint.save((err, complaint) => {
      if (err) {
        res.send({ success: false, message: "error in saving complaint", error: e });
      }

      res.send({ success: true, complaint });
    });
  } catch (e) {
    res.send({ success: false, message: "error in saving complaint", error: e });
  }
};
