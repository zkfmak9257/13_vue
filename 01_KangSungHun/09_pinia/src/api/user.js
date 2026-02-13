import api from './axios.js'; // 커스텀한 axios 객체 가져오기

/* 1. 회원 가입 */
export function registerUser(data){

    // http://localhost:8080/api/v1/users (POST) 요청
    // -> 요청 성공 시 응답으로 response 객체 반환됨
    // -> response.data 를 통해 응답 데이터 확인 가능
    return api.post("/users", data);
}

/* 2. 로그인 */
export function loginUser(data){
    return api.post("/auth/login", data);
}

/* 3. 리프레시 토큰을 이용해서 토큰 재발급
* -> 요청 시 쿠키에 유효한 리프레시 토큰이 있어야 정상 수행
*  */
export function refreshUserToken(){
    return api.post('/auth/refresh');
}


/* 4. 내 정보 조회*/
export function getUserDetail(){
    return api.get("/users/me");
}

/* 5. 유저 목록 조회(관리자) */
export function getUsers(){
    return api.get('/admin/users');
}

/* 6. 로그아웃 */
export function logoutUser(){
    return api.post("/auth/logout");
}
