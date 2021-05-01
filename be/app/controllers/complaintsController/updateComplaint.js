const Complaint = require("../../models/Complaint");

/**
 * @description this will update complaint data by admin
 * @param {Object} req request body should contains the required data to update the complaint
 * @param {*} res server response
 */
exports.updateComplaint = async (req, res) => {
  if (!req.user.is("Admin")) {
    return res.send({ success: false, message: "you are not authorized" });
  }

  const complaint_id = req.params.id;
  const updatedComplaintStatus = req.body.status;

  const updatedComplaint = await Complaint.findByIdAndUpdate(complaint_id, { $set: { status: updatedComplaintStatus } }, { new: true }).populate(
    "user"
  );

  !updatedComplaint ? res.send({ success: false, message: "no complaint updated" }) : res.send({ success: true, updatedComplaint: updatedComplaint });
};
