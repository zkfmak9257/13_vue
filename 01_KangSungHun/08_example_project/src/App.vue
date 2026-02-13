<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container">
    <!-- 네비게이션 헤더 -->
    <header class="navbar">
      <div class="nav-container">
        <div class="logo">
          <RouterLink to="/">
            <h1>📚 Vue Router + Axios + JSON Server 예제</h1>
          </RouterLink>
        </div>
        <nav class="nav-links">
          <RouterLink to="/" class="nav-link">홈</RouterLink>
          <RouterLink to="/posts" class="nav-link">게시글</RouterLink>
          <RouterLink to="/posts/create" class="nav-link-create">
            ✏️ 글쓰기
          </RouterLink>
        </nav>
      </div>
    </header>

    <!-- 메인 컨텐츠 -->
    <main class="main-content">
      <RouterView />
    </main>

    <!-- 푸터 -->
    <footer class="footer">
      <p>© 2026 Vue Blog - Vue Router + Axios + JSON Server 예제</p>
    </footer>
  </div>
</template>

<style>
/* 전역 스타일 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f5f7fa;
  color: #2c3e50;
}



.main-content {
  max-width: 1200px;
  flex: 1;
  padding-top: 120px; /* navbar 높이만큼 */
}
</style>

<style scoped>
.container{
  min-height: 100vh;
  width: 80vw;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo a {
  text-decoration: none;
  color: #2c3e50;
}

.logo h1 {
  font-size: 1.5rem;
  margin: 0;
  transition: color 0.3s;
}

.logo a:hover h1 {
  color: #42b883;
}

.nav-links {
  display: flex;
  gap: 20px;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #2c3e50;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.3s;
}

.nav-link:hover {
  background: #f5f7fa;
  color: #42b883;
}

.nav-link.router-link-active {
  color: #42b883;
  background: #e8f5e9;
}

.nav-link-create {
  text-decoration: none;
  padding: 8px 20px;
  background: #42b883;
  color: white;
  border-radius: 6px;
  font-weight: 600;
  transition: background 0.3s;
}

.nav-link-create:hover {
  background: #35a372;
}

.footer {
  background: white;
  border-top: 1px solid #e0e0e0;
  padding: 24px 20px;
  text-align: center;
  margin-top: 60px;
}

.footer p {
  color: #7f8c8d;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 16px;
    padding: 12px 20px;
  }

  .nav-links {
    width: 100%;
    justify-content: center;
  }

  .main-content {
    padding-top: 120px;
  }
}
</style>
