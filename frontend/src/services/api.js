// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' }
});

export const departmentAPI = {
  getAll: () => api.get('/departments')
};

export const tokenAPI = {
  // user generates token
  generate: (name, department, phone = '') =>
    api.post('/token/generate', { name, department, phone }),

  // admin: list tokens for a department (for the table)
  listByDepartment: (department) => api.get(`/tokens/${department}`),

  // admin: call next token
  adminNext: (department) => api.post('/admin/next', { department }),

  // admin: reset queue
  resetDepartment: (department) => api.post(`/admin/reset/${department}`)
};
