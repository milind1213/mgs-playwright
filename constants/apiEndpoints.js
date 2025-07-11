export const API_ENDPOINTS = {
  LOGIN: '/api/login',
  USER_DETAILS: '/api/user',
  CREATE_USER: '/api/users',
  DELETE_USER: (userId) => `/api/users/${userId}`,
  GET_ALL_USERS: '/api/users',
};