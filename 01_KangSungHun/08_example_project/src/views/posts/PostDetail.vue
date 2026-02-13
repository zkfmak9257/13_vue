<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { postApi } from '@/api/postApi';

const route = useRoute();
const router = useRouter();
const post = ref(null);
const loading = ref(false);

/**
 * 게시글 상세 조회
 */
const fetchPost = async () => {
  loading.value = true;
  const { id } = route.params;

  try {
    const response = await postApi.getPost(id);
    post.value = response.data;
  } catch (error) {
    console.error('게시글 조회 실패:', error);
    alert('게시글을 찾을 수 없습니다.');
    router.push({ name: 'PostList' });
  } finally {
    loading.value = false;
  }
};

/**
 * 게시글 삭제
 */
const deletePost = async () => {
  if (!confirm('정말 이 게시글을 삭제하시겠습니까?')) {
    return;
  }

  try {
    await postApi.deletePost(post.value.id);
    alert('게시글이 삭제되었습니다.');
    router.push({ name: 'PostList' });
  } catch (error) {
    console.error('삭제 실패:', error);
    alert('게시글 삭제에 실패했습니다.');
  }
};

/**
 * 수정 페이지로 이동
 */
const goToEdit = () => {
  router.push({ name: 'PostEdit', params: { id: post.value.id } });
};

/**
 * 목록으로 이동
 */
const goToList = () => {
  router.push({ name: 'PostList' });
};

/**
 * 날짜 포맷팅 (년월일시분초)
 */
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// 컴포넌트 마운트 시 데이터 조회
onMounted(() => {
  fetchPost();
});
</script>

<template>
  <div class="post-detail-container">
    <!-- 로딩 상태 -->
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>게시글을 불러오는 중...</p>
    </div>

    <!-- 게시글 내용 -->
    <article v-else-if="post" class="post-detail">
      <!-- 헤더 -->
      <header class="post-header">
        <div class="title-section">
          <h1 class="post-title">{{ post.title }}</h1>
          <span class="category-badge">{{ post.category }}</span>
        </div>

        <div class="post-info">
          <span class="info-item">
            <span class="icon">👤</span>
            <span>{{ post.author }}</span>
          </span>
          <span class="info-item">
            <span class="icon">📅</span>
            <span>{{ formatDate(post.createdAt) }}</span>
          </span>
        </div>
      </header>

      <!-- 본문 -->
      <div class="post-content">
        <p>{{ post.content }}</p>
      </div>

      <!-- 액션 버튼 -->
      <footer class="post-actions">
        <button @click="goToList" class="btn btn-secondary">
          📋 목록으로
        </button>
        <div class="action-group">
          <button @click="goToEdit" class="btn btn-primary">
            ✏️ 수정
          </button>
          <button @click="deletePost" class="btn btn-danger">
            🗑️ 삭제
          </button>
        </div>
      </footer>
    </article>
  </div>
</template>

<style scoped>
.post-detail-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.loading {
  text-align: center;
  padding: 60px 20px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #42b883;
  border-radius: 50%;
  margin: 0 auto 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.post-detail {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.post-header {
  padding: 32px;
  border-bottom: 2px solid #ecf0f1;
  background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);
}

.title-section {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 20px;
}

.post-title {
  font-size: 2rem;
  color: #2c3e50;
  margin: 0;
  flex: 1;
  line-height: 1.4;
}

.category-badge {
  padding: 6px 16px;
  background: #42b883;
  color: white;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  white-space: nowrap;
}

.post-info {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #7f8c8d;
  font-size: 0.95rem;
}

.icon {
  font-size: 1.1rem;
}

.post-content {
  padding: 40px 32px;
  line-height: 1.8;
  font-size: 1.1rem;
  color: #2c3e50;
  min-height: 300px;
}

.post-content p {
  margin: 0;
  white-space: pre-wrap;
}

.post-actions {
  display: flex;
  justify-content: space-between;
  padding: 24px 32px;
  border-top: 2px solid #ecf0f1;
  background: #f8f9fa;
}

.action-group {
  display: flex;
  gap: 12px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-secondary {
  background: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background: #7f8c8d;
}

.btn-primary {
  background: #3498db;
  color: white;
}

.btn-primary:hover {
  background: #2980b9;
}

.btn-danger {
  background: #e74c3c;
  color: white;
}

.btn-danger:hover {
  background: #c0392b;
}

@media (max-width: 768px) {
  .post-header {
    padding: 24px 20px;
  }

  .post-title {
    font-size: 1.5rem;
  }

  .title-section {
    flex-direction: column;
  }

  .post-info {
    gap: 16px;
  }

  .post-content {
    padding: 24px 20px;
    font-size: 1rem;
  }

  .post-actions {
    flex-direction: column;
    gap: 12px;
    padding: 20px;
  }

  .action-group {
    width: 100%;
  }

  .btn {
    flex: 1;
  }
}
</style>
