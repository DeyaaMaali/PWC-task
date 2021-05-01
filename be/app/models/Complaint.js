const mongoose = require("mongoose");

const ComplaintSchema = mongoose.Schema(
  {
    desc: { type: String },
    type: {
      type: String,
      enum: ["Wait–Times", "Delivery", "Quality of Service", "Other"],
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", require: true },
    title: { type: String },
    status: {
      type: String,
      default: "pending",
      enum: ["resolved", "pending", "dismissed"],
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Complaint = mongoose.model("Complaint", ComplaintSchema);

module.exports = Complaint;
