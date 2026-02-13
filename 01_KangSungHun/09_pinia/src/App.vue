<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import {useAuthStore} from "@/stores/auth.js";
import {logoutUser} from "@/api/user.js";

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = async () => {
  try{
    await logoutUser();
    await router.push("/"); // 로그아웃 후 메인 페이지로 라우팅
    authStore.clearAuth(); // 스토어 담긴 로그인 상태 변수 값 초기화
  }
  catch(e){
    console.log("로그아웃 실패", e);
  }
}

</script>

<template>
  <header>
    <nav>
      <div class="nav-links">
        <RouterLink to="/">MAIN</RouterLink>

        <template v-if="!!authStore.isAuthenticated">
          <RouterLink to="/mypage">MYPAGE</RouterLink>
        </template>

        <template v-else>
          <RouterLink to="/login">LOGIN</RouterLink>
          <RouterLink to="/register">REGISTER</RouterLink>
        </template>

      </div>


      <button
          v-if="!!authStore.isAuthenticated"
          class="nav-button"
          @click="handleLogout"
      >
        LOGOUT
      </button>

    </nav>

  </header>

  <main>
    <RouterView/>
  </main>

</template>

<style scoped>
header {
  background-color: rgba(0, 123, 255, 0.8);
  padding: 10px 20px;
}

nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-links {
  display: flex;
  align-items: center;
}

.nav-links a {
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  transition: background-color 0.3s;
}
.nav-links a:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.nav-button {
  background-color: transparent;
  border: 2px solid white;
  color: white;
  padding: 6px 14px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s, border-color 0.3s;
}
.nav-button:hover {
  background-color: white;
  color: #007bff;
  border-color: white;
}

main {
  padding: 20px;
  background-color: #f9f9f9;
  min-height: calc(100vh - 60px);
  border-top: 1px solid #ddd;
}
</style>
