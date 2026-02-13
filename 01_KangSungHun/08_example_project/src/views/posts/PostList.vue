<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { postApi, categoryApi } from '@/api/postApi';

const router = useRouter();
const posts = ref([]);
const categories = ref([]);
const loading = ref(false);
const selectedCategory = ref('');

/**
 * 게시글 목록 조회
 */
const fetchPosts = async () => {
  loading.value = true;
  try {
    // 카테고리가 선택된 경우 필터링
    const params = selectedCategory.value ? { category: selectedCategory.value } : {};

    const response = await postApi.getPosts(params);
    posts.value = response.data;
  } catch (error) {
    console.error('게시글 조회 실패:', error);
    alert('게시글을 불러오는데 실패했습니다.');
  } finally {
    loading.value = false;
  }
};

/**
 * 카테고리 목록 조회
 */
const fetchCategories = async () => {
  try {
    const response = await categoryApi.getCategories();
    categories.value = response.data;
  } catch (error) {
    console.error('카테고리 조회 실패:', error);
  }
};

/**
 * 게시글 상세 페이지로 이동
 */
const goToDetail = (id) => {
  router.push({ name: 'PostDetail', params: { id } });
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
  fetchPosts();
  fetchCategories();
});
</script>

<template>
  <div class="post-list-container">
    <div class="header">
      <h1>📝 게시글 목록 조회</h1>
    </div>

    <!-- 필터 및 작성 버튼 -->
    <div class="actions">
      <div class="filter-group">
        <label for="category">카테고리:</label>
        <select
          id="category"
          v-model="selectedCategory"
          @change="fetchPosts"
          class="category-select"
        >
          <option value="">전체</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>

      <router-link :to="{ name: 'PostCreate' }" class="btn-create">
        ➕ 새 글 작성
      </router-link>
    </div>

    <!-- 로딩 상태 -->
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>게시글을 불러오는 중...</p>
    </div>

    <!-- 게시글 목록 -->
    <div v-else class="posts-grid">
      <div v-if="posts.length === 0" class="no-posts">
        <p>📭 게시글이 없습니다.</p>
        <router-link :to="{ name: 'PostCreate' }" class="btn-create-empty">
          첫 게시글 작성하기
        </router-link>
      </div>

      <article
        v-for="post in posts"
        :key="post.id"
        class="post-card"
        @click="goToDetail(post.id)"
      >
        <div class="post-header">
          <h2 class="post-title">{{ post.title }}</h2>
          <span class="category-badge">{{ post.category }}</span>
        </div>

        <p class="post-preview">
          {{ post.content.substring(0, 100) }}{{ post.content.length > 100 ? '...' : '' }}
        </p>

        <div class="post-meta">
          <span class="author">👤 {{ post.author }}</span>
          <span class="date">📅 {{ formatDate(post.createdAt) }}</span>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.post-list-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.subtitle {
  color: #7f8c8d;
  font-size: 1.1rem;
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-group label {
  font-weight: 600;
  color: #2c3e50;
}

.category-select {
  padding: 8px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: border-color 0.3s;
}

.category-select:hover,
.category-select:focus {
  border-color: #42b883;
  outline: none;
}

.btn-create {
  padding: 10px 20px;
  background: #42b883;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  transition: background 0.3s;
}

.btn-create:hover {
  background: #35a372;
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

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
}

.no-posts {
  grid-column: 1 / -1;
  text-align: center;
  padding: 80px 20px;
}

.no-posts p {
  font-size: 1.5rem;
  color: #7f8c8d;
  margin-bottom: 20px;
}

.btn-create-empty {
  display: inline-block;
  padding: 12px 24px;
  background: #42b883;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
}

.post-card {
  background: white;
  border-radius: 10px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 12px;
}

.post-title {
  font-size: 1.4rem;
  color: #2c3e50;
  margin: 0;
  flex: 1;
}

.category-badge {
  padding: 4px 12px;
  background: #e3f2fd;
  color: #1976d2;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
}

.post-preview {
  color: #555;
  line-height: 1.6;
  margin-bottom: 16px;
}

.post-meta {
  display: flex;
  gap: 16px;
  font-size: 0.9rem;
  color: #7f8c8d;
  border-top: 1px solid #ecf0f1;
  padding-top: 12px;
}

.post-meta span {
  display: flex;
  align-items: center;
  gap: 4px;
}

@media (max-width: 768px) {
  .posts-grid {
    grid-template-columns: 1fr;
  }

  .actions {
    flex-direction: column;
    gap: 16px;
  }
}
</style>
