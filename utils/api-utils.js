import { request } from "@playwright/test";
import { API_ENDPOINTS } from '../constants/apiEndpoints'

export async function loginAndGetToken(baseURL, username, password) {
  const requestContext = await request.newContext();
  const response = await requestContext.post(`${baseURL}${API_ENDPOINTS.LOGIN}`, {
    data: { username, password },
  });

  const responseBody = await response.json();
  await requestContext.dispose();

  return responseBody.token;
}


export async function getWithParams(baseURL, token, endpoint, params) {
  const searchParams = new URLSearchParams(params).toString();
  const url = `${baseURL}${endpoint}?${searchParams}`;

  const requestContext = await request.newContext({
    extraHTTPHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  const response = await requestContext.get(url);
  const result = await response.json();
  await requestContext.dispose();
  return result;
}

// Create a new user
export async function createUser(baseURL, token, userPayload) {
  const requestContext = await request.newContext({
    extraHTTPHeaders: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const response = await requestContext.post(`${baseURL}${API_ENDPOINTS.CREATE_USER}`, {
    data: userPayload,
  });

  const responseBody = await response.json();
  await requestContext.dispose();
  return responseBody;
  A;
}

// Delete a user by ID
export async function deleteUser(baseURL, token, userId) {
  const requestContext = await request.newContext({
    extraHTTPHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  const response = await requestContext.delete(
    `${baseURL}${API_ENDPOINTS.DELETE_USER(userId)}`
  );
  const responseBody = await response.json();
  await requestContext.dispose();
  return responseBody;
}

// Get all users
export async function getAllUsers(baseURL, token) {
  const requestContext = await request.newContext({
    extraHTTPHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  const response = await requestContext.get(`${baseURL}${API_ENDPOINTS.GET_ALL_USERS}`);
  const responseBody = await response.json();
  await requestContext.dispose();
  return responseBody;
}

// Get user details
export async function getUserProfile(baseURL, token) {
  const requestContext = await request.newContext({
    extraHTTPHeaders: { Authorization: `Bearer ${token}`, },
  });
  
  const response = await requestContext.get(`${baseURL}${API_ENDPOINTS.USER_DETAILS}`);
  const responseBody = await response.json();
  await requestContext.dispose();
  return responseBody;
}
