const { pool } = require("../../../config/database");
const baseResponseStatus = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");

const memberDao = require("./memberDao");
const res = require("express/lib/response");

// DB Test
exports.retrieveUserList = async function () {
    const connection = await pool.getConnection(async (conn) => conn);
    const handleError = (error) => logger.error(`❌retrieveUserList DB Error: ${error.message}`);
  
    try {
      const testResult = await memberDao.selectUserPosts(connection);
      connection.release();
      return response(baseResponseStatus.SUCCESS, testResult);
    } catch (error) {
      handleError(error);
      connection.release();
      return errResponse(baseResponseStatus.DB_ERRORS);
    }
  };

// 단체 모든 회원명단 리스트 조회 - API NO. 3.1
exports.retrieveClubMemberList = async function (adminIdx, start, pageSize) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌retriebeClubMemberList DB Error: ${error.message}`);


  try {
    const clubMembersPagingParams = [adminIdx, start, pageSize]
    const clubMembersResult = await memberDao.selectClub(connection, clubMembersPagingParams);
    connection.release();
    return clubMembersResult;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.DB_ERRORS);
  }
};

// API NO. 3.1 - AdminIdx Status Check
exports.checkClubStatus = async function (adminIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌checkClubStatus DB Error: ${error.message}`);

  //Try문 예외처리
  try {
    const clubStatus = await memberDao.selectClubStatus(connection, adminIdx);
    connection.release();
    return clubStatus[0].status;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.DB_ERRORS);
  }
};

// API NO. 3.1 - Paging's totalDataCount (3.1에서 조회하는 Data 갯수 조회)
exports.retrieveTotalDataCount = async function (adminIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌retrieveTotalDataCount DB Error: ${error.message}`);

  //Try문 예외처리
  try {
    const totalDataCountResult = await memberDao.selectTotalDataCount(connection, adminIdx);
    connection.release();
    return totalDataCountResult;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.DB_ERRORS);
  }
};

// 회원 상세 조회 - API NO. 3.2
exports.retrieveMemberInfo = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌retrieveMemberInfo DB Error: ${error.message}`);

  //Try문 예외처리
  try {
    const memberInfo = await memberDao.selectMemberInfo(connection, userIdx);
    connection.release();
    return memberInfo;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.DB_ERRORS);
  }
};

// API NO. 3.2 - User Status Check
exports.checkUserStatus = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌checkUserStatus DB Error: ${error.message}`);

  //Try문 예외처리
  try {
    const userStatus = await memberDao.selectUserStatus(connection, userIdx);
    connection.release();
    return userStatus[0].status;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.DB_ERRORS);
  }
};

// API NO. 3.2 - Token User with AdminIdx Status Check
exports.checkTokenUserStatus = async function (userIdx, JWT_Token_adminIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌checkUserStatus DB Error: ${error.message}`);

  //Try문 예외처리
  try {
    const TokenUserStatusParams = [userIdx, JWT_Token_adminIdx];
    const tokenUserStatus = await memberDao.selectTokenUserStatus(connection, TokenUserStatusParams);
    connection.release();
    return tokenUserStatus[0].status;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.DB_ERRORS);
  }
};