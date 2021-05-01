const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createRefreshToken } = require("../helpers/users/createToken");

const userSchema = mongoose.Schema(
  {
    name: { type: String },
    password: { type: String, required: true },
    email: { type: String },
    role: { type: String, trim: true, required: true, enum: ["User", "Admin"], default: "User" },
    refreshToken: {
      type: String,
      default: function () {
        return createRefreshToken({
          id: this._id,
          role: this.role,
        });
      },
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

// to get all complaints of the user
userSchema.virtual("complaints", {
  ref: "Complaint",
  localField: "_id",
  foreignField: "user",
});

// to get the count of complaints of the user
userSchema.virtual("complaintsCount", {
  ref: "Complaint",
  localField: "_id",
  foreignField: "user",
  count: true,
});

// before save function, this is used to hash password
userSchema.pre("save", function (next) {
  // if no change on password, continue
  if (!this.isModified("password")) {
    return next();
  }
  // Generate salt, then use it to hash password
  bcryptjs.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcryptjs.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
});

// user method to compare password
userSchema.methods.comparePassword = function (password, callback) {
  bcryptjs.compare(password, this.password, function (err, isMatch) {
    if (err) {
      callback(err);
    }
    callback(null, isMatch);
  });
};

// to delete refreshToken and password from json response
userSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();

  delete userObject.refreshToken;
  delete userObject.password;

  return userObject;
};

// to check if the user authorized
userSchema.methods.is = function (role) {
  return this.role == role;
};

// create and exports User modal
const Users = mongoose.model("Users", userSchema);

module.exports = Users;
