import axios from 'axios';

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: 'http://localhost:3000',  // JSON Server 주소
  timeout: 5000,                      // 요청 타임아웃: 5초
});

// 요청 인터셉터 (선택사항 - 로그 확인용)
instance.interceptors.request.use(
  (config) => {
    console.log('요청:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('요청 에러:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (선택사항 - 로그 확인용)
instance.interceptors.response.use(
  (response) => {
    console.log('응답:', response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error('응답 에러:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default instance;