const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");
const authDao = require("./authDao");
const authProvider = require("./authProvider");

exports.postSignIn = async (email, pwd) => {
  try {
    const emailRows = await userProvider.emailCheck();
  } catch (err) {}
};
