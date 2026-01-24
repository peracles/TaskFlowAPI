// scripts/setup-db.js
const { Client } = require('pg');
require('dotenv').config();

const createDatabase = async (dbName) => {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'postgres', // Conectarse a la base predeterminada
  });

  try {
    await client.connect();
    await client.query(`CREATE DATABASE "${dbName}";`);
    console.log(`✅ Base de datos ${dbName} creada exitosamente`);
  } catch (error) {
    if (error.code === '42P04') {
      console.log(`⚠️  Base de datos ${dbName} ya existe`);
    } else {
      console.error(`❌ Error creando ${dbName}:`, error.message);
    }
  } finally {
    await client.end();
  }
};

const main = async () => {
  await createDatabase(process.env.DB_NAME);
  await createDatabase(process.env.DB_TEST_NAME);
};

main().catch(console.error);