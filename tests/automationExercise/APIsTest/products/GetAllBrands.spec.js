import { test, expect } from '@playwright/test';
import config from '../../../../configEnvirment';
import EndPoints from '../../../../constants/apiEndpoints';

test('API 3: Get All Brands List - should return 200 and brands list', async ({ request }) => {
  const apiUrl = `${config.baseUrl}${EndPoints.BRANDS_LIST}`;
  
  const response = await request.get(apiUrl);
  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  console.log(`Received ${responseBody.brands.length} brands`);

  expect(responseBody).toHaveProperty('brands');
  expect(Array.isArray(responseBody.brands)).toBe(true);
  expect(responseBody.brands.length).toBeGreaterThan(0);

  const firstBrand = responseBody.brands[0];
  expect(firstBrand).toHaveProperty('id');
  expect(firstBrand).toHaveProperty('brand');  // <-- changed from 'brand_name' to 'brand'
});
