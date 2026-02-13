<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { postApi, categoryApi } from '@/api/postApi';

const route = useRoute();
const router = useRouter();
const categories = ref([]);
const loading = ref(false);
const submitting = ref(false);

// 폼 데이터
const form = ref(null);

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
 * 기존 게시글 조회
 */
const fetchPost = async () => {
  loading.value = true;
  const { id } = route.params;

  try {
    const response = await postApi.getPost(id);
    // 전체 데이터를 복사
    form.value = { ...response.data };
  } catch (error) {
    console.error('게시글 조회 실패:', error);
    alert('게시글을 찾을 수 없습니다.');
    router.push({ name: 'PostList' });
  } finally {
    loading.value = false;
  }
};

/**
 * 게시글 수정
 */
const updatePost = async () => {
  // 유효성 검사
  if (!form.value.title.trim()) {
    alert('제목을 입력해주세요.');
    return;
  }
  if (!form.value.content.trim()) {
    alert('내용을 입력해주세요.');
    return;
  }
  if (!form.value.author.trim()) {
    alert('작성자를 입력해주세요.');
    return;
  }

  submitting.value = true;

  try {
    await postApi.updatePost(route.params.id, form.value);
    alert('게시글이 수정되었습니다! ✅');
    // 수정된 게시글 상세 페이지로 이동
    router.push({ name: 'PostDetail', params: { id: route.params.id } });
  } catch (error) {
    console.error('수정 실패:', error);
    alert('게시글 수정에 실패했습니다.');
  } finally {
    submitting.value = false;
  }
};

/**
 * 취소 (상세 페이지로)
 */
const cancel = () => {
  if (confirm('수정을 취소하시겠습니까? 변경 사항은 저장되지 않습니다.')) {
    router.push({ name: 'PostDetail', params: { id: route.params.id } });
  }
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
onMounted(async () => {
  await fetchCategories();
  await fetchPost();
});
</script>

<template>
  <div class="post-form-container">
    <div class="form-header">
      <h1>📝 게시글 수정</h1>
      <p class="subtitle">게시글 내용을 수정해보세요</p>
    </div>

    <!-- 로딩 상태 -->
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>게시글을 불러오는 중...</p>
    </div>

    <!-- 수정 폼 -->
    <form v-else-if="form" @submit.prevent="updatePost" class="post-form">
      <!-- 제목 -->
      <div class="form-group">
        <label for="title" class="required">제목</label>
        <input
          id="title"
          v-model="form.title"
          type="text"
          placeholder="게시글 제목을 입력하세요"
          maxlength="100"
          required
        />
        <span class="char-count">{{ form.title.length }} / 100</span>
      </div>

      <!-- 작성자 -->
      <div class="form-group">
        <label for="author" class="required">작성자</label>
        <input
          id="author"
          v-model="form.author"
          type="text"
          placeholder="이름을 입력하세요"
          maxlength="30"
          required
        />
      </div>

      <!-- 카테고리 -->
      <div class="form-group">
        <label for="category" class="required">카테고리</label>
        <select id="category" v-model="form.category" required>
          <option value="" disabled>카테고리를 선택하세요</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>

      <!-- 내용 -->
      <div class="form-group">
        <label for="content" class="required">내용</label>
        <textarea
          id="content"
          v-model="form.content"
          rows="15"
          placeholder="게시글 내용을 입력하세요"
          maxlength="5000"
          required
        ></textarea>
        <span class="char-count">{{ form.content.length }} / 5000</span>
      </div>

      <!-- 작성일 (읽기 전용) -->
      <div class="form-group">
        <label for="date">작성일</label>
        <input
          id="date"
          :value="formatDate(form.createdAt)"
          type="text"
          readonly
          disabled
        />
      </div>

      <!-- 버튼 -->
      <div class="form-actions">
        <button
          type="button"
          @click="cancel"
          class="btn btn-cancel"
          :disabled="submitting"
        >
          취소
        </button>
        <button
          type="submit"
          class="btn btn-submit"
          :disabled="submitting"
        >
          {{ submitting ? '수정 중...' : '✅ 수정 완료' }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.post-form-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.form-header {
  text-align: center;
  margin-bottom: 40px;
}

.form-header h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.subtitle {
  color: #7f8c8d;
  font-size: 1rem;
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

.post-form {
  background: white;
  padding: 40px 32px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 24px;
  position: relative;
}

.form-group label {
  display: block;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
  font-size: 1rem;
}

.form-group label.required::after {
  content: ' *';
  color: #e74c3c;
}

.form-group input[type="text"],
.form-group input[type="date"],
.form-group input[type="number"],
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.3s;
}

.form-group input[type="text"]:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #42b883;
}

.form-group input[type="date"]:disabled,
.form-group input[type="number"]:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

.form-group textarea {
  resize: vertical;
  min-height: 200px;
  line-height: 1.6;
}

.char-count {
  position: absolute;
  right: 0;
  bottom: -20px;
  font-size: 0.85rem;
  color: #95a5a6;
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 2px solid #ecf0f1;
}

.btn {
  padding: 12px 32px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-cancel {
  background: #95a5a6;
  color: white;
}

.btn-cancel:hover:not(:disabled) {
  background: #7f8c8d;
}

.btn-submit {
  background: #3498db;
  color: white;
}

.btn-submit:hover:not(:disabled) {
  background: #2980b9;
}

@media (max-width: 768px) {
  .post-form {
    padding: 24px;
  }

  .form-header h1 {
    font-size: 1.5rem;
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .btn {
    width: 100%;
  }
}
</style>