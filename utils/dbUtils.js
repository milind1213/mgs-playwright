import mysql from 'mysql2/promise';
import config from '../config/configEnvirment.js';

const getDbConfig = () => ({
  host: config.dbServer,
  user: config.dbUser,
  password: config.dbPassword,
  database: 'productcatalog',
});

export async function executeQuery(sqlQuery) {
  let connection;
  try {
    connection = await mysql.createConnection(getDbConfig());
    const [rows] = await connection.execute(sqlQuery);
    return rows;
  } catch (err) {
    console.error('DB Error:', err);
    return [];
  } finally {
    if (connection) await connection.end();
  }
}

export async function getDataArray(sqlQuery) {
  const rows = await executeQuery(sqlQuery);
  return rows || [];
}

export async function getData(sqlQuery) {
  const rows = await executeQuery(sqlQuery);
  if (!rows.length) return '';
  const firstRow = rows[0];
  const firstKey = Object.keys(firstRow)[0];
  return String(firstRow[firstKey] || '');
}

export async function getFirstRow(sqlQuery) {
  const rows = await executeQuery(sqlQuery);
  return rows.length ? rows[0] : {};
}