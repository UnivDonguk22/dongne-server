const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const attendanceProvider = require("./attendanceProvider");
const attendanceService = require("./attendanceService");

/**
 * API No. 6.1
 * API Name : 출석한 회원 리스트 조회 API
 * [GET] admin/attendance/:scheduleIdx
 */
exports.getAttendance = async function (req, res) {
  // Path Variable : scheduleIdx
  const scheduleIdx = req.params.scheduleIdx;
  // body : adminIdx, curPage
  const { adminIdx, curPage } = req.body;
  // jwt : adminId
  const adminIdxFromJWT = req.verifiedToken.adminId;

  // adminIdx validation
  if (!adminIdx) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_EMPTY));
  } else if (adminIdx <= 0) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_LENGTH));
  } else if (adminIdx != adminIdxFromJWT) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_NOT_MATCH));
  }

  // admin validation
  // validation
  if (!scheduleIdx) {
    return res.send(errResponse(baseResponse.SCHEDULE_SCHEDULEIDX_EMPTY));
  } else if (scheduleIdx <= 0) {
    return res.send(errResponse(baseResponse.SCHEDULE_SCHEDULEIDX_LENGTH));
  }
  if (curPage <= 0) {
    curPage = 1;
  }

  const attendListResult = await attendanceProvider.retrieveAttendList(
    scheduleIdx,
    curPage
  );
  return res.send(attendListResult);
};

/**
 * API No. 6.2
 * API Name : 결석한 회원 리스트 조회 API
 * [GET] admin/attendance/absence/:scheduleIdx
 */
exports.getAbsence = async function (req, res) {
  // Path Variable : scheduleIdx
  const scheduleIdx = req.params.scheduleIdx;
  // body : adminIdx,curPage
  const { adminIdx, curPage } = req.body;
  // jwt : adminId
  const adminIdxFromJWT = req.verifiedToken.adminId;

  // adminIdx validation
  if (!adminIdx) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_EMPTY));
  } else if (adminIdx <= 0) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_LENGTH));
  } else if (adminIdx != adminIdxFromJWT) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_NOT_MATCH));
  }

  // validation
  if (!scheduleIdx) {
    return res.send(errResponse(baseResponse.SCHEDULE_SCHEDULEIDX_EMPTY));
  } else if (scheduleIdx <= 0) {
    return res.send(errResponse(baseResponse.SCHEDULE_SCHEDULEIDX_LENGTH));
  }
  if (curPage <= 0) {
    curPage = 1;
  }

  const absenceListResult = await attendanceProvider.retrieveAbsenceList(
    scheduleIdx,
    curPage
  );
  return res.send(absenceListResult);
};

/**
 * API No. 6.3
 * API Name : 출석코드 API 조회
 * [GET] admin/attendance/code/:scheduleIdx
 */
exports.getAttendCode = async function (req, res) {
  // Path Variable : scheduleIdx
  const scheduleIdx = req.params.scheduleIdx;
  // body : adminIdx
  const { adminIdx } = req.body;
  // jwt : adminId
  const adminIdxFromJWT = req.verifiedToken.adminId;

  // adminIdx validation
  if (!adminIdx) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_EMPTY));
  } else if (adminIdx <= 0) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_LENGTH));
  } else if (adminIdx != adminIdxFromJWT) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_NOT_MATCH));
  }

  // validation
  if (!scheduleIdx) {
    return res.send(errResponse(baseResponse.SCHEDULE_SCHEDULEIDX_EMPTY));
  } else if (scheduleIdx <= 0) {
    return res.send(errResponse(baseResponse.SCHEDULE_SCHEDULEIDX_LENGTH));
  }

  const attendCodeResult = await attendanceProvider.retrieveAttendCode(
    scheduleIdx
  );

  return res.send(attendCodeResult);
};

/**
 * API No. 6.4
 * API Name : 회원 출석 처리 API
 * [POST] admin/attendance/:scheduleIdx
 */
exports.patchAttendacne = async function (req, res) {
  // Path Variable : scheduleIdx
  const scheduleIdx = req.params.scheduleIdx;
  // body : adminIdx, userIdx
  const { adminIdx, userIdx } = req.body;
  // jwt : adminId
  const adminIdxFromJWT = req.verifiedToken.adminId;

  // adminIdx validation
  if (!adminIdx) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_EMPTY));
  } else if (adminIdx <= 0) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_LENGTH));
  } else if (adminIdx != adminIdxFromJWT) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_NOT_MATCH));
  }

  // validation
  if (!scheduleIdx) {
    return res.send(errResponse(baseResponse.SCHEDULE_SCHEDULEIDX_EMPTY));
  } else if (scheduleIdx <= 0) {
    return res.send(errResponse(baseResponse.SCHEDULE_SCHEDULEIDX_LENGTH));
  }
  if (!userIdx) {
    return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
  } else if (userIdx <= 0) {
    return res.send(errResponse(baseResponse.USER_USERIDX_LENGTH));
  }

  // response
  const patchAttendResult = await attendanceService.editAttendance(
    scheduleIdx,
    userIdx
  );
  return res.send(patchAttendResult);
};

/**
 * API No. 6.5
 * API Name : 회원 결석 처리 API
 * [POST] admin/attendance/absence/:scheduleIdx
 */
exports.patchAbsence = async function (req, res) {
  // Path Variable : scheduleIdx
  const scheduleIdx = req.params.scheduleIdx;
  // body : adminIdx, userIdx
  const { adminIdx, userIdx } = req.body;
  // jwt : adminId
  const adminIdxFromJWT = req.verifiedToken.adminId;

  // adminIdx validation
  if (!adminIdx) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_EMPTY));
  } else if (adminIdx <= 0) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_LENGTH));
  } else if (adminIdx != adminIdxFromJWT) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_NOT_MATCH));
  }

  // validation
  if (!scheduleIdx) {
    return res.send(errResponse(baseResponse.SCHEDULE_SCHEDULEIDX_EMPTY));
  } else if (scheduleIdx <= 0) {
    return res.send(errResponse(baseResponse.SCHEDULE_SCHEDULEIDX_LENGTH));
  }
  if (!userIdx) {
    return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
  } else if (userIdx <= 0) {
    return res.send(errResponse(baseResponse.USER_USERIDX_LENGTH));
  }

  // response
  const patchAbsenceResult = await attendanceService.editAbsence(
    scheduleIdx,
    userIdx
  );
  return res.send(patchAbsenceResult);
};
