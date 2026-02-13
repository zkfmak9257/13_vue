import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import {useAuthStore} from "@/stores/auth.js";
import {refreshUserToken} from "@/api/user.js";

async function bootstrap() {}
const app = createApp(App)
app.use(createPinia())

const authStore = useAuthStore();
try{
    const resp = await refreshUserToken();

    // 성공 == accessToken 발급 + 쿠키에 있는 리프레시 토큰이 갱신됨
    authStore.setAuth(resp.data.data.accessToken);

    console.log('초기화 : 로그인 상태 유지 ')
} catch (e){
    console.log('초기화 : 로그아웃 상태 유지 ')
}

app.use(router)

app.mount('#app')
