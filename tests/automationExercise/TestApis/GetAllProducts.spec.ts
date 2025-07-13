import { test, expect } from '@playwright/test';
import config from '../../../config/configEnvirment';
import { END_POINTS } from '../../../config/constants';

test('API 1: Get All Products List - should return 200 and product list', async ({ request }) => {
  const apiUrl = `${config.baseUrl}${END_POINTS.PRODUCTS_LIST}`;
  console.log(`Requesting GET ${apiUrl}`);

  const response = await request.get(apiUrl);
  expect(response.status(), 'Response status should be 200').toBe(200);

  const responseBody = await response.json();
  console.log(`Received ${responseBody.products?.length ?? 0} products`);

  expect(responseBody).toHaveProperty('products');
  expect(Array.isArray(responseBody.products), 'Products should be an array').toBe(true);
  expect(responseBody.products.length, 'Products list should not be empty').toBeGreaterThan(0);

  // Validate first product details
  const firstProduct = responseBody.products[0];
  expect(firstProduct).toHaveProperty('id');
  expect(firstProduct).toHaveProperty('name');
  expect(firstProduct).toHaveProperty('price');
  expect(firstProduct).toHaveProperty('brand');
  expect(firstProduct).toHaveProperty('category');
});
