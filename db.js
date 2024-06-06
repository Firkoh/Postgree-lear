import pg from 'pg';

const pool = new pg.Pool({ 
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "1234567890",
  port: 9000
});

export default pool;
