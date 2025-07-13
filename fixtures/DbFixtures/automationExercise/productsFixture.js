import { getDataArray } from '../../../utils/dbUtils.js';

export async function getBrands() {
  return await getDataArray('SELECT * FROM brands');
}

export async function getProducts() {
  return await getDataArray('SELECT * FROM products');
}

export async function getUsers() {
  return await getDataArray('SELECT * FROM users');
}
