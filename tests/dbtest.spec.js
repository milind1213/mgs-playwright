import { test, expect } from '@playwright/test';
import { getBrands, getProducts, getUsers, getData } from '../fixtures/DbFixtures/automationExercise/productsFixture';

test('DB Test - Validate brands table', async () => {
  const brands = await getBrands();
  expect(brands.length).toBeGreaterThan(0);
  expect(brands[0]).toHaveProperty('id');
  expect(brands[0]).toHaveProperty('brand_name');
  console.log('Brands:', brands.slice(0, 3));
});

test('DB Test - Validate products table', async () => {
  const products = await getProducts();
  expect(products.length).toBeGreaterThan(0);
  expect(products[0]).toHaveProperty('name');
  expect(products[0]).toHaveProperty('price');
  expect(products[0]).toHaveProperty('brand_id');
  console.log('Products:', products.slice(0, 3));
});

test('DB Test - Validate users table', async () => {
  const users = await getUsers();
  expect(users.length).toBeGreaterThan(0);
  expect(users[0]).toHaveProperty('name');
  expect(users[0]).toHaveProperty('email');
  console.log('Users:', users.slice(0, 3));
});

test('DB Test - Get brand name by ID', async () => {
  const brandName = await getData("SELECT brand_name FROM brands WHERE id = 1");
  expect(brandName).toBe('Polo'); 
  console.log('Brand with ID 1:', brandName);
});

test('DB Test - Get user email by name', async () => {
  const email = await getData("SELECT email FROM users WHERE name = 'Oscar Isaac'");
  expect(email).toBe('oscar.isaac@example.com'); 
  console.log('Oscar Isaac Email:', email);
});
