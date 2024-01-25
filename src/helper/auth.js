const JWT = require("jsonwebtoken");
require('dotenv').config()
let authenticateJwtToken = async function (token) {
  try {
    let response;
    JWT.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          response = {
            status: 401,
            msg: err,
          };
        } else {
          response = {
            status: 401,
            msg: "Unauthorized",
          };
        }
      } else {
        response = {
          status: 200,
          msg: {
            verified: true,
            id: payload._id,
            email: payload.email,
            name: payload.name,
          },
        };
      }
    });
    return response;
  } catch (error) {
    return {
      status: 500,
      msg: error,
    };
  }
};

module.exports = {
  authenticateJwtToken,
};
