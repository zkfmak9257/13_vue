<script setup>
import {useRouter} from 'vue-router';

const router = useRouter();

const goToPosts = () => {
  router.push({name: 'PostList'});
};
</script>

<template>
  <div class="home-container">
    <!-- 히어로 섹션 -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="emoji">📚</span>
          Vue Example Project
        </h1>
        <p class="hero-subtitle">
          Vue Router + Axios + JSON Server 활용 예제
        </p>
        <button @click="goToPosts" class="cta-button">
          게시글 보러가기 →
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* 히어로 섹션 */
.hero {
  text-align: center;
  padding: 80px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  color: white;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3rem;
  margin-bottom: 20px;
  animation: fadeInUp 0.6s ease-out;
}

.emoji {
  display: inline-block;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-subtitle {
  font-size: 1.3rem;
  margin-bottom: 40px;
  opacity: 0.95;
  line-height: 1.8;
}

.cta-button {
  padding: 16px 40px;
  font-size: 1.1rem;
  font-weight: 600;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }
}
</style>