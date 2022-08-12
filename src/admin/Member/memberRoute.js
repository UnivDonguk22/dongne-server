import express from "express";
// import  {getDatabaseTest, getClubMemberList} from "./memberController";
const member = require("./memberController");
const jwtMiddleWare = require("../../../config/jwtMiddleWare");

const memberRouter = express.Router();

// Route Test
memberRouter.get("/db", member.getDatabaseTest);

/*
    개발 노트 (8/12) 📝
    jwtMiddleWare 를 통과했다는 의미는 로그인을 성공해서 헤더에 jwt 토큰을 제공한 상황임.

    - authController
    jwt token은 로그인하면 발급을 해준다.
    여기서 jwt token은 어드민의 계정상태가 ACTIVE 이면서, {이메일, 비밀번호}가 일치할 때 발급을 수행한다.

    - jwtMiddleWare
    발급 받은 jwt token을 jwtMiddleWare에서 올바른 token인지 검증을 진행한다.
    따라서, jwtMiddleWare 를 통과한 건 ACTIVE 상태(동네 웹에 등록된 어드민)인 어드민 클라이언트가 접근을 했다를 의미한다.

        그렇기에, 어드민 side의 API에서 필요한 Validation을 기록했다.
        - 로그인 한 어드민이 자신의 권한에 맞는 API 요청을 하는지에 대한 Validation 필요
*/

// 3.1 단체 모든 회원명단 리스트 조회 API
/**
 * @swagger
 * paths:
 *  /member?adminIdx={adminIdx}:
 *   get:
 *     tags: [회원 명단]
 *     summary: 단체 모든 회원명단 리스트 조회 API
 *     parameters:
 *         - in: query
 *           name: adminIdx
 *           securitySchemes:
 *              type: integer
 *           example: 1
 *           required: true
 *           description: 단체 인덱스
 *     responses:
 *       "1000":
 *         description: 단체 모든 회원명단 리스트 조회 API 성공
 *       "2001":
 *         description: 파라미터(adminIdx)를 입력하세요.
 *       "2002":
 *         description: adminIdx는 0보다 큰 값으로 입력해주세요.
 *       "2003":
 *         description: 유효하지 않은 adminIdx입니다. (INACTIVE or DELETED)
 *       "5000":
 *         description: 데이터 베이스 에러
 *
 */
memberRouter.get("/",jwtMiddleWare ,member.getClubMemberList);


// 3.2 회원 상세 조회 API
/**
 * @swagger
 * paths:
 *  /member/info?userIdx={userIdx}:
 *   get:
 *     tags: [회원 명단]
 *     summary: 회원 상세 조회 API
 *     parameters:
 *         - in: query
 *           name: userIdx
 *           securitySchemes:
 *              type: integer
 *           example: 2
 *           required: true
 *           description: 유저 인덱스
 *     responses:
 *       "1000":
 *         description: 단체 모든 회원명단 리스트 조회 API 성공
 *       "3000":
 *         description: 파라미터(adminIdx)를 입력하세요.
 *       "3001":
 *         description: adminIdx는 0보다 큰 값으로 입력해주세요.
 *       "3002":
 *         description: 유효하지 않은 adminIdx입니다. (INACTIVE or DELETED)
 *       "5000":
 *         description: 데이터 베이스 에러
 *
 */
memberRouter.get("/info",jwtMiddleWare ,member.getMemberInfo);




// 3.3 회원 삭제하기
// Query String
// JWT Token 적용하고 진행
memberRouter.patch("/",jwtMiddleWare ,member.patchMember);

export default memberRouter;
