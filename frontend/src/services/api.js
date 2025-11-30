// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://hospital-management-app-quickqueue.onrender.com/api',
  headers: { 'Content-Type': 'application/json' }
});

export const departmentAPI = {
  getAll: () => api.get('/departments')
};

export const tokenAPI = {
  generate: (name, department, phone = '') =>
    api.post('/token/generate', { name, department, phone }),
  listByDepartment: (department) => api.get(`/tokens/${department}`),
  adminNext: (department) => api.post('/admin/next', { department }),
  resetDepartment: (department) => api.post(`/admin/reset/${department}`)
};

