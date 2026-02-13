import axios from 'axios'
import {useAuthStore} from "@/stores/auth.js";

// axios : http client, 비동기 요청/응답을 쉽게 처리해주는 라이브러리
// 사용법 2가지 : 1) 제공해주는 axios 객체 사용, 2) 커스텀 axios 객체 생성

const api = axios.create({
    /* 요청/응답에 공통적으로 적용될 내용을 커스텀 axios에 정의 */
    baseURL: import.meta.env.VITE_API_BASE_URL, // .env 사용
    headers: {'Content-Type': 'application/json'},
    withCredentials: true // HttpOnly Cookie 사용 시 추가
})

// api를 이용해서 서버 요청(request) 시
// 요청을 가로채서(interceptor)
// 요청 헤더에 access token을 삽입
api.interceptors.request.use(config => {
    const authStore = useAuthStore();

    if (authStore.accessToken) { // accessToken이 있다면
        config.headers.Authorization = `Bearer ${authStore.accessToken}`;
    }

    return config;
});


api.interceptors.response.use(
    res => res,
    async err => {
        const authStore = useAuthStore();
        const {config, response} = err;

        if (config.url.includes('/auth/refresh')) {
            // 리프레시 요청에서 401이 오면 바로 로그아웃 처리
            await authStore.clearAuth();
            return Promise.reject(err);
        }

        // 401 에러만 처리
        if (response?.status === 401) {
            // 이미 재시도 한 요청이면 로그아웃 하고 에러 던짐
            if (config._retry) {
                await authStore.clearAuth();
                return Promise.reject(err);
            }
            config._retry = true;

            // 토큰 재발급 시도
            try {
                const refreshRes = await refreshUserToken();
                const newToken = refreshRes.data.data.accessToken;
                authStore.setAuth(newToken);

                // 헤더 갱신 후 원래 요청 재시도
                config.headers.Authorization = `Bearer ${newToken}`;
                return api(config);
            } catch (refreshErr) {
                // 재발급 실패하면 로그아웃
                await authStore.clearAuth();
                return Promise.reject(refreshErr);
            }
        }

        // 그 외 에러는 그대로 던짐
        return Promise.reject(err);
    }
);


export default api;