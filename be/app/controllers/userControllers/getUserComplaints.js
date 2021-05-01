const Complaint = require("../../models/Complaint");

/**
 * @description this will get all complaints of user
 * @param {Object} req request
 * @param {*} res server response
 */
exports.getUserComplaints = async (req, res) => {
  if (!req.user.is("User")) {
    return res.send({ success: false, message: "you are not authorized" });
  }

  const pageNumber = Number(req.query.pageNumber) || 0;
  const pageSize = Number(req.query.pageSize) || 25;
  const skipCount = pageNumber * pageSize;

  let user = await req.user
    .populate([
      {
        path: "complaints",
        options: { limit: pageSize, skip: skipCount },
      },
      "complaintsCount",
    ])
    .execPopulate();

  let userComplaints = user.complaints;
  const totalComplaints = user.complaintsCount;
  const haveMore = totalComplaints < pageSize ? false : skipCount + pageSize > totalComplaints ? false : true;

  !userComplaints
    ? res.send({ success: false, message: "No Complaints Found for this user" })
    : res.send({ success: true, userComplaints, haveMore, totalCounts: totalComplaints });
};
