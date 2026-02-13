import axios from './axios';

/**
 * 게시글 API 모음
 */
export const postApi = {
  /**
   * 게시글 목록 조회
   * @param {Object} params - 쿼리 파라미터 (예: { category: 'frontend' })
   * @returns {Promise}
   */
  getPosts(params) {
    params._sort = '-createdAt';
    return axios.get('/posts', { params });
  },

  /**
   * 게시글 상세 조회
   * @param {number|string} id - 게시글 ID
   * @returns {Promise}
   */
  getPost(id) {
    return axios.get(`/posts/${id}`);
  },

  /**
   * 게시글 생성
   * @param {Object} data - 게시글 데이터
   * @returns {Promise}
   */
  createPost(data) {
    return axios.post('/posts', data);
  },

  /**
   * 게시글 수정
   * @param {number|string} id - 게시글 ID
   * @param {Object} data - 수정할 데이터
   * @returns {Promise}
   */
  updatePost(id, data) {
    return axios.put(`/posts/${id}`, data);
  },

  /**
   * 게시글 삭제
   * @param {number|string} id - 게시글 ID
   * @returns {Promise}
   */
  deletePost(id) {
    return axios.delete(`/posts/${id}`);
  },
};

/**
 * 카테고리 API 모음
 */
export const categoryApi = {
  /**
   * 카테고리 목록 조회
   * @returns {Promise}
   */
  getCategories() {
    return axios.get('/categories');
  },
};