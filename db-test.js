const { Client } = require('pg');

// Connection string from your .env file
const connectionString = 'postgresql://postgres:postgres@localhost:5432/blogdb';

// Create a new client
const client = new Client({
  connectionString
});

async function testConnection() {
  try {
    console.log('Connecting to PostgreSQL...');
    await client.connect();
    console.log('Connected successfully!');
    
    // Test query - this will create the database if needed
    await client.query('SELECT NOW() as time');
    console.log('Query executed successfully!');
    
    console.log('Connection test passed!');
  } catch (err) {
    console.error('Error connecting to PostgreSQL:');
    console.error(err);
  } finally {
    await client.end();
  }
}

testConnection();
