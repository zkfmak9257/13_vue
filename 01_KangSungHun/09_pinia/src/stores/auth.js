/* 인증 스토어 (pinia) */
import {defineStore} from "pinia";
import {ref, computed} from "vue";

export const useAuthStore = defineStore('auth', () => {

    // State
    const accessToken = ref(null);
    const userRole = ref(null);
    const expirationTime = ref(null); // 만료시간


    // Actions
    function setAuth(at){
        accessToken.value = at;

        // accessToken 분석 -> userRole, expirationTime 추출
        try {
            // JWT는 보통 header.payload.signature 형태로 . 3덩어리로 구성
            // atob(...) → Base64 디코딩해서 JSON 문자열로 만듦
            // JSON.parse() : JSON -> JS Object
            const payload = JSON.parse(atob(at.split('.')[1]));
            console.log('✨✨✨✨✨✨payload', payload);

            userRole.value = payload.role;
            expirationTime.value = payload.exp * 1000; // s -> ms  단위로 변환
        } catch (e) {
            accessToken.value = null;
            userRole.value = null;
            expirationTime.value = null;
        }

    }


    // Getters
    // access token이 존재하고, 만료일을 넘지 않으면 true, 아님 false
    const isAuthenticated = computed(() =>
        !!accessToken.value && Date.now() < (expirationTime.value || 0)
    );


    const clearAuth = () => {
        accessToken.value = null;
        userRole.value = null;
        expirationTime.value = null;
    }


    return { accessToken, userRole,
        expirationTime, setAuth,
        isAuthenticated, clearAuth }
});