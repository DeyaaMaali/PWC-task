const Complaint = require("../../models/Complaint");

/**
 * @description this will get all orders of user
 * @param {Object} req request body should contains all the required data to get orders wtih req.user
 * @param {*} res server response
 */
exports.getComplaints = async (req, res) => {
  if (!req.user.is("Admin")) {
    return res.send({ success: false, message: "you are not authorized" });
  }
  const pageNumber = Number(req.query.pageNumber) || 0;
  const pageSize = Number(req.query.pageSize) || 25;
  const skipCount = pageNumber * pageSize;
  const totalComplaints = await Complaint.estimatedDocumentCount({});
  const haveMore = totalComplaints < pageSize ? false : skipCount + pageSize > totalComplaints ? false : true;

  let complaints = await Complaint.find({}).skip(skipCount).limit(pageSize).populate("user");

  !complaints
    ? res.send({ success: false, message: "No Complaints Found" })
    : res.send({ success: true, complaints, haveMore, totalCounts: totalComplaints });
};
