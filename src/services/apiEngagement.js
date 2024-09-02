import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://webapps.ip-one.com/ApiEngagementSurvey/api/EngagementSurvey/v1', // URL ของ API server ของคุณ
    withCredentials: false, // This is the default
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });

export default {
    setToken(token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    getQuestion() {
      return apiClient.get('/Question');
    },
    updateUser(data) {
      return apiClient.post('/Authentication', data);
    },
    updateAdvice(data) {
      return apiClient.post('/Advice', data);
    },
    updateSubjective(data) {
      return apiClient.post('/Subjective', data);
    },
    postAnswer(data) {
      return apiClient.post('/Answers', data);
    },
    getAnswersByUserID(data) {
      return apiClient.post('/AnswersByUserID', data);
    }
  };