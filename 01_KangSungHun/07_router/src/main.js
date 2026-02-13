import { createApp } from 'vue'
import App from './App.vue'
import router from './router/01_router.js' // router 설정 js 파일 가져오기

const app = createApp(App)

app.use(router); // vue instance에서 router를 사용 하겠다고 등록
                 // (router 모듈 등록)

app.mount('#app')
