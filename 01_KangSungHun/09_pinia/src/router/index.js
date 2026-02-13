import { createRouter, createWebHistory } from 'vue-router'
import MainView from "@/views/main/MainView.vue";
import {useAuthStore} from "@/stores/auth.js";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'main',
            component: MainView,
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/user/RegisterView.vue')
        },
        {
            path: '/login',
            name: 'login',
            component : () => import('@/views/user/LoginView.vue')
        },
        {
            path: '/mypage',
            name: 'mypage',
            component: () => import('@/views/user/MyPageView.vue'),
            meta : { requiresAuth : true }
            // 임의의 메타 데이터를 기록 --> 로그인 되었음을 기록
        }
    ],
})

/* 네비게이션 가드
* - 라우팅 전에 실행되어 라우팅 여부를 결정하는 함수
* */
router.beforeEach(to => {
    // 로그인 여부에 따라 라우팅 가능 페이지 제어

    const authStore = useAuthStore();

    // to : 라우팅 정보
    // 마이페이지(인증 필수 페이지) 라우팅 하는데  로그인 X 상태
    if(to.meta.requiresAuth && !authStore.isAuthenticated){
        return{
            name : 'login',
            query : {redirect : to.fullPath}
        }
    }

    // 로그인, 회원가입 페이지에 이미 로그인 된 상태로 접근하면 메인으로 이동
    if((to.name === 'login' || to.name === 'register') && authStore.isAuthenticated) {
        return { name : 'main' }
    }

})

export default router
