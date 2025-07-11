
import sql from 'mssql';
import config from '../environmentConfig.ts';
const defaultOptions = {
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
    encrypt: true,
  }
};

export async function getVaultData(sqlQuery) {
  const vaultDatabaseConfig = {
    user: config.dbUser,
    password: config.dbPassword,
    server: config.dbServer,
    database: 'mgs',
    ...defaultOptions
  };

  const pool = await sql.connect(vaultDatabaseConfig);
  const result = await pool.request().query(sqlQuery);
  await sql.close();
  return result.recordset;
}

export async function getData(sqlQuery) {
  const databaseConfig = {
    user: config.dbUser,
    password: config.dbPassword,
    server: config.dbServer,
    ...defaultOptions
  };

  try {
    const pool = await sql.connect(databaseConfig);
    const result = await pool.request().query(sqlQuery);
    await sql.close();

    const data = result.recordset;
    if (!data.length) return "";
    let value = JSON.stringify(data[0]);
    value = value.split(":")[1]?.split("}")[0]?.replace(/"/g, '') || "";
    return value;
  } catch (error) {
    console.error("DB error:", error);
    return "";
  }
}

export async function getDataArray(sqlQuery) {
  const databaseConfig = {
   user: config.dbUser,
    password: config.dbPassword,
    server: config.dbServer,
    ...defaultOptions
  };

  try {
    const pool = await sql.connect(databaseConfig);
    const result = await pool.request().query(sqlQuery);
    await sql.close();
    return result.recordset;
  } catch (error) {
    console.error("DB error:", error);
    return [];
  }
}
