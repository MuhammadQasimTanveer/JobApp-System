import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'qasim@55573',
  database: 'JobManagement',
  waitForConnections: true,
  connectionLimit: 10,
});